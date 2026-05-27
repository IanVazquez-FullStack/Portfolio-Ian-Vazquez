import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { BlogPostCard } from "@/components/content/BlogPostCard";
import { Container } from "@/components/ui/Container";
import { StaggeredGrid, StaggeredItem } from "@/components/motion/StaggeredGrid";
import { getBlogPosts } from "@/lib/content/getBlogPosts";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Blog técnico de Ian Vazquez.",
});

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <Container className="py-20">
      <section>
        <p className="text-caption font-semibold uppercase tracking-wide text-foreground">
          Blog
        </p>
        <h1 className="mt-3 text-display text-foreground">Blog</h1>
        <p className="mt-6 max-w-3xl text-body-lg text-muted-foreground">
          Artículos sobre desarrollo web, tecnología y aprendizajes del camino.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-border bg-background p-8 text-center shadow-sm md:p-12">
            <p className="text-body-lg text-muted-foreground">
              Próximamente artículos técnicos sobre el desarrollo de este
              portfolio y más.
            </p>
          </div>
        ) : (
          <StaggeredGrid className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <StaggeredItem key={post.slug}>
                <BlogPostCard post={post} />
              </StaggeredItem>
            ))}
          </StaggeredGrid>
        )}
      </section>
    </Container>
  );
}
