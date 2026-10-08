import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import Table from "@/components/notice/Table";
import { qnaPosts } from "@/data/qna";

const QnaPage: React.FC = () => {
  const isScrolled = useScroll();

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
        <div className="px-4 py-12 mx-auto max-w-5xl md:px-8">
          <h2 className="pb-2 mb-5 text-2xl font-semibold border-b">
            질문답변게시판
          </h2>
          <Table
            items={qnaPosts}
            basePath="/qna"
            sectionLabel="질문답변게시판"
            emptyMessage="등록된 질문이 없습니다."
          />
        </div>
      </div>
    </Layout>
  );
};

export default QnaPage;
