import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils/formatDate";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group flex flex-col rounded-3xl border border-border bg-background p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border-hover hover:shadow-lg active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:transition-colors md:p-8">
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
        aria-label={`Leer artículo: ${post.title}`}
      >
        <div className="flex flex-wrap items-center gap-3 text-caption text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min de lectura</span>
        </div>

        <h2 className="text-h3 text-foreground transition-colors group-hover:text-accent-foreground">
          {post.title}
        </h2>

        <p className="text-body text-muted-foreground line-clamp-3">
          {post.summary}
        </p>
      </Link>

      {post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="default" className="px-2 py-0.5 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
