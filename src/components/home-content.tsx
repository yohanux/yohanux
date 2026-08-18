"use client";

import { useState } from "react";
import { PostMeta } from "@/lib/post";
import { Article } from "@/components/article";
import { SplitText } from "@/components/split-text";
import styles from "@/app/page.module.css";

const HERO_LINES = ["생각을 경험을", "회고하고 공유합니다"];

interface HomeContentProps {
  posts: PostMeta[];
}

export function HomeContent({ posts }: HomeContentProps) {
  const [contentReady, setContentReady] = useState(false);

  return (
    <>
      <h1 className={`${styles.hero} typo-1 font-600 text-gray-900`}>
        <SplitText lines={HERO_LINES} onComplete={() => setContentReady(true)} />
      </h1>
      <section className={styles.grid}>
        {posts.map((post, index) => (
          <Article key={post.slug} post={post} index={index} ready={contentReady} />
        ))}
      </section>
    </>
  );
}
