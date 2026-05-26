import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { MDXComponents } from "@/components/content/MDXComponents";
import { compileMdx } from "@/lib/content/mdx";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/getBlogPosts";
import { getAdjacentPosts } from "@/lib/content/getAdjacentPosts";
import { formatDate } from "@/lib/utils/formatDate";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Artículo no encontrado",
      description: "El artículo solicitado no está disponible.",
    });
  }

  const metadata = buildMetadata({
    title: post.title,
    description: post.summary,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const Content = await compileMdx(post.content);
  const posts = getBlogPosts();
  const { prev, next } = getAdjacentPosts(slug, posts);

  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          ← Volver al blog
        </Link>

        <header className="mb-10">
          <h1 className="text-h1 text-foreground">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-caption text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime} min de lectura</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-none">
          <Content components={MDXComponents} />
        </div>

        <nav
          className="mt-16 flex items-center justify-between border-t border-border pt-8"
          aria-label="Navegación de artículos"
        >
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col items-start text-left"
            >
              <span className="text-caption text-muted-foreground">
                ← Anterior
              </span>
              <span className="text-body font-medium text-foreground transition-colors group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-caption text-muted-foreground">
                Siguiente →
              </span>
              <span className="text-body font-medium text-foreground transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </Container>
  );
}
