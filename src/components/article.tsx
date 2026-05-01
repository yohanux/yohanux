import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/post";
import { withBasePath } from "@/lib/path";
import styles from "./article.module.css";

interface ArticleProps {
  post: PostMeta;
}

export function Article({ post }: ArticleProps) {
  const thumbnail = post.coverImage;
  const title = post.title;
  const subtitle = post.description;
  const date = post.publishedAt;

  return (
    <Link href={`/post/${post.slug}`} className={styles.link}>
      <article className={styles.article}>
        {thumbnail && (
          <div className={styles.imageWrapper}>
            <Image
              src={withBasePath(thumbnail)}
              alt={title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={`${styles.title} typo-sub-8 font-600 text-gray-900`}>
              {title}
            </h2>
            <p className="typo-sub-9 font-500 text-gray-600">{subtitle}</p>
          </div>

          <div className="typo-sub-10 font-400 text-gray-500">
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
