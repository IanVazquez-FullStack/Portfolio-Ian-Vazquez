import { describe, it, expect } from "vitest";
import { getFeaturedProjects } from "./getProjects";

describe("getFeaturedProjects", () => {
  it("returns featured projects sorted by publishedAt descending", () => {
    const projects = getFeaturedProjects();

    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(projects[0]?.slug).toBe("portfolio-ian");
    expect(projects[0]?.featured).toBe(true);
  });

  it("returns at most 4 projects by default", () => {
    const projects = getFeaturedProjects();

    expect(projects.length).toBeLessThanOrEqual(4);
  });

  it("respects custom limit", () => {
    const projects = getFeaturedProjects(1);

    expect(projects.length).toBeLessThanOrEqual(1);
  });

  it("returns only featured projects", () => {
    const projects = getFeaturedProjects();

    for (const project of projects) {
      expect(project.featured).toBe(true);
    }
  });
});
