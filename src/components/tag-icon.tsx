"use client";

import { useState } from "react";
import { withBasePath } from "@/lib/path";

// tag text -> PNG file in public/assets/icons/chips (32x32px, shown at 16px)
const TAG_ICONS: Record<string, string> = {
  앱인토스: "toss",
  Web: "web",
  Mobile: "mobile",
  "Product Design": "product-design",
};

export function TagIcon({ tag, size = 16 }: { tag: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const file = TAG_ICONS[tag];
  if (!file || failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath(`/assets/icons/chips/${file}.png`)}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
    />
  );
}
