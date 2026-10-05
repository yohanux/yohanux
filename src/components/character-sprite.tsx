"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/path";
import styles from "./character-sprite.module.css";

const TALKING_MS = 1500;

const sheet = (name: string) => ({
  backgroundImage: `url(${withBasePath(`/assets/character/${name}.png`)})`,
});

// Talks for 1.5s on entering the page, then switches to the idle ("ready") loop.
// Both sheets stay mounted (one hidden) so the swap never waits on an image load.
export function CharacterSprite() {
  const [isTalking, setIsTalking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsTalking(false), TALKING_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div role="img" aria-label="Yohan character" className={styles.root}>
      <div
        className={`${styles.sprite} ${styles.talking}${isTalking ? ` ${styles.active}` : ""}`}
        style={sheet("talking")}
      />
      <div
        className={`${styles.sprite} ${styles.ready}${isTalking ? "" : ` ${styles.active}`}`}
        style={sheet("ready")}
      />
    </div>
  );
}
