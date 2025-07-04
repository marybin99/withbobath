import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

const Custom404: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#E4EDDC]">
        <p className="mb-8 text-2xl">개발중인 페이지입니다.</p>
        <Link
          href="/"
          className="px-6 py-3 text-white bg-green-600 rounded-lg shadow transition-colors hover:bg-green-700"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </Layout>
  );
};

export default Custom404;
