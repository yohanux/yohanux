import fs from "node:fs/promises";
import path from "node:path";
import { parseFrontmatter } from "@/lib/post";

export interface WorkMeta {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  // external URL the work opens in a new tab
  link: string;
}

export interface Work extends WorkMeta {
  content: string;
  order: number;
}

const WORK_DIR = path.join(process.cwd(), "src/content/work");

async function loadWorkFromFile(fileName: string): Promise<Work> {
  const raw = await fs.readFile(path.join(WORK_DIR, fileName), "utf-8");
  const { metadata, content } = parseFrontmatter(raw);
  const slug = (metadata.slug as string) ?? fileName.replace(/\.md$/, "");

  return {
    slug,
    title: (metadata.title as string) ?? slug,
    description: (metadata.description as string) ?? "",
    thumbnail: (metadata.thumbnail as string) ?? "",
    link: (metadata.link as string) ?? "",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    order: Number(metadata.order) || 999,
    content,
  };
}

export async function getAllWorks(): Promise<Work[]> {
  const entries = await fs.readdir(WORK_DIR, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".md"),
  );
  const works = await Promise.all(
    files.map((file) => loadWorkFromFile(file.name)),
  );
  return works.sort(
    (a, b) => a.order - b.order || a.slug.localeCompare(b.slug),
  );
}
