import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-gray-50)] flex flex-col items-center justify-center gap-10 py-8">
      <div className="flex gap-3">
        <Link
          href="https://www.linkedin.com/in/yohan-park-753b97230/"
          target="_blank"
        >
          <Image
            src="/assets/icons/icon_linkedin.svg"
            alt="LinkedIn"
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </Link>
        <Link href="https://www.instagram.com/yohan.ux/" target="_blank">
          <Image
            src="/assets/icons/icon_instagram.svg"
            alt="Instagram"
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </Link>
        <Link href="https://brunch.co.kr/@yohanux" target="_blank">
          <Image
            src="/assets/icons/icon_brunch.svg"
            alt="Brunch"
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <p className="text-sm text-[var(--color-gray-400)]">
          © 2025 YOHANUX. All rights reserved.
        </p>
        <a
          href="mailto:yohanux@gmail.com"
          className="text-sm text-[var(--color-gray-400)]"
        >
          yohanux@gmail.com
        </a>
      </div>
    </footer>
  );
}
