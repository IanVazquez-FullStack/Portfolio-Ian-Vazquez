import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ProjectsPage, { metadata } from "./page";

vi.mock("@/lib/content/getProjects", () => ({
  getProjects: vi.fn(),
}));

import { getProjects } from "@/lib/content/getProjects";

vi.mock("next/image", () => ({
  default: function MockImage({ src, alt }: { src: string; alt: string }) {
    return <div data-testid="mock-image" data-src={src} data-alt={alt} />;
  },
}));

describe("ProjectsPage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // TODO: Install @testing-library/jest-dom and change toBeTruthy() to toBeInTheDocument()
  it("renderiza heading principal h1 Proyectos", () => {
    vi.mocked(getProjects).mockReturnValue([]);

    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /proyectos/i })
    ).toBeTruthy();
  });

  it("muestra empty state cuando no hay proyectos", () => {
    vi.mocked(getProjects).mockReturnValue([]);

    render(<ProjectsPage />);

    expect(screen.getByText(/próximamente: proyectos en construcción/i)).toBeTruthy();
    expect(
      screen.getByText(/estoy trabajando en nuevos proyectos/i)
    ).toBeTruthy();
  });

  it("renderiza grid de proyectos con heading h2 por card", () => {
    vi.mocked(getProjects).mockReturnValue([
      {
        title: "Portfolio Ian",
        slug: "portfolio-ian",
        summary: "Mi portfolio personal",
        publishedAt: "2026-05-25",
        featured: true,
        stack: ["Next.js", "TypeScript"],
        coverImage: "/projects/portfolio-ian/cover.webp",
        content: "",
      },
    ]);

    render(<ProjectsPage />);

    const list = screen.getByRole("list", { name: /listado de proyectos/i });
    expect(list).toBeTruthy();

    expect(
      screen.getByRole("heading", { level: 2, name: /portfolio ian/i })
    ).toBeTruthy();
  });

  it("exporta metadata estática correcta", () => {
    expect(metadata.title).toBe("Proyectos");
    expect(metadata.description).toContain("Ian Vázquez");
  });
});
