import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { notices, type NoticeData } from "@/data/notice";

const PAGE_SIZE = 10;

interface TableProps {
  items?: NoticeData[];
  basePath?: string;
  sectionLabel?: string;
  emptyMessage?: string;
  showAuthor?: boolean;
  footerAction?: ReactNode;
}

const Table = ({
  items = notices,
  basePath = "/notice",
  sectionLabel = "공지사항",
  emptyMessage = "등록된 공지사항이 없습니다.",
  showAuthor = false,
  footerAction,
}: TableProps) => {
  const router = useRouter();
  const pageQuery = router.query.page;
  const requestedPage =
    typeof pageQuery === "string" && /^\d+$/.test(pageQuery)
      ? Number(pageQuery)
      : 1;
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(requestedPage, 1), pageCount);
  const pageNotices = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  return (
    <>
      <p className="mb-4 text-sm text-gray-600">전체 {items.length}건</p>
      <div className="flex flex-col gap-2">
        {pageNotices.map((notice) => (
          <Link
            key={notice.id}
            href={
              currentPage === 1
                ? `${basePath}/${notice.id}`
                : `${basePath}/${notice.id}?page=${currentPage}`
            }
            className="block px-4 py-3 transition-colors border border-gray-200 rounded-lg bg-[#F5F9F2] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:px-5"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <span className="flex items-start gap-2 font-semibold leading-6">
                {notice.isPrivate && (
                  <span aria-label="비밀글" title="비밀글" className="inline-flex mt-1 text-primary shrink-0">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="10" width="16" height="11" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </span>
                )}
                {notice.title}
              </span>
              <span className="flex items-center gap-3 text-sm text-gray-500 shrink-0">
                {showAuthor && <span>{notice.author}</span>}
                <time dateTime={notice.date}>{notice.date.replace(/-/g, ".")}</time>
              </span>
            </div>
          </Link>
        ))}
        {items.length === 0 && (
          <p className="py-12 text-center text-gray-500">{emptyMessage}</p>
        )}
      </div>

      <div
        className={`items-center min-h-10 pt-6 mt-6 border-t border-[#DDE8D8] ${
          footerAction
            ? "grid grid-cols-[1fr_auto] gap-3 sm:grid-cols-[1fr_auto_1fr]"
            : "flex justify-center"
        }`}
      >
        <nav
          aria-label={`${sectionLabel} 페이지`}
          className={`flex items-center gap-1 ${footerAction ? "sm:col-start-2" : ""}`}
        >
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
        {footerAction && (
          <div className="justify-self-end sm:col-start-3">{footerAction}</div>
        )}
      </div>
    </>
  );
};

export default Table;
