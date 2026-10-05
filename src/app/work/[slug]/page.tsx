import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";
import { getAllWorks, getWorkBySlug } from "@/lib/work";
import { withBasePath } from "@/lib/path";
import styles from "./page.module.css";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return {};
  return { title: work.title, description: work.description };
}

export async function generateStaticParams() {
  const works = await getAllWorks();
  return works
    .filter((work) => !work.link)
    .map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <main className={styles.main}>
      <Link href="/work" className={`${styles.back} typo-5 text-gray-800`}>
        ← 작업물
      </Link>
      <h1 className={`typo-2 font-600 text-gray-900`}>{work.title}</h1>
      <p className="typo-5 text-gray-800">{work.description}</p>
      <div className={styles.cover}>
        <Image
          src={withBasePath(work.thumbnail)}
          alt={work.title}
          fill
          sizes="(min-width: 768px) 700px, 100vw"
          className={styles.image}
        />
      </div>
      <div className={styles.prose}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            p: ({ node, ...props }) => {
              void node;
              return <p className="typo-5 text-gray-800" {...props} />;
            },
            h3: ({ node, ...props }) => {
              void node;
              return (
                <h3 className="typo-2 font-700 text-gray-900" {...props} />
              );
            },
            ul: ({ node, ...props }) => {
              void node;
              return (
                <ul
                  className={`${styles.list} typo-5 text-gray-800`}
                  {...props}
                />
              );
            },
            img: ({ node, src, alt }) => {
              void node;
              return (
                <Image
                  src={withBasePath(String(src) || "")}
                  alt={alt || ""}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={styles.contentImage}
                />
              );
            },
          }}
        >
          {work.content}
        </ReactMarkdown>
      </div>
    </main>
  );
}
