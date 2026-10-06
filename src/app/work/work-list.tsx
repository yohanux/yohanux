"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SplitText } from "@/components/split-text";
import { TagIcon } from "@/components/tag-icon";
import { withBasePath } from "@/lib/path";
import type { WorkMeta } from "@/lib/work";
import styles from "./page.module.css";

const TITLE_LINES = ["상상하는 것을", "빠르게 구현합니다"];

export function WorkList({ works }: { works: WorkMeta[] }) {
  const [selected, setSelected] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // While the box is pinned, page scroll drives the list instead: the stage is padded by
  // exactly the list's overflow, and the list is translated by how far the page has
  // scrolled past the pin point.
  useEffect(() => {
    const stage = stageRef.current;
    const box = boxRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!stage || !box || !viewport || !track) return;

    let extra = 0;

    const measure = () => {
      // how much of the list does not fit in its visible window
      extra = Math.max(0, track.offsetHeight - viewport.offsetHeight);
      stage.style.setProperty("--box-h", `${box.offsetHeight}px`);
      stage.style.setProperty("--extra", `${extra}px`);
      update();
    };

    const update = () => {
      if (!extra) {
        track.style.transform = "";
        return;
      }
      // the pin line is whatever the browser resolved the sticky `top` to
      const pinTop = parseFloat(getComputedStyle(box).top) || 0;
      const scrolled = pinTop - stage.getBoundingClientRect().top;
      const offset = Math.min(extra, Math.max(0, scrolled));
      track.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(box);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, [works.length]);

  const current = works[selected];
  const imageClassName = (index: number) =>
    `${styles.image}${index === selected ? ` ${styles.imageActive}` : ""}`;

  return (
    <main className={styles.main}>
      <h1 className={`${styles.title} typo-1 font-600 text-gray-900`}>
        <SplitText lines={TITLE_LINES} />
      </h1>

      <div ref={stageRef} className={styles.stage}>
        <div
          ref={boxRef}
          className={`${styles.box}${isVisible ? ` ${styles.boxVisible}` : ""}`}
        >
          <div className={styles.media}>
            {/* every image stays mounted and stacked, so switching never waits on a load */}
            {works.map((work, index) => (
              <Image
                key={work.slug}
                src={withBasePath(work.thumbnail)}
                alt={work.title}
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                priority={index === 0}
                className={imageClassName(index)}
              />
            ))}
            {current?.link && (
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mediaLink}
                aria-label={`${current.title} 열기`}
              />
            )}
          </div>

          <div ref={viewportRef} className={styles.listViewport}>
            <ul ref={trackRef} className={styles.track}>
              {works.map((work, index) => (
                <li key={work.slug}>
                  <div
                    className={`${styles.row}${index === selected ? ` ${styles.rowActive}` : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.select}
                      onClick={() => setSelected(index)}
                      aria-pressed={index === selected}
                    >
                      <span className={styles.icon}>
                        <Image
                          src={withBasePath(work.thumbnail)}
                          alt=""
                          fill
                          sizes="64px"
                          className={styles.iconImage}
                        />
                      </span>
                      <span className={styles.text}>
                        <span className={`${styles.name} font-600`}>
                          {work.title}
                        </span>
                        {work.description && (
                          <span className={`${styles.description} font-400`}>
                            {work.description}
                          </span>
                        )}
                      </span>
                    </button>
                    {work.tags.length > 0 && (
                      <span className={styles.chips}>
                        {work.tags.map((tag) => {
                          const chipClassName = `${styles.chip} font-500`;
                          const content = (
                            <>
                              <TagIcon tag={tag} />
                              {tag}
                            </>
                          );
                          // chips open the work's link, just like the big thumbnail
                          return work.link ? (
                            <a
                              key={tag}
                              href={work.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${chipClassName} ${styles.chipLink}`}
                            >
                              {content}
                            </a>
                          ) : (
                            <span key={tag} className={chipClassName}>
                              {content}
                            </span>
                          );
                        })}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
