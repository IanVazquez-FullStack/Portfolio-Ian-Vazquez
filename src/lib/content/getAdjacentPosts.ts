import type { BlogPost } from "@/lib/content/schemas";

export type AdjacentPosts = {
  prev: BlogPost | null;
  next: BlogPost | null;
};

/**
 * Given a sorted list of posts (descending by publishedAt) and a current slug,
 * returns the chronologically adjacent posts.
 *
 * Posts are sorted newest-first (publishedAt desc).
 * - "prev" (Anterior) = published earlier in time = appears later in the array (index + 1)
 * - "next" (Siguiente) = published later in time = appears earlier in the array (index - 1)
 */
export function getAdjacentPosts(
  currentSlug: string,
  posts: BlogPost[],
): AdjacentPosts {
  const index = posts.findIndex((p) => p.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index < posts.length - 1 ? (posts[index + 1] ?? null) : null;
  const next = index > 0 ? (posts[index - 1] ?? null) : null;

  return { prev, next };
}
