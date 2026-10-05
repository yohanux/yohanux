"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SplitText } from "@/components/split-text";
import { TagIcon } from "@/components/tag-icon";
import { withBasePath } from "@/lib/path";
import type { WorkMeta } from "@/lib/work";
import styles from "./page.module.css";

const TITLE_LINES = ["상상하는 것을", "빠르게 구현합니다"];

export function WorkList({ works }: { works: WorkMeta[] }) {
  const [isBodyVisible, setIsBodyVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsBodyVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={`${styles.title} typo-1 font-600 text-gray-900`}>
        <SplitText lines={TITLE_LINES} />
      </h1>
      <section className={styles.list}>
        {works.map((work, index) => (
          <Link
            key={work.slug}
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.item}${isBodyVisible ? ` ${styles.itemVisible}` : ""}`}
            style={{ transitionDelay: `${Math.min(index, 8) * 80}ms` }}
          >
            <span className={styles.frame}>
              <Image
                src={withBasePath(work.thumbnail)}
                alt={work.title}
                fill
                sizes="160px"
                className={styles.image}
              />
            </span>
            <span className={styles.content}>
              <h2
                className={`${styles.name} typo-sub-7 font-600 text-gray-900`}
              >
                {work.title}
              </h2>
              {work.tags.length > 0 && (
                <ul className={styles.chips}>
                  {work.tags.map((tag) => (
                    <li
                      key={tag}
                      className={`${styles.chip} typo-6 font-500`}
                    >
                      <TagIcon tag={tag} />
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
