"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/path";
import styles from "./navigation.module.css";

const NAV_LINKS = ["post", "work", "resume", "blog", "about"];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  const normalizedPath = pathname || "";
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  const isDetailPage =
    (pathSegments[0] === "post" && pathSegments.length === 2) ||
    (pathSegments[0] === "blog" && pathSegments.length === 2);

  useEffect(() => {
    if (!isDetailPage) {
      setScrollProgress(0);
      return;
    }

    let rafId: number | null = null;

    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateScrollProgress);
    };
    const handleResize = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isDetailPage]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Navigate home"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src={withBasePath("/assets/logo.svg")}
            alt="Yohan Park logo"
            width={114}
            height={20}
            priority
          />
        </Link>

        {/* Desktop & Tablet Menu */}
        <ul className={`${styles.desktopMenu} typo-sub-8 font-600 text-gray-900`}>
          {NAV_LINKS.filter((link) => link !== "post").map((link) => {
            if (link === "resume") {
              return (
                <li key={link}>
                  <a
                    href="https://drive.google.com/file/d/1kUvWxqga7N6lnu7I17FmQMnZOjZmUNRu/view?usp=share_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navItem}
                  >
                    {link.slice(0, 1).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              );
            }
            return (
              <li key={link}>
                <Link href={`/${link}`} className={styles.navItem}>
                  {link.slice(0, 1).toUpperCase() + link.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.mobileButton}
          aria-label="Toggle menu"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transition: "all 300ms" }}
          >
            {isMenuOpen ? (
              <path
                d="M8 8L24 24M24 8L8 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M6 10H26M6 16H26M6 22H26"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={styles.mobileMenu}
          style={{
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? "translateY(0)" : "translateY(-1rem)",
            visibility: isMenuOpen ? "visible" : "hidden",
          }}
        >
          <ul className={`${styles.mobileMenuList} typo-sub-8 font-600 text-gray-900`}>
            {NAV_LINKS.filter((link) => link !== "post").map((link, index) => {
              if (link === "resume") {
                return (
                  <li
                    key={link}
                    style={{
                      opacity: isMenuOpen ? 1 : 0,
                      transition: `opacity 300ms ease-out ${isMenuOpen ? index * 50 : 0}ms`,
                    }}
                  >
                    <a
                      href="https://drive.google.com/file/d/1kUvWxqga7N6lnu7I17FmQMnZOjZmUNRu/view?usp=share_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mobileNavItem}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.slice(0, 1).toUpperCase() + link.slice(1)}
                    </a>
                  </li>
                );
              }
              return (
                <li
                  key={link}
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transition: `opacity 300ms ease-out ${isMenuOpen ? index * 50 : 0}ms`,
                  }}
                >
                  <Link
                    href={`/${link}`}
                    className={styles.mobileNavItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.slice(0, 1).toUpperCase() + link.slice(1)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {!isMenuOpen && (
        <div className={styles.progressBar}>
          {isDetailPage ? (
            <>
              <div className={styles.progressBarBg} />
              <div
                className={styles.progressBarFill}
                style={{
                  width: `${scrollProgress}%`,
                  background: "var(--progress-gradient)",
                }}
              />
            </>
          ) : (
            <div className={styles.progressBarBg} />
          )}
        </div>
      )}
    </header>
  );
}
