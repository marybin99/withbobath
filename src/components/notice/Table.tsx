import Link from "next/link";

const notices = [
  { id: 1, title: "2024년 7월 휴관 안내", date: "2024-07-01" },
  { id: 2, title: "여름방학 프로그램 모집", date: "2024-06-20" },
  { id: 3, title: "센터 방역 안내", date: "2024-06-10" },
];

const Table = () => {
  return (
    <table className="min-w-full bg-white rounded-lg border border-gray-200 shadow">
      <thead>
        <tr className="bg-[#E4EDDC] text-[#1C7F00]">
          <th className="px-4 py-3 text-left border-b">번호</th>
          <th className="px-4 py-3 text-left border-b">제목</th>
          <th className="px-4 py-3 text-left border-b">등록일</th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice) => (
          <tr key={notice.id} className="hover:bg-[#F5F9F2]">
            <td className="px-4 py-2 border-b">{notice.id}</td>
            <td className="px-4 py-2 border-b">
              <Link
                href={`/notice/${notice.id}`}
                className="text-[#1C7F00] hover:underline"
              >
                {notice.title}
              </Link>
            </td>
            <td className="px-4 py-2 border-b">{notice.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
