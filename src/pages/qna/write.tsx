import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import {
  qnaBackLinkClass,
  qnaFormCardClass,
  qnaInputClass,
  qnaPrimaryButtonClass,
  qnaSecondaryButtonClass,
} from "@/components/qna/styles";

const QnaWritePage: React.FC = () => {
  const isScrolled = useScroll();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const author = String(data.get("author") ?? "").trim();
    const content = String(data.get("content") ?? "").trim();
    const privatePost = data.get("isPrivate") === "on";
    const password = String(data.get("password") ?? "");
    const passwordConfirm = String(data.get("passwordConfirm") ?? "");

    if (privatePost && password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (privatePost && !/^\d{4}$/.test(password)) {
      setError("비밀번호는 숫자 4자리로 입력해 주세요.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          content,
          isPrivate: privatePost,
          ...(privatePost ? { password } : {}),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "질문을 등록하지 못했습니다.");
      }

      window.alert("질문이 등록되었습니다.");
      await router.push(`/qna/${result.id}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "질문을 등록하지 못했습니다. 다시 시도해 주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>질문 작성 | 더함발달연구센터</title>
      </Head>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="px-4 py-8 mx-auto max-w-3xl md:px-8 md:py-12">
          <Link
            href="/qna"
            className={qnaBackLinkClass}
          >
            ← 목록으로
          </Link>
          <div className="mt-5 mb-8">
            <p className="mb-2 text-sm font-semibold text-primary">질문답변게시판</p>
            <h1 className="text-3xl font-semibold text-gray-900">질문 작성</h1>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              궁금한 점을 남겨주세요. 비밀글도 제목과 작성자는 목록에 표시됩니다.
            </p>
          </div>
          <form onSubmit={handleSubmit} className={`${qnaFormCardClass} space-y-6`}>
            <div>
              <label htmlFor="qna-title" className="block mb-2 text-sm font-semibold text-gray-700">제목</label>
              <input
                id="qna-title"
                name="title"
                type="text"
                required
                maxLength={120}
                placeholder="질문 제목을 입력해 주세요"
                className={qnaInputClass}
              />
            </div>
            <div>
              <label htmlFor="qna-author" className="block mb-2 text-sm font-semibold text-gray-700">작성자</label>
              <input
                id="qna-author"
                name="author"
                type="text"
                required
                maxLength={30}
                placeholder="표시할 이름을 입력해 주세요"
                className={qnaInputClass}
              />
            </div>
            <div>
              <label htmlFor="qna-content" className="block mb-2 text-sm font-semibold text-gray-700">내용</label>
              <textarea
                id="qna-content"
                name="content"
                required
                maxLength={5000}
                rows={10}
                placeholder="질문 내용을 자세히 적어주세요"
                className={`${qnaInputClass} min-h-[240px] resize-y leading-7`}
              />
            </div>
            <div className="rounded-xl border border-[#DCE9D7] bg-[#F7FBF5] p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  name="isPrivate"
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(event) => setIsPrivate(event.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                />
                <span>
                  <span className="block font-semibold text-gray-800">비밀글로 등록</span>
                  <span className="mt-1 block text-sm leading-6 text-gray-600">
                    내용을 보거나 수정할 때 비밀번호가 필요합니다.
                  </span>
                </span>
              </label>
              {isPrivate && (
                <div className="grid gap-4 mt-5 pt-5 border-t border-[#DCE9D7] sm:grid-cols-2">
                  <div>
                    <label htmlFor="qna-password" className="block mb-2 text-sm font-semibold text-gray-700">비밀번호 <span className="font-normal text-gray-500">· 숫자 4자리</span></label>
                    <input
                      id="qna-password"
                      name="password"
                      type="password"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{4}"
                      minLength={4}
                      maxLength={4}
                      autoComplete="new-password"
                      placeholder="숫자 4자리"
                      className={qnaInputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="qna-password-confirm" className="block mb-2 text-sm font-semibold text-gray-700">비밀번호 확인</label>
                    <input
                      id="qna-password-confirm"
                      name="passwordConfirm"
                      type="password"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{4}"
                      minLength={4}
                      maxLength={4}
                      autoComplete="new-password"
                      placeholder="다시 입력해 주세요"
                      className={qnaInputClass}
                    />
                  </div>
                </div>
              )}
            </div>
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <div className="flex flex-wrap justify-end gap-3 border-t border-[#E4ECE0] pt-6">
              <Link href="/qna" className={qnaSecondaryButtonClass}>
                취소
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={qnaPrimaryButtonClass}
              >
                {isSubmitting ? "등록 중..." : "질문 등록"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default QnaWritePage;
