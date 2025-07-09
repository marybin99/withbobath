import { NoticeData } from "@/data/notice";
import React from "react";

const TableDetail: React.FC<{ notice?: NoticeData }> = ({ notice }) => {
  return (
    <>
      {!notice ? (
        <p className="text-2xl font-bold">해당 공지사항을 찾을 수 없습니다.</p>
      ) : (
        <>
          <h1 className="mb-4 text-lg font-bold md:text-2xl">{notice.title}</h1>
          <div className="flex justify-between">
            <div className="mb-2 text-gray-500">{notice.date}</div>
            <div className="mb-2 text-gray-500">{notice.author}</div>
          </div>
          <hr />
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
