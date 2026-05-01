import { getAllPosts } from "@/lib/post";
import { Article } from "@/components/article";
import styles from "./page.module.css";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className={styles.main}>
      <section className={styles.grid}>
        {posts.map((post) => (
          <Article key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
