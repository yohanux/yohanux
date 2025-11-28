import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/yohanux" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
