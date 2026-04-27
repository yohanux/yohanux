import fs from "node:fs/promises";
import path from "node:path";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  coverImage: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

const POST_DIR = path.join(process.cwd(), "src/content/post");
const HIDDEN_POST_SLUGS = new Set(["designer-gear"]);

function parseFrontmatter(raw: string): { metadata: Partial<PostMeta>; content: string } {
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

  return { metadata: metadata as Partial<PostMeta>, content };
}

async function loadPostFromFile(fileName: string): Promise<Post> {
  const filePath = path.join(POST_DIR, fileName);
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
    content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const entries = await fs.readdir(POST_DIR, { withFileTypes: true });
  const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

  const posts = await Promise.all(markdownFiles.map((file) => loadPostFromFile(file.name)));

  return posts
    .filter((post) => !HIDDEN_POST_SLUGS.has(post.slug.trim().toLowerCase()))
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const normalized = slug.trim().toLowerCase();
  const posts = await getAllPosts();
  return posts.find((post) => post.slug.toLowerCase() === normalized) ?? null;
}


