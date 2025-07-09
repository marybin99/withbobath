import Link from "next/link";
import { notices } from "@/data/notice";

const Table = () => {
  return (
    <div className="flex flex-col gap-6">
      {notices.map((notice) => (
        <Link key={notice.id} href={`/notice/${notice.id}`} className="block">
          <div className="flex flex-col gap-2 p-6 bg-[#F5F9F2] rounded-xl border border-gray-200 shadow transition-colors duration-200 cursor-pointer hover:bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-bold">{notice.title}</span>
              <span className="text-base font-medium text-gray-400">
                {notice.date.replace(/-/g, ".")}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Table;
