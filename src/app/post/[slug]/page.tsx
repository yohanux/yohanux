import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/post";
import { withBasePath } from "@/lib/path";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function renderContent(content: string) {
  return content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      // 이미지 마크다운 처리: ![alt text](image-path)
      const imageRegex = /^!\[([^\]]*)\]\(([^)]+)\)$/;
      const imageMatch = block.match(imageRegex);
      if (imageMatch) {
        const [, alt, imagePath] = imageMatch;
        return (
          <div key={`image-${index}`} className="w-full">
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={withBasePath(imagePath)}
                alt={alt || ""}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
        );
      }

      if (block.startsWith("### ")) {
        return (
          <h3
            key={`heading-${index}`}
            className="text-2xl font-[var(--font-weight-700)] text-[var(--color-gray-900)]"
          >
            {block.replace(/^###\s*/, "")}
          </h3>
        );
      }

      if (block.startsWith("- ")) {
        const items = block.split("\n").map((item) => item.replace(/^-+\s*/, "").trim());
        return (
          <ul key={`list-${index}`} className="list-disc space-y-2 pl-5 text-lg text-[var(--color-gray-700)]">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={`paragraph-${index}`} className="text-lg leading-relaxed text-[var(--color-gray-700)]">
          {block}
        </p>
      );
    });
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  const post = await getPostBySlug(normalizedSlug);

  if (!post) {
    return notFound();
  }

  // Article 상세페이지 요소 정의
  const title = post.title; // 제목
  const subtitle = post.description; // 소개글
  const dateObj = new Date(post.publishedAt); // 날짜

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 pb-16">
      <div className="relative h-72 w-full overflow-hidden border border-[var(--color-gray-100)] bg-[var(--color-gray-50)]">
        <Image
          src={withBasePath(post.coverImage)}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <div className="space-y-4 text-left">
        <h1 className="text-4xl font-[var(--font-weight-700)] text-[var(--color-gray-900)]">{title}</h1>
        <p className="text-[16px] leading-[22px] font-[var(--font-weight-500)] text-[var(--color-gray-600)]">{subtitle}</p>
        <p className="text-sm text-[var(--color-gray-500)]">
          {dateObj.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="space-y-5">{renderContent(post.content)}</div>

      <div className="border-t border-[var(--color-gray-100)] pt-6">
        <Link href="/" className="text-sm font-[var(--font-weight-600)] text-[var(--color-gray-900)] underline-offset-4 hover:underline">
          ← 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}


