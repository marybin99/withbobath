import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import Table from "@/components/notice/Table";
import { qnaPrimaryButtonClass } from "@/components/qna/styles";
import type { NoticeData } from "@/data/notice";

const QnaPage: React.FC = () => {
  const isScrolled = useScroll();
  const [posts, setPosts] = useState<NoticeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const writeButton = (
    <Link
      href="/qna/write"
      className={`${qnaPrimaryButtonClass} shrink-0 px-4 text-sm`}
    >
      질문 작성
    </Link>
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/qna", { signal: controller.signal })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "질문을 불러오지 못했습니다.");
        }
        setPosts(result);
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "질문을 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <Layout>
      <Head>
        <title>질문답변게시판 | 더함발달연구센터</title>
      </Head>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="px-4 py-8 mx-auto max-w-5xl md:px-8 md:py-12">
          <div className="pb-4 mb-5 border-b border-[#DDE8D8]">
            <h2 className="text-2xl font-semibold">질문답변게시판</h2>
          </div>
          {isLoading ? (
            <p className="py-12 text-center text-gray-500">질문을 불러오는 중입니다.</p>
          ) : error ? (
            <p role="alert" className="py-12 text-center text-red-600">{error}</p>
          ) : (
            <Table
              items={posts}
              basePath="/qna"
              sectionLabel="질문답변게시판"
              emptyMessage="등록된 질문이 없습니다."
              showAuthor
              footerAction={writeButton}
            />
          )}
          {(isLoading || error) && (
            <div className="flex justify-end pt-6 mt-6 border-t border-[#DDE8D8]">
              {writeButton}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QnaPage;
