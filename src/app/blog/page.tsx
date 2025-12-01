import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { withBasePath } from "@/lib/path";

export default async function BlogPage() {
  const posts = await getAllPosts();

  // 타일 타입 매핑
  const getTileConfig = (tileType: "1:1" | "1:2" | "2:1") => {
    const configs = {
      "1:1": { ratio: "1:1", colSpan: 1, rowSpan: 1 },
      "1:2": { ratio: "1:2", colSpan: 1, rowSpan: 2 },
      "2:1": { ratio: "2:1", colSpan: 2, rowSpan: 1 },
    };
    return configs[tileType];
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 min-[810px]:px-[60px] min-[1200px]:px-20 py-16">
      <section 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        style={{ 
          gridAutoFlow: "dense",
          gridAutoRows: "1fr"
        }}
      >
        {posts.map((post) => {
          const tileConfig = getTileConfig(post.tileType || "1:1");
          // 정사각형만 aspect ratio 고정, 가로/세로 타입은 그리드 공간에 맞춰 자동으로 늘어남
          const aspectRatio = tileConfig.ratio === "1:1" ? "1 / 1" : undefined;
          
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden cursor-pointer rounded-2xl h-full"
              style={{
                gridColumn: `span ${tileConfig.colSpan}`,
                gridRow: `span ${tileConfig.rowSpan}`,
              }}
            >
              <div 
                className="relative w-full h-full overflow-hidden rounded-2xl"
                style={aspectRatio ? { aspectRatio } : {}}
              >
                <Image
                  src={withBasePath(post.coverImage)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-[var(--font-weight-700)] mb-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/90">
                    {new Date(post.publishedAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

