import { describe, it, expect } from "vitest";

import { getProjectBySlug, getProjects } from "@/lib/content/getProjects";
import { projectSchema } from "@/lib/content/schemas";

describe("projectSchema", () => {
  it("validates required project frontmatter", () => {
    const parsed = projectSchema.safeParse({
      title: "portfolio-ian",
      slug: "portfolio-ian",
      summary: "Portfolio web de desarrollador full stack con Next.js 14, TypeScript y Framer Motion",
      publishedAt: "2026-05-25",
      featured: true,
      stack: ["Next.js", "TypeScript"],
      coverImage: "/projects/portfolio-ian/cover.webp",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects non-kebab-case slugs", () => {
    const parsed = projectSchema.safeParse({
      title: "Portfolio Ian",
      slug: "PortfolioIan",
      summary: "Portfolio web de desarrollador full stack con Next.js 14, TypeScript y Framer Motion",
      publishedAt: "2026-05-25",
      featured: true,
      stack: ["Next.js", "TypeScript"],
      coverImage: "/projects/portfolio-ian/cover.webp",
    });

    expect(parsed.success).toBe(false);
  });
});

describe("project loaders", () => {
  it("loads projects sorted by publishedAt descending", () => {
    const projects = getProjects();

    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(projects[0]?.slug).toBe("portfolio-ian");
  });

  it("loads one project by slug with renderable MDX content", () => {
    const project = getProjectBySlug("portfolio-ian");

    expect(project).not.toBeNull();
    expect(project?.slug).toBe("portfolio-ian");
    expect(typeof project?.content).toBe("string");
    expect(project?.content).toContain("# Portfolio Ian");
  });

  it("returns null for an unknown slug", () => {
    expect(getProjectBySlug("unknown-project")).toBeNull();
  });
});
