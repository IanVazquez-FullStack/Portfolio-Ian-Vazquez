import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/content/getBlogPosts", () => ({
  getBlogPosts: vi.fn(),
}));

vi.mock("@/lib/content/getProjects", () => ({
  getProjects: vi.fn(),
}));

import { SITE_URL } from "@/lib/seo/site";
import sitemap from "./sitemap";
import { getBlogPosts } from "@/lib/content/getBlogPosts";
import { getProjects } from "@/lib/content/getProjects";
import type { BlogPostWithContent, ProjectWithContent } from "@/lib/content/schemas";

describe("sitemap metadata route", () => {
  it("includes static routes and dynamic entries for projects and published blog posts only", async () => {
    vi.mocked(getProjects).mockReturnValue([
      {
        title: "Project Alpha",
        slug: "project-alpha",
        summary: "A project summary",
        publishedAt: "2026-04-01",
        featured: false,
        stack: ["Next.js"],
        demoUrl: "https://example.com",
        repoUrl: "https://github.com/example/project-alpha",
        coverImage: "/projects/project-alpha/cover.webp",
        content: "# Project Alpha",
      } as ProjectWithContent,
    ]);

    vi.mocked(getBlogPosts).mockReturnValue([
      {
        title: "Live Post",
        slug: "post-live",
        summary: "A published post",
        publishedAt: "2026-03-15",
        tags: ["web"],
        draft: false,
        readingTime: 3,
        content: "# Live Post",
      } as BlogPostWithContent,
      {
        title: "Draft Post",
        slug: "post-draft",
        summary: "A draft post",
        publishedAt: "2026-05-01",
        tags: ["web"],
        draft: true,
        readingTime: 2,
        content: "# Draft Post",
      } as BlogPostWithContent,
    ]);

    const result = await sitemap();

    expect(result).toHaveLength(7);
    expect(result.slice(0, 5).map((entry) => entry.url)).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/about`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/projects`,
      `${SITE_URL}/blog`,
    ]);

    expect(result.slice(0, 5).every((entry) => entry.lastModified instanceof Date)).toBe(true);
    expect(result[5]).toEqual({
      url: `${SITE_URL}/projects/project-alpha`,
      lastModified: new Date("2026-04-01"),
    });
    expect(result[6]).toEqual({
      url: `${SITE_URL}/blog/post-live`,
      lastModified: new Date("2026-03-15"),
    });
  });
});
