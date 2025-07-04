import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useScroll } from "@/components/layout/Header";
import { notices } from "@/data/notice";
import TableDetail from "@/components/notice/TableDetail";

const NoticeDetail: React.FC = () => {
  const isScrolled = useScroll();
  const router = useRouter();
  const { id } = router.query;
  const notice = notices.find((n) => n.id === Number(id));

  return (
    <Layout>
      <div
        className={`bg-white min-h-screen mt-[82px] ${
          isScrolled ? "lg:mt-[108px]" : "lg:mt-[197px]"
        } transition-all duration-300`}
      >
        <div className="px-4 py-12 mx-auto max-w-3xl md:px-8">
          <TableDetail notice={notice} />
        </div>
      </div>
    </Layout>
  );
};

export default NoticeDetail;
