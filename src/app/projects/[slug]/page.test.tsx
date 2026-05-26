import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ProjectDetailPage, { generateMetadata, generateStaticParams } from "./page";

vi.mock("@/lib/content/getProjects", () => ({
  getProjectBySlug: vi.fn(),
  getProjects: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/lib/content/mdx", () => ({
  compileMdx: vi.fn(async () => function MockContent() {
    return <p>Contenido MDX renderizado</p>;
  }),
}));

vi.mock("next/image", () => ({
  default: function MockImage({ src, alt }: { src: string; alt: string }) {
    return <div data-testid="mock-image" data-src={src} data-alt={alt} />;
  },
}));

import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/content/getProjects";
import { compileMdx } from "@/lib/content/mdx";

const project = {
  title: "Portfolio Ian",
  slug: "portfolio-ian",
  summary: "Portfolio técnico",
  publishedAt: "2026-05-25",
  featured: true,
  stack: ["Next.js", "TypeScript"],
  demoUrl: "https://example.com",
  repoUrl: "https://github.com/ianv/portfolio-ian",
  coverImage: "/projects/portfolio-ian/cover.svg",
  content: "# Portfolio Ian\n\nContenido",
};

describe("ProjectDetailPage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("genera params estáticos para cada proyecto", async () => {
    vi.mocked(getProjects).mockReturnValue([project]);

    await expect(generateStaticParams()).resolves.toEqual([
      { slug: "portfolio-ian" },
    ]);
  });

  it("renderiza el caso técnico con h1 único, enlaces y contenido MDX", async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(project);

    render(await ProjectDetailPage({ params: Promise.resolve({ slug: "portfolio-ian" }) }));

    expect(screen.getByRole("heading", { level: 1, name: /portfolio ian/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /volver a proyectos/i })).toHaveProperty("href", "http://localhost:3000/projects");
    expect(screen.getByRole("link", { name: /demo/i })).toHaveProperty("href", "https://example.com/");
    expect(screen.getByRole("link", { name: /repositorio/i })).toHaveProperty("href", "https://github.com/ianv/portfolio-ian");
    expect(screen.getByRole("link", { name: /contactá/i })).toHaveProperty("href", "http://localhost:3000/contact?ref=portfolio-ian");
    expect(screen.getByText(/contenido mdx renderizado/i)).toBeTruthy();
    expect(compileMdx).toHaveBeenCalledWith(project.content);
  });

  it("devuelve notFound cuando el slug no existe", async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(null);

    await expect(ProjectDetailPage({ params: Promise.resolve({ slug: "unknown" }) })).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("genera metadata básica desde el proyecto", async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(project);

    await expect(generateMetadata({ params: Promise.resolve({ slug: "portfolio-ian" }) })).resolves.toMatchObject({
      title: "Portfolio Ian",
      description: "Portfolio técnico",
    });
  });
});
