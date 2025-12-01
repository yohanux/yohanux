import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3 text-center">
        <p className="text-sm font-[var(--font-weight-600)] uppercase tracking-[0.4em] text-[var(--color-gray-500)]">
          Blog
        </p>
        <h1 className="text-4xl font-[var(--font-weight-700)] text-[var(--color-gray-900)]">
          생각과 과정을 기록하는 공간
        </h1>
        <p className="text-lg text-[var(--color-gray-600)]">
          웹사이트 개편중입니다
        </p>
      </header>

      <section className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-[var(--color-gray-100)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-gray-500)]">
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.tags.join(" / ")}</span>
            </div>

            <h2 className="mt-3 text-2xl font-[var(--font-weight-700)] text-[var(--color-gray-900)]">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-[var(--primary)]"
              >
                {post.title}
              </Link>
            </h2>

            <p className="mt-3 text-[var(--color-gray-600)]">{post.description}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-[var(--font-weight-600)] text-[var(--color-gray-900)] underline-offset-4 hover:underline"
            >
              전체 읽기 →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

