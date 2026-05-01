import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons}>
        <Link
          href="https://www.linkedin.com/in/yohan-park-753b97230/"
          target="_blank"
        >
          <Image
            src="/assets/icons/icon_linkedin.svg"
            alt="LinkedIn"
            width={32}
            height={32}
          />
        </Link>
        <Link href="https://www.instagram.com/yohan.ux/" target="_blank">
          <Image
            src="/assets/icons/icon_instagram.svg"
            alt="Instagram"
            width={32}
            height={32}
          />
        </Link>
        <Link href="https://brunch.co.kr/@yohanux" target="_blank">
          <Image
            src="/assets/icons/icon_brunch.svg"
            alt="Brunch"
            width={32}
            height={32}
          />
        </Link>
      </div>
      <div className={styles.info}>
        <p className="typo-sub-10 text-gray-400">
          © 2025 YOHANUX. All rights reserved.
        </p>
        <a
          href="mailto:yohanux@gmail.com"
          className="typo-sub-10 text-gray-400"
        >
          yohanux@gmail.com
        </a>
      </div>
    </footer>
  );
}
