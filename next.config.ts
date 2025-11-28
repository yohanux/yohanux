import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production";
const basePath = isGitHubPages ? "/yohanux" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
