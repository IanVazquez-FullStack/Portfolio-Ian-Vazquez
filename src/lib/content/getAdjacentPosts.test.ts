import { describe, it, expect } from "vitest";

import { getAdjacentPosts } from "@/lib/content/getAdjacentPosts";
import type { BlogPost } from "@/lib/content/schemas";

function createPost(slug: string, title: string): BlogPost {
  return {
    title,
    slug,
    summary: `Summary for ${title}`,
    publishedAt: "2026-05-25",
    tags: ["test"],
    draft: false,
    readingTime: 1,
  };
}

describe("getAdjacentPosts", () => {
  it("returns null for both when posts array is empty", () => {
    const result = getAdjacentPosts("any", []);
    expect(result.prev).toBeNull();
    expect(result.next).toBeNull();
  });

  it("returns null for both when slug is not found", () => {
    const posts = [createPost("post-a", "Post A")];
    const result = getAdjacentPosts("unknown", posts);
    expect(result.prev).toBeNull();
    expect(result.next).toBeNull();
  });

  it("returns null prev and null next for a single post", () => {
    const posts = [createPost("post-a", "Post A")];
    const result = getAdjacentPosts("post-a", posts);
    expect(result.prev).toBeNull();
    expect(result.next).toBeNull();
  });

  it("returns correct prev/next for middle post in descending order", () => {
    const posts = [
      createPost("post-newest", "Newest"),
      createPost("post-middle", "Middle"),
      createPost("post-oldest", "Oldest"),
    ];

    const result = getAdjacentPosts("post-middle", posts);
    expect(result.prev?.slug).toBe("post-oldest");
    expect(result.next?.slug).toBe("post-newest");
  });

  it("returns null next for newest post (first in desc array)", () => {
    const posts = [
      createPost("post-newest", "Newest"),
      createPost("post-older", "Older"),
    ];

    const result = getAdjacentPosts("post-newest", posts);
    expect(result.prev?.slug).toBe("post-older");
    expect(result.next).toBeNull();
  });

  it("returns null prev for oldest post (last in desc array)", () => {
    const posts = [
      createPost("post-newer", "Newer"),
      createPost("post-oldest", "Oldest"),
    ];

    const result = getAdjacentPosts("post-oldest", posts);
    expect(result.prev).toBeNull();
    expect(result.next?.slug).toBe("post-newer");
  });
});
