import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/post";
import { withBasePath } from "@/lib/path";

interface ArticleProps {
  post: PostMeta;
}

export function Article({ post }: ArticleProps) {
  // Article 컴포넌트 요소 정의
  const thumbnail = post.coverImage; // 이미지
  const title = post.title; // 제목
  const subtitle = post.description; // 소개글
  const date = post.publishedAt; // 날짜

  return (
    <Link href={`/post/${post.slug}`} className="block">
      <article className="group flex flex-col gap-6 bg-white overflow-hidden cursor-pointer">
        {thumbnail && (
          <div className="relative w-full h-48 overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[0.95]">
            <Image
              src={withBasePath(thumbnail)}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-120 rounded-2xl"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
        
        <div className="flex flex-col gap-3 min-[810px]:gap-4">
          <div className="flex flex-col gap-1.5 min-[810px]:gap-2">
            <h2 className="text-[18px] leading-[24px] min-[810px]:text-[20px] min-[810px]:leading-[26px] font-[var(--font-weight-600)] text-[var(--color-gray-900)] transition-colors group-hover:text-[var(--color-primary)]">
              {title}
            </h2>

            <p className="text-[14px] leading-[18px] min-[810px]:text-[16px] min-[810px]:leading-[22px] font-[var(--font-weight-500)] text-[var(--color-gray-600)]">{subtitle}</p>
          </div>

          <div className="text-[14px] leading-[16px] font-[var(--font-weight-400)] text-[var(--color-gray-500)]">
            <span>
              {(() => {
                const dateObj = new Date(date);
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                const day = String(dateObj.getDate()).padStart(2, "0");
                return `${year}. ${month}. ${day}`;
              })()}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

