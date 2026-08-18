"use client";

import { useEffect, useState } from "react";
import { SplitText } from "@/components/split-text";
import styles from "./page.module.css";

const TITLE_LINES = ["404"];

export default function WorkPage() {
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
      <p
        className={`${styles.body}${isBodyVisible ? ` ${styles.bodyVisible}` : ""} typo-5 text-gray-800`}
      >
        이 페이지는 개편중입니다
      </p>
    </main>
  );
}
