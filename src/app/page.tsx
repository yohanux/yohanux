import { getAllPosts } from "@/lib/post";
import { Article } from "@/components/article";
import { SplitText } from "@/components/split-text";
import styles from "./page.module.css";

const HERO_LINES = ["생각과 경험을", "회고하고 공유합니다"];

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className={styles.main}>
      <h1 className={`${styles.hero} typo-1 font-600 text-gray-900`}>
        <SplitText lines={HERO_LINES} />
      </h1>
      <section className={styles.grid}>
        {posts.map((post, index) => (
          <Article key={post.slug} post={post} index={index} />
        ))}
      </section>
    </main>
  );
}
