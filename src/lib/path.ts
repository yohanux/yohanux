/**
 * Get the base path for GitHub Pages deployment
 * Returns empty string for custom domain, "/yohanux" only if explicitly on GitHub Pages subdomain
 */
export function getBasePath(): string {
  if (typeof window !== "undefined") {
    // Client-side: check if we're on GitHub Pages subdomain (not custom domain)
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // If using custom domain (not *.github.io), return empty string
    if (!hostname.includes("github.io")) {
      return "";
    }
    
    // If on GitHub Pages subdomain and path starts with /yohanux, use it
    if (pathname.startsWith("/yohanux")) {
      return "/yohanux";
    }
    
    return "";
  }
  
  // Server-side: only use /yohanux if explicitly set via environment variable
  // Custom domain deployments should not set GITHUB_PAGES=true
  return process.env.GITHUB_PAGES === "true" ? "/yohanux" : "";
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

