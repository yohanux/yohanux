"use client";

import { useEffect, useState } from "react";
import styles from "./split-text.module.css";

interface SplitTextProps {
  lines: string[];
}

const CHAR_STAGGER_MS = 30;

export function SplitText({ lines }: SplitTextProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  let charIndex = 0;

  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={styles.splitLine}>
          {lineIndex > 0 && <br />}
          {Array.from(line).map((char, i) => {
            const delay = charIndex++ * CHAR_STAGGER_MS;
            return (
              <span
                key={i}
                className={`${styles.splitChar}${isRevealed ? ` ${styles.splitCharRevealed}` : ""}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {char === " " ? "\u00a0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}
