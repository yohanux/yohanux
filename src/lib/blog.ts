import fs from "node:fs/promises";
import path from "node:path";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  coverImage: string;
  tags: string[];
  tileType?: "1:1" | "1:2" | "2:1"; // 갤러리 타일 비율 (선택사항)
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(raw: string): { metadata: Partial<BlogPostMeta>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?/;
  const match = raw.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content: raw.trim() };
  }

  const [, frontmatter] = match;
  const metadataLines = frontmatter
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const metadata: Record<string, string | string[]> = {};

  for (const line of metadataLines) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;

    let value = rest.join(":").trim();

    // Remove surrounding quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith("[") && value.endsWith("]")) {
      metadata[key.trim()] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    if (value.includes(",")) {
      metadata[key.trim()] = value
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    metadata[key.trim()] = value;
  }

  const content = raw.slice(match[0].length).trim();

  return { metadata: metadata as Partial<BlogPostMeta>, content };
}

async function loadPostFromFile(fileName: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, fileName);
  const fileContents = await fs.readFile(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(fileContents);

  const slug = (metadata.slug as string) ?? fileName.replace(/\.md$/, "");

  return {
    slug,
    title: (metadata.title as string) ?? slug,
    description: (metadata.description as string) ?? "",
    publishedAt: (metadata.publishedAt as string) ?? new Date().toISOString(),
    coverImage: (metadata.coverImage as string) ?? "",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    tileType: (metadata.tileType as "1:1" | "1:2" | "2:1") || undefined,
    content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

  const posts = await Promise.all(markdownFiles.map((file) => loadPostFromFile(file.name)));

  return posts.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalized = slug.trim().toLowerCase();
  const posts = await getAllPosts();
  return posts.find((post) => post.slug.toLowerCase() === normalized) ?? null;
}


