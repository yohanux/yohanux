/**
 * Get the base path for GitHub Pages deployment
 * In production, this will be "/yohanux", otherwise empty string
 */
export function getBasePath(): string {
  if (typeof window !== "undefined") {
    // Client-side: check if we're on GitHub Pages
    const pathname = window.location.pathname;
    if (pathname.startsWith("/yohanux")) {
      return "/yohanux";
    }
    return "";
  }
  
  // Server-side: use environment variable
  return process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production" ? "/yohanux" : "";
}

/**
 * Prefix a path with the base path if needed
 */
export function withBasePath(path: string): string {
  const basePath = getBasePath();
  if (!basePath) return path;
  
  // Remove leading slash from path if it exists, then add basePath
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}

