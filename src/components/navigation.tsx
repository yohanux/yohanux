"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/path";
import styles from "./navigation.module.css";

const NAV_LINKS = ["post", "work", "resume", "about"];
const RESUME_URL =
  "https://drive.google.com/file/d/1kUvWxqga7N6lnu7I17FmQMnZOjZmUNRu/view?usp=share_link";

function NavLinkItem({ link, className }: { link: string; className: string }) {
  const label = link.slice(0, 1).toUpperCase() + link.slice(1);

  if (link === "resume") {
    return (
      <li>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={`/${link}`} className={className}>
        {label}
      </Link>
    </li>
  );
}

function TabIcon({ src }: { src: string }) {
  const maskValue = `url(${withBasePath(src)})`;

  return (
    <span
      className={styles.mobileTabIcon}
      style={{
        WebkitMaskImage: maskValue,
        maskImage: maskValue,
      }}
      aria-hidden="true"
    />
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MOBILE_TABS = [
  {
    key: "home",
    label: "Home",
    href: "/",
    iconSrc: "/assets/icons/icon_home.svg",
    iconSrcActive: "/assets/icons/icon_home_active.svg",
    external: false,
    match: (path: string) => path === "/",
  },
  {
    key: "work",
    label: "Work",
    href: "/work",
    iconSrc: "/assets/icons/icon_work.svg",
    iconSrcActive: "/assets/icons/icon_work_active.svg",
    external: false,
    match: (path: string) => path.startsWith("/work"),
  },
  {
    key: "resume",
    label: "Resume",
    href: RESUME_URL,
    iconSrc: "/assets/icons/icon_resume.svg",
    iconSrcActive: "/assets/icons/icon_resume_active.svg",
    external: true,
    match: () => false,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/about",
    iconSrc: "/assets/icons/icon_profile.svg",
    iconSrcActive: "/assets/icons/icon_profile_active.svg",
    external: false,
    match: (path: string) => path.startsWith("/about"),
  },
];

export function Navigation() {
  const visibleLinks = NAV_LINKS.filter((link) => link !== "post");
  const pathname = usePathname() || "/";
  const isPostPage = pathname.startsWith("/post/");
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) < 4) return;

      if (delta > 0 && currentY > 40) {
        setIsCompact(true);
      } else if (delta < 0) {
        setIsCompact(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logoLink} aria-label="Navigate home">
            <Image
              src={withBasePath("/assets/logo.svg")}
              alt="Yohan Park logo"
              width={114}
              height={20}
              priority
              className={styles.logo}
            />
          </Link>

          {/* Desktop & Tablet Menu */}
          <ul className={`${styles.desktopMenu} typo-sub-8 font-600`}>
            {visibleLinks.map((link) => (
              <NavLinkItem key={link} link={link} className={styles.navItem} />
            ))}
          </ul>
        </nav>
      </header>

      {isPostPage && (
        <div className={styles.mobileBackBar}>
          <Link href="/" className={styles.mobileBackButton} aria-label="목록으로 돌아가기">
            <BackIcon />
          </Link>
        </div>
      )}

      {!isPostPage && (
      <nav
        className={`${styles.mobileTabBar}${isCompact ? ` ${styles.mobileTabBarCompact}` : ""}`}
        aria-label="Mobile navigation"
      >
        <ul className={styles.mobileTabList}>
          {MOBILE_TABS.map(({ key, label, href, iconSrc, iconSrcActive, external, match }) => {
            const isActive = match(pathname);
            const linkClassName = `${styles.mobileTabLink}${isActive ? ` ${styles.mobileTabLinkActive}` : ""}`;

            return (
              <li key={key} className={styles.mobileTabListItem}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                    <TabIcon src={isActive ? iconSrcActive : iconSrc} />
                    <span className={styles.mobileTabLabel}>{label}</span>
                  </a>
                ) : (
                  <Link href={href} className={linkClassName} aria-current={isActive ? "page" : undefined}>
                    <TabIcon src={isActive ? iconSrcActive : iconSrc} />
                    <span className={styles.mobileTabLabel}>{label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      )}
    </>
  );
}
