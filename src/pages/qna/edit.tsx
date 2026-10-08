import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import PinGate from "@/components/qna/PinGate";
import {
  qnaBackLinkClass,
  qnaFormCardClass,
  qnaInputClass,
  qnaPrimaryButtonClass,
  qnaSecondaryButtonClass,
} from "@/components/qna/styles";
import type { NoticeData } from "@/data/notice";

const QnaEditPage: React.FC = () => {
  const isScrolled = useScroll();
  const router = useRouter();
  const { id, page } = router.query;
  const [post, setPost] = useState<NoticeData>();
  const [password, setPassword] = useState("");
  const [editToken, setEditToken] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isReauthorizing, setIsReauthorizing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const detailHref =
    typeof id === "string"
      ? `/qna/${id}${typeof page === "string" ? `?page=${encodeURIComponent(page)}` : ""}`
      : "/qna";

  useEffect(() => {
    if (typeof id !== "string") return;
    const controller = new AbortController();
    setIsLoading(true);
    setPost(undefined);
    setError("");
    setIsUnlocked(false);
    setIsReauthorizing(false);
    setEditToken("");

    const loadPost = async () => {
      try {
        const response = await fetch(`/api/qna?id=${encodeURIComponent(id)}`, {
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "질문을 불러오지 못했습니다.");
        if (!result.isPrivate) throw new Error("이 질문은 수정할 수 없습니다.");
        setPost(result);

        const savedToken = window.sessionStorage.getItem(`qna-edit-token:${id}`);
        if (savedToken) {
          const unlockResponse = await fetch("/api/qna", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "unlock", id: result.id, editToken: savedToken }),
            signal: controller.signal,
          });
          if (unlockResponse.ok) {
            const unlockedPost = await unlockResponse.json();
            setTitle(unlockedPost.title);
            setContent(unlockedPost.content);
            setEditToken(savedToken);
            setIsUnlocked(true);
          } else {
            window.sessionStorage.removeItem(`qna-edit-token:${id}`);
          }
        }
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name !== "AbortError") {
          setError(fetchError.message || "질문을 불러오지 못했습니다.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    void loadPost();

    return () => controller.abort();
  }, [id]);

  const handleUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!post || isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unlock", id: post.id, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "비밀번호를 확인하지 못했습니다.");
      window.sessionStorage.setItem(`qna-edit-token:${post.id}`, result.editToken);
      setEditToken(result.editToken);
      if (!isReauthorizing) {
        setTitle(result.title);
        setContent(result.content);
      }
      setPassword("");
      setIsUnlocked(true);
      setIsReauthorizing(false);
    } catch (unlockError) {
      setError(unlockError instanceof Error ? unlockError.message : "비밀번호를 확인하지 못했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!post || isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/qna", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, title, content, editToken }),
      });
      const result = await response.json();
      if (response.status === 401) {
        window.sessionStorage.removeItem(`qna-edit-token:${post.id}`);
        setEditToken("");
        setIsUnlocked(false);
        setIsReauthorizing(true);
      }
      if (!response.ok) throw new Error(result.error || "질문을 수정하지 못했습니다.");
      window.alert("질문이 수정되었습니다.");
      await router.push(detailHref);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "질문을 수정하지 못했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>질문 수정 | 더함발달연구센터</title>
      </Head>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="px-4 py-8 mx-auto max-w-3xl md:px-8 md:py-12">
          <Link href={detailHref} className={qnaBackLinkClass}>
            ← 질문으로
          </Link>
          <div className="mt-5 mb-8">
            <p className="mb-2 text-sm font-semibold text-primary">질문답변게시판</p>
            <h1 className="text-3xl font-semibold text-gray-900">질문 수정</h1>
          </div>
          {isLoading ? (
            <p className="py-12 text-center text-gray-500">질문을 불러오는 중입니다.</p>
          ) : !post ? (
            <p role="alert" className="py-12 text-center text-red-600">{error}</p>
          ) : !isUnlocked ? (
            <PinGate
              id="edit-password"
              title="비밀번호 확인"
              description={
                isReauthorizing
                  ? "인증 시간이 만료되었습니다. 작성할 때 설정한 비밀번호를 다시 입력해 주세요."
                  : "질문을 수정하려면 작성할 때 설정한 비밀번호를 입력해 주세요."
              }
              buttonLabel="수정하기"
              password={password}
              onPasswordChange={setPassword}
              onSubmit={handleUnlock}
              isSubmitting={isSubmitting}
              error={error}
            />
          ) : (
            <form onSubmit={handleSave} className={`${qnaFormCardClass} space-y-6`}>
              <div>
                <label htmlFor="edit-title" className="block mb-2 text-sm font-semibold text-gray-700">제목</label>
                <input
                  id="edit-title"
                  type="text"
                  required
                  maxLength={120}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className={qnaInputClass}
                />
              </div>
              <div>
                <label htmlFor="edit-content" className="block mb-2 text-sm font-semibold text-gray-700">내용</label>
                <textarea
                  id="edit-content"
                  required
                  maxLength={5000}
                  rows={10}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  className={`${qnaInputClass} min-h-[240px] resize-y leading-7`}
                />
              </div>
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <div className="flex flex-wrap justify-end gap-3 border-t border-[#E4ECE0] pt-6">
                <Link href={detailHref} className={qnaSecondaryButtonClass}>취소</Link>
                <button type="submit" disabled={isSubmitting} className={qnaPrimaryButtonClass}>
                  {isSubmitting ? "저장 중..." : "수정 완료"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QnaEditPage;
