import { getAllPosts } from "@/lib/post";
import { Article } from "@/components/article";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col px-5 min-[810px]:px-[60px] min-[1200px]:px-20 py-16 animate-fade-in-up">
      <section className="mx-auto grid grid-cols-1 min-[810px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-6 min-[810px]:gap-12 max-w-[1240px] w-full">
        {posts.map((post) => (
          <Article key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
