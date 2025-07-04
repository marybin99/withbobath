import React from "react";
import Layout from "@/components/layout/Layout";
import Table from "@/components/notice/Table";
import { useScroll } from "@/components/layout/Header";
import Head from "next/head";

const NoticePage: React.FC = () => {
  const isScrolled = useScroll();

  return (
    <Layout>
      <Head>
        <title>공지사항 | 더함발달연구센터</title>
      </Head>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="px-4 py-12 mx-auto max-w-5xl md:px-8">
          <h2 className="pb-2 mb-5 text-2xl font-semibold border-b">
            공지사항
          </h2>
          <div className="overflow-x-auto">
            <Table />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticePage;
