import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import TableDetail from "@/components/notice/TableDetail";
import { therapyPosts } from "@/data/therapy";

const TherapyDetail: React.FC = () => {
  const isScrolled = useScroll();
  const router = useRouter();
  const { id, page } = router.query;
  const post = therapyPosts.find((item) => item.id === Number(id));
  const listHref =
    typeof page === "string" && /^[1-9]\d*$/.test(page)
      ? `/therapy?page=${page}`
      : "/therapy";

  return (
    <Layout>
      <Head>
        <title>{post ? `${post.title} | 치료정보실` : "치료정보실"} | 더함발달연구센터</title>
      </Head>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="px-4 py-12 mx-auto max-w-3xl md:px-8">
          <div className="flex justify-start mb-4">
            <Link
              href={listHref}
              className="inline-flex items-center px-2 py-2 font-medium text-primary hover:underline hover:underline-offset-4"
            >
              ← 목록으로
            </Link>
          </div>
          <TableDetail
            notice={post}
            notFoundMessage="해당 치료정보를 찾을 수 없습니다."
          />
        </div>
      </div>
    </Layout>
  );
};

export default TherapyDetail;
