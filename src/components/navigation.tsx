"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/path";

const NAV_LINKS = ["post", "work", "resume", "blog", "about"];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // 상세페이지인지 확인 (/post/[slug] 또는 /blog/[slug])
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
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress);
      }
    };

    const handleResize = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress);
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isDetailPage]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-[20px] relative">
      <nav className="flex w-full max-w-7xl mx-auto items-center justify-between px-5 min-[810px]:px-[60px] min-[1200px]:px-20 py-[10px]">
        <Link 
          href="/" 
          className="flex items-center px-2 py-2 -mx-2 -my-2" 
          aria-label="Navigate home"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src={withBasePath("/assets/resource/logo.svg")}
            alt="Yohan Park logo"
            width={114}
            height={20}
            priority
          />
        </Link>

        {/* Desktop & Tablet Menu */}
        <ul className="hidden min-[810px]:flex items-center gap-2 text-[18px] leading-[22px] font-[var(--font-weight-600)] tracking-wide text-[var(--color-gray-900)]">
          {NAV_LINKS.filter((link) => link !== "post").map((link) => {
            if (link === "resume") {
              return (
                <li key={link}>
                  <a
                    href="https://drive.google.com/file/d/1kUvWxqga7N6lnu7I17FmQMnZOjZmUNRu/view?usp=share_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 transition-opacity hover:opacity-30"
                  >
                    {link.slice(0, 1).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              );
            }
            return (
              <li key={link}>
                <Link
                  href={`/${link}`}
                  className="block px-4 py-3 transition-opacity hover:opacity-30"
                >
                  {link.slice(0, 1).toUpperCase() + link.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Button - Only visible on mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex min-[810px]:hidden items-center justify-center w-8 h-8"
          aria-label="Toggle menu"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            {isMenuOpen ? (
              <path
                d="M8 8L24 24M24 8L8 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-gray-900)]"
              />
            ) : (
              <path
                d="M6 10H26M6 16H26M6 22H26"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-gray-900)]"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-white border-b border-slate-200 min-[810px]:hidden z-50 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <ul className="flex flex-col text-[18px] leading-[22px] font-[var(--font-weight-600)] text-[var(--color-gray-900)]">
            {NAV_LINKS.filter((link) => link !== "post").map((link, index) => {
              if (link === "resume") {
                return (
                  <li
                    key={link}
                    className={`transition-opacity duration-300 ease-out ${
                      isMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <a
                      href="https://drive.google.com/file/d/1kUvWxqga7N6lnu7I17FmQMnZOjZmUNRu/view?usp=share_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-4 transition-opacity hover:opacity-30"
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
                  className={`transition-opacity duration-300 ease-out ${
                    isMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <Link
                    href={`/${link}`}
                    className="block px-6 py-4 transition-opacity hover:opacity-30"
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
      {/* 스크롤 프로그레스바 - 상세페이지에서만 표시, border 역할, 메뉴가 열려있을 때는 숨김 */}
      {!isMenuOpen && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] z-[60]">
          {isDetailPage ? (
            <>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-gray-200)]" />
              <div
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ 
                  width: `${scrollProgress}%`,
                  background: 'var(--color-progress-gradient)'
                }}
              />
            </>
          ) : (
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-gray-200)]" />
          )}
        </div>
      )}
    </header>
  );
}

