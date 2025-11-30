import type { NextConfig } from "next";

// For custom domain: basePath should be empty string
// For GitHub Pages subdomain: set GITHUB_PAGES=true and basePath="/yohanux"
const basePath = process.env.GITHUB_PAGES === "true" ? "/yohanux" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
