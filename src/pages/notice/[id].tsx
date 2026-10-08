import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import { notices } from "@/data/notice";
import TableDetail from "@/components/notice/TableDetail";

const NoticeDetail: React.FC = () => {
  const isScrolled = useScroll();
  const router = useRouter();
  const { id, page } = router.query;
  const notice = notices.find((n) => n.id === Number(id));
  const listHref =
    typeof page === "string" && /^[1-9]\d*$/.test(page)
      ? `/notice?page=${page}`
      : "/notice";

  return (
    <Layout>
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
          <TableDetail notice={notice} />
        </div>
      </div>
    </Layout>
  );
};

export default NoticeDetail;
