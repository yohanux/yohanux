import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/post";
import { withBasePath } from "@/lib/path";
import styles from "./page.module.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yohanux.com";

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const embedMatch = u.pathname.match(/\/embed\/([^/?]+)/);
      if (embedMatch) return embedMatch[1];
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const post = await getPostBySlug(normalizedSlug);

  if (!post) return {};

  const ogImage = `${siteUrl}${withBasePath(post.coverImage)}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
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

  const title = post.title;
  const subtitle = post.description;
  const dateObj = new Date(post.publishedAt);

  return (
    <article className={styles.article}>
      <div className={styles.coverWrapper}>
        <Image
          src={withBasePath(post.coverImage)}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <h1 className="typo-hero font-600 text-gray-900">
            {title}
          </h1>
          <p className={`${styles.subtitle} font-400 text-gray-600`}>
            {subtitle}
          </p>
          <p className="typo-sub-10 text-gray-500">
            {dateObj.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className={styles.prose}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              p: ({ node, ...props }) => {
                const paragraphChildren = node?.children ?? [];
                const hasOnlyImageLikeChildren =
                  paragraphChildren.length > 0 &&
                  paragraphChildren.every((child) => {
                    if (child.type === "text") {
                      return !child.value?.trim();
                    }
                    return child.type === "element" && child.tagName === "img";
                  });

                if (node && hasOnlyImageLikeChildren) {
                  return <>{props.children}</>;
                }
                return <p className="typo-5 text-gray-800" {...props} />;
              },
              h3: ({ node, ...props }) => (
                <h3 className="typo-1 font-700 text-gray-900" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className={`${styles.list} typo-5 text-gray-800`} {...props} />
              ),
              img: ({ node, src, alt, ...props }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { width, height, ...rest } = props;
                return (
                  <span className={styles.imageWrapper}>
                    <Image
                      src={withBasePath(String(src) || "")}
                      alt={alt || ""}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      {...rest}
                    />
                  </span>
                );
              },
              a: ({ node, href, children, ...props }) => {
                const youtubeId = href ? getYouTubeId(href) : null;
                if (youtubeId) {
                  return (
                    <span className={styles.youtubeWrapper}>
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.youtubeFrame}
                      />
                    </span>
                  );
                }
                return <a href={href} className={`text-primary ${styles.link}`} {...props}>{children}</a>;
              },
              blockquote: ({ node, ...props }) => (
                <blockquote className={styles.blockquote} {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className={styles.footer}>
          <Link href="/" className="typo-sub-10 font-600 text-gray-900">
            ← 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </article>
  );
}
