"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/post";
import { withBasePath } from "@/lib/path";
import styles from "./article.module.css";

interface ArticleProps {
  post: PostMeta;
  index?: number;
}

export function Article({ post, index = 0 }: ArticleProps) {
  const thumbnail = post.coverImage;
  const title = post.title;
  const subtitle = post.description;
  const date = post.publishedAt;

  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = linkRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={linkRef}
      href={`/post/${post.slug}`}
      className={`${styles.link}${isVisible ? ` ${styles.linkVisible}` : ""}`}
      style={{ transitionDelay: `${Math.min(index, 8) * 80}ms` }}
    >
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
            <div className={styles.scrim} aria-hidden="true" />
            <div className={styles.blur} aria-hidden="true" />
            <div className={styles.overlay}>
              <h2 className={`${styles.overlayTitle} typo-sub-8 font-600`}>{title}</h2>
              <p className={`${styles.overlaySubtitle} typo-sub-9 font-500`}>{subtitle}</p>
            </div>
          </div>
        )}

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
      </article>
    </Link>
  );
}
