import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import Article from "@/components/qna/Article";
import PinGate from "@/components/qna/PinGate";
import { qnaBackLinkClass, qnaSecondaryButtonClass } from "@/components/qna/styles";
import type { NoticeData } from "@/data/notice";

const QnaDetail: React.FC = () => {
  const isScrolled = useScroll();
  const router = useRouter();
  const { id, page } = router.query;
  const [post, setPost] = useState<NoticeData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const listHref =
    typeof page === "string" && /^[1-9]\d*$/.test(page)
      ? `/qna?page=${page}`
      : "/qna";

  useEffect(() => {
    if (typeof id !== "string") return;
    const controller = new AbortController();
    setIsLoading(true);
    setPost(undefined);
    setIsUnlocked(false);
    setError("");
    setUnlockError("");

    const loadPost = async () => {
      try {
        const response = await fetch(`/api/qna?id=${encodeURIComponent(id)}`, {
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "질문을 불러오지 못했습니다.");
        }
        setPost(result);

        if (result.isPrivate) {
          const savedToken = window.sessionStorage.getItem(`qna-edit-token:${id}`);
          if (savedToken) {
            const unlockResponse = await fetch("/api/qna", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "unlock", id: result.id, editToken: savedToken }),
              signal: controller.signal,
            });
            if (unlockResponse.ok) {
              setPost(await unlockResponse.json());
              setIsUnlocked(true);
            } else {
              window.sessionStorage.removeItem(`qna-edit-token:${id}`);
            }
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
    if (!post || isUnlocking) return;

    setUnlockError("");
    setIsUnlocking(true);
    try {
      const response = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unlock", id: post.id, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "비밀번호를 확인하지 못했습니다.");
      window.sessionStorage.setItem(`qna-edit-token:${post.id}`, result.editToken);
      setPost(result);
      setIsUnlocked(true);
      setPassword("");
    } catch (unlockFailure) {
      setUnlockError(
        unlockFailure instanceof Error ? unlockFailure.message : "비밀번호를 확인하지 못했습니다."
      );
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`${post ? `${post.title} | ` : ""}질문답변게시판 | 더함발달연구센터`}</title>
      </Head>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="px-4 py-8 mx-auto max-w-3xl md:px-8 md:py-12">
          <div className="flex justify-start mb-4">
            <Link
              href={listHref}
              className={qnaBackLinkClass}
            >
              ← 목록으로
            </Link>
          </div>
          {isLoading ? (
            <p className="py-12 text-center text-gray-500">질문을 불러오는 중입니다.</p>
          ) : error ? (
            <p role="alert" className="py-12 text-center text-red-600">{error}</p>
          ) : !post ? (
            <p className="py-12 text-center text-gray-500">해당 질문을 찾을 수 없습니다.</p>
          ) : (
            <>
              <Article post={post} showContent={!post.isPrivate || isUnlocked} />
              {post.isPrivate && !isUnlocked && (
                <div className="mt-8">
                  <PinGate
                    id="qna-unlock-password"
                    title="비밀글입니다"
                    description="내용을 보려면 작성할 때 설정한 비밀번호를 입력해 주세요."
                    buttonLabel="확인"
                    password={password}
                    onPasswordChange={setPassword}
                    onSubmit={handleUnlock}
                    isSubmitting={isUnlocking}
                    error={unlockError}
                  />
                </div>
              )}
            </>
          )}
          {!isLoading && !error && post?.isPrivate && isUnlocked && (
            <div className="flex justify-end mt-6 border-t border-[#DDE8D8] pt-6">
              <Link
                href={`/qna/edit?id=${post.id}${typeof page === "string" ? `&page=${encodeURIComponent(page)}` : ""}`}
                className={qnaSecondaryButtonClass}
              >
                질문 수정
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QnaDetail;
