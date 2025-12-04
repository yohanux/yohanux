import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
        <h1 className="text-4xl font-[var(--font-weight-700)] text-[var(--color-gray-900)]">
          {title}
        </h1>
        <p className="text-[16px] leading-[22px] font-[var(--font-weight-500)] text-[var(--color-gray-600)]">
          {subtitle}
        </p>
        <p className="text-sm text-[var(--color-gray-500)]">
          {dateObj.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            p: ({ node, ...props }) => {
              if (
                node &&
                node.children.length === 1 &&
                node.children[0].type === "element" &&
                node.children[0].tagName === "img"
              ) {
                return <>{props.children}</>;
              }
              return (
                <p
                  className="text-lg leading-relaxed text-[var(--color-gray-700)]"
                  {...props}
                />
              );
            },
            h3: ({ node, ...props }) => (
              <h3
                className="text-2xl font-[var(--font-weight-700)] text-[var(--color-gray-900)]"
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="list-disc space-y-2 pl-5 text-lg text-[var(--color-gray-700)]"
                {...props}
              />
            ),
            img: ({ node, src, alt, ...props }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { width, height, ...rest } = props;
              return (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={withBasePath(String(src) || "")}
                    alt={alt || ""}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                    {...rest}
                  />
                </div>
              );
            },
            a: ({ node, ...props }) => (
              <a className="text-[var(--color-primary)] hover:underline" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-[var(--color-gray-200)] pl-4 italic text-[var(--color-gray-600)]" {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="border-t border-[var(--color-gray-100)] pt-6">
        <Link
          href="/"
          className="text-sm font-[var(--font-weight-600)] text-[var(--color-gray-900)] underline-offset-4 hover:underline"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}


