import type { NoticeData } from "@/data/notice";

interface ArticleProps {
  post: NoticeData;
  showContent: boolean;
}

const Article = ({ post, showContent }: ArticleProps) => (
  <article>
    <div className="border-b border-[#DDE8D8] pb-6">
      {post.isPrivate && (
        <span className="mb-3 inline-flex rounded-full bg-[#E9F4E4] px-3 py-1 text-xs font-semibold text-primary">
          비밀글
        </span>
      )}
      <h1 className="text-2xl font-semibold leading-snug text-gray-900 break-keep sm:text-3xl">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span>{post.author}</span>
        <span aria-hidden="true" className="text-[#A9C3A1]">·</span>
        <time dateTime={post.date}>{post.date.replace(/-/g, ".")}</time>
      </div>
    </div>
    {showContent && (
      <div className="min-h-40 py-8 text-base leading-8 text-gray-800 whitespace-pre-wrap break-keep">
        {post.content}
      </div>
    )}
  </article>
);

export default Article;
