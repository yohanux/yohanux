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

type Status = "loading" | "loaded" | "failed";

// Shows nothing (no empty box) for tags without an icon file.
export function TagIcon({ tag, size = 16 }: { tag: string; size?: number }) {
  const [status, setStatus] = useState<Status>("loading");
  const file = TAG_ICONS[tag];

  // The image can finish (or fail) before hydration, so onLoad/onError may never fire;
  // check its state once when the element attaches.
  const attach = (img: HTMLImageElement | null) => {
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "failed");
  };

  if (!file || status === "failed") return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={attach}
      src={withBasePath(`/assets/icons/chips/${file}.png`)}
      alt=""
      width={size}
      height={size}
      style={status === "loaded" ? undefined : { display: "none" }}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("failed")}
    />
  );
}
