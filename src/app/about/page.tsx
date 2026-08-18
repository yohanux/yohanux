"use client";

import Lottie from "lottie-react";
import yohanAnimation from "../../../public/assets/yohan.json";
import { SplitText } from "@/components/split-text";
import styles from "./page.module.css";

const GREETING_LINES = ["안녕하세요", "디자이너 박요한 입니다"];

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <h1 className={`${styles.title} typo-1 font-600 text-gray-900`}>
          <SplitText lines={GREETING_LINES} />
        </h1>
        <div className={styles.avatar}>
          <Lottie animationData={yohanAnimation} loop={true} />
        </div>
        <p className={`${styles.body} typo-5 text-gray-800`}>
            디자인 시스템과 개발에 흥미가 있습니다. 복잡한 제품 구조를
            효율적으로 정리하고 직관적으로 전달하는 과정에서 가치를 느끼고
            즐깁니다.
            <br />
            <br />
            MBTI는 INTP입니다. 늘 궁금한 것이 많아 주변을 관찰하고 분석합니다.
            또한 최소한의 물건으로 윤택하게 사는 방법을 고민합니다. 전자제품
            또는 미니멀 라이프를 주제로 밤새 토론할 수 있습니다. 취미로는
            일렉기타를 연습하고 있습니다.
            <br />
            <br />
            끝으로, 저는 크리스천입니다.
        </p>
      </div>
    </main>
  );
}
