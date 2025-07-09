import Link from "next/link";
import { notices } from "@/data/notice";

const Table = () => {
  return (
    <div className="flex flex-col gap-6">
      {notices.map((notice) => (
        <Link key={notice.id} href={`/notice/${notice.id}`} className="block">
          <div className="flex flex-col gap-2 p-6 bg-[#F5F9F2] rounded-xl border border-gray-200 shadow transition-colors duration-200 cursor-pointer hover:bg-white">
            <div className="flex gap-2 justify-between items-end mb-1 md:gap-4">
              <span className="text-sm font-bold md:text-lg">{notice.title}</span>
              <span className="text-sm font-medium text-gray-400 md:text-base">
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
