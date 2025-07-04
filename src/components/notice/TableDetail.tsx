import { NoticeData } from "@/data/notice";
import React from "react";

const TableDetail: React.FC<{ notice?: NoticeData }> = ({ notice }) => {
  return (
    <>
      {!notice ? (
        <p className="text-2xl font-bold">해당 공지사항을 찾을 수 없습니다.</p>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-bold">{notice.title}</h1>
          <div className="mb-2 text-gray-500">{notice.date}</div>
          <div
            className="py-6 text-lg whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />
        </>
      )}
    </>
  );
};

export default TableDetail;
