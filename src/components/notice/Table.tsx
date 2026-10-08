import Link from "next/link";
import { useRouter } from "next/router";
import { notices } from "@/data/notice";

const PAGE_SIZE = 10;

const Table = () => {
  const router = useRouter();
  const pageQuery = router.query.page;
  const requestedPage =
    typeof pageQuery === "string" && /^\d+$/.test(pageQuery)
      ? Number(pageQuery)
      : 1;
  const pageCount = Math.max(1, Math.ceil(notices.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(requestedPage, 1), pageCount);
  const pageNotices = notices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const pageHref = (page: number) =>
    page === 1 ? "/notice" : `/notice?page=${page}`;

  return (
    <>
      <p className="mb-4 text-sm text-gray-600">전체 {notices.length}건</p>
      <div className="flex flex-col gap-2">
        {pageNotices.map((notice) => (
          <Link
            key={notice.id}
            href={`/notice/${notice.id}`}
            className="block px-4 py-3 transition-colors border border-gray-200 rounded-lg bg-[#F5F9F2] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:px-5"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <span className="font-semibold leading-6">{notice.title}</span>
              <time
                dateTime={notice.date}
                className="text-sm text-gray-500 shrink-0"
              >
                {notice.date.replace(/-/g, ".")}
              </time>
            </div>
          </Link>
        ))}
        {notices.length === 0 && (
          <p className="py-12 text-center text-gray-500">등록된 공지사항이 없습니다.</p>
        )}
      </div>

      <div className="flex items-center justify-center min-h-10 mt-6">
        <nav aria-label="공지사항 페이지" className="flex items-center gap-1">
          {currentPage > 1 ? (
            <Link href={pageHref(currentPage - 1)} aria-label="이전 페이지" className="flex items-center justify-center w-9 h-9 rounded hover:bg-[#F5F9F2]">
              &lt;
            </Link>
          ) : (
            <span aria-label="이전 페이지 없음" className="flex items-center justify-center w-9 h-9 text-gray-400">&lt;</span>
          )}
          <span aria-current="page" className="flex items-center justify-center w-9 h-9 font-semibold text-white rounded-lg bg-primary">
            {currentPage}
          </span>
          {currentPage < pageCount ? (
            <Link href={pageHref(currentPage + 1)} aria-label="다음 페이지" className="flex items-center justify-center w-9 h-9 rounded hover:bg-[#F5F9F2]">
              &gt;
            </Link>
          ) : (
            <span aria-label="다음 페이지 없음" className="flex items-center justify-center w-9 h-9 text-gray-400">&gt;</span>
          )}
        </nav>
      </div>
    </>
  );
};

export default Table;
