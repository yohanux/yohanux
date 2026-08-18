"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import yohanAnimation from "../../../public/assets/yohan.json";
import { SplitText } from "@/components/split-text";
import styles from "./page.module.css";

const GREETING_LINES = ["안녕하세요", "디자이너 박요한 입니다"];

interface ValueCard {
  emoji: string;
  title: string;
}

const SHOW_CARDS = true;

const VALUE_CARDS: ValueCard[] = [
  { emoji: "💭", title: "INTP" },
  { emoji: "🎸", title: "일렉기타" },
  { emoji: "🏃‍♂️", title: "런닝" },
  { emoji: "🍝", title: "파스타" },
  { emoji: "☕️", title: "필터커피" },
  { emoji: "✝️", title: "크리스쳔" },
];

export default function AboutPage() {
  const [isBodyVisible, setIsBodyVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsBodyVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <h1 className={`${styles.title} typo-1 font-600 text-gray-900`}>
          <SplitText lines={GREETING_LINES} />
        </h1>
        <div
          className={`${styles.avatar}${isBodyVisible ? ` ${styles.avatarVisible}` : ""}`}
        >
          <Lottie animationData={yohanAnimation} loop={true} />
        </div>
        <p
          className={`${styles.body}${isBodyVisible ? ` ${styles.bodyVisible}` : ""} typo-5 text-gray-800`}
        >
          사용자와 조직 모두가 이해하기 쉬운 설계를 지향합니다. 늘 궁금한 것이 많아
          주변을 관찰하고 분석합니다.
        </p>
      </div>
      {SHOW_CARDS && (
        <div className={styles.cardGrid}>
          {VALUE_CARDS.map((card, index) => (
            <div
              key={index}
              className={`${styles.card}${isBodyVisible ? ` ${styles.cardVisible}` : ""}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className={styles.cardIcon} aria-hidden="true">
                {card.emoji}
              </span>
              <h3 className={`${styles.cardTitle} typo-5 font-600`}>{card.title}</h3>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
