import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/post";

interface ArticleProps {
  post: PostMeta;
}

export function Article({ post }: ArticleProps) {
  return (
    <Link href={`/post/${post.slug}`} className="block">
      <article className="group flex flex-col gap-6 bg-white overflow-hidden cursor-pointer">
        {post.coverImage && (
          <div className="relative w-full h-48 overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[0.95]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-120 rounded-2xl"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
        
        <div className="flex flex-col gap-3 min-[810px]:gap-4">
          <div className="flex flex-col gap-1.5 min-[810px]:gap-2">
            <h2 className="text-[18px] leading-[24px] min-[810px]:text-[20px] min-[810px]:leading-[26px] font-[var(--font-weight-600)] text-[var(--color-gray-900)] transition-colors group-hover:text-[var(--color-primary)]">
              {post.title}
            </h2>

            <p className="text-[14px] leading-[18px] min-[810px]:text-[16px] min-[810px]:leading-[22px] font-[var(--font-weight-500)] text-[var(--color-gray-600)]">{post.description}</p>
          </div>

          <div className="text-[14px] leading-[16px] font-[var(--font-weight-400)] text-[var(--color-gray-500)]">
            <span>
              {(() => {
                const date = new Date(post.publishedAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}. ${month}. ${day}`;
              })()}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

