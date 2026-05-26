import { describe, it, expect } from "vitest";

import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/getBlogPosts";
import { postSchema } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils/formatDate";
import { readingTime } from "@/lib/utils/readingTime";

describe("postSchema", () => {
  it("validates required post frontmatter", () => {
    const parsed = postSchema.safeParse({
      title: "Hola Mundo",
      slug: "hola-mundo",
      summary: "Mi primer post en el blog de portfolio.",
      publishedAt: "2026-05-25",
      tags: ["introducción", "portfolio"],
    });

    expect(parsed.success).toBe(true);
    expect(parsed.data?.draft).toBe(false);
  });

  it("rejects non-kebab-case slugs", () => {
    const parsed = postSchema.safeParse({
      title: "Hola Mundo",
      slug: "HolaMundo",
      summary: "Mi primer post en el blog de portfolio.",
      publishedAt: "2026-05-25",
      tags: ["introducción"],
    });

    expect(parsed.success).toBe(false);
  });

  it("accepts explicit draft: true", () => {
    const parsed = postSchema.safeParse({
      title: "Draft Post",
      slug: "draft-post",
      summary: "A draft post.",
      publishedAt: "2026-05-25",
      tags: ["draft"],
      draft: true,
    });

    expect(parsed.success).toBe(true);
    expect(parsed.data?.draft).toBe(true);
  });
});

describe("blog post loaders", () => {
  it("loads blog posts sorted by publishedAt descending", () => {
    const posts = getBlogPosts();

    expect(posts.length).toBeGreaterThanOrEqual(1);

    const publishedDates = posts.map((post) => Date.parse(post.publishedAt));
    expect(publishedDates).toEqual([
      ...publishedDates,
    ].sort((first, second) => second - first));

    expect(posts.every((post) => typeof post.content === "string")).toBe(true);
    expect(posts[0]?.readingTime).toBeGreaterThanOrEqual(1);
  });

  it("excludes draft posts in production mode", () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    try {
      const posts = getBlogPosts();
      expect(posts.some((post) => post.draft)).toBe(false);
    } finally {
      process.env.NODE_ENV = originalNodeEnv;
    }
  });

  it("loads one blog post by slug with renderable MDX content", () => {
    const post = getBlogPostBySlug("hola-mundo");

    expect(post).not.toBeNull();
    expect(post?.slug).toBe("hola-mundo");
    expect(typeof post?.content).toBe("string");
    expect(post?.content).toContain("# Hola Mundo");
    expect(post?.readingTime).toBeGreaterThanOrEqual(1);
  });

  it("returns null for an unknown slug", () => {
    expect(getBlogPostBySlug("unknown-post")).toBeNull();
  });
});

describe("readingTime", () => {
  it("returns at least 1 minute for short text", () => {
    expect(readingTime("hello world")).toBe(1);
  });

  it("returns 1 minute for empty or whitespace-only text", () => {
    expect(readingTime("")).toBe(1);
    expect(readingTime("   ")).toBe(1);
  });

  it("calculates reading time based on 200 words per minute", () => {
    const text = Array(400).fill("word").join(" ");
    expect(readingTime(text)).toBe(2);
  });
});

describe("formatDate", () => {
  it("formats date in Spanish", () => {
    const formatted = formatDate("2026-05-25");
    expect(formatted).toContain("25");
    expect(formatted).toContain("mayo");
    expect(formatted).toContain("2026");
  });
});
