"use client";

import Lottie from "lottie-react";
import yohanAnimation from "../../../public/assets/resource/yohan.json";

export default function AboutPage() {
  return (
    <main className="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center p-6">
      <div className="profile grid max-w-[840px] items-center gap-[80px] md:grid-cols-2">
        <div className="h-[240px] w-[240px] justify-self-center md:h-[300px] md:w-[300px]">
          <Lottie animationData={yohanAnimation} loop={true} />
        </div>
        <div className="profile__contents text-left">
          <h1 className="text-[32px] font-semibold leading-[44px] text-[var(--color-gray-900)] md:text-[40px] md:leading-[56px]">
            안녕하세요
            <br />
            디자이너 박요한 입니다
          </h1>
          <p className="mt-8 text-[17px] font-normal leading-[28px] text-[var(--color-gray-600)]">
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
      </div>
    </main>
  );
}



