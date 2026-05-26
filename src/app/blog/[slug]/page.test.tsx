import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { generateMetadata, generateStaticParams } from "./page";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/getBlogPosts";
import { compileMdx } from "@/lib/content/mdx";

vi.mock("@/lib/content/getBlogPosts", () => ({
  getBlogPostBySlug: vi.fn(),
  getBlogPosts: vi.fn(),
}));

vi.mock("@/lib/content/mdx", () => ({
  compileMdx: vi.fn(async () => function MockContent() {
    return <p>Contenido MDX</p>;
  }),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

const post = {
  title: "Primer post",
  slug: "primer-post",
  summary: "Resumen del primer post",
  publishedAt: "2026-05-25",
  tags: ["aprendizaje", "dev"],
  draft: false,
  readingTime: 5,
  content: "# Primer post\n\nContenido",
};

describe("BlogPostPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("genera params estáticos para cada post", async () => {
    vi.mocked(getBlogPosts).mockReturnValue([post]);

    await expect(generateStaticParams()).resolves.toEqual([{ slug: "primer-post" }]);
  });

  it("genera metadata de artículo desde el post", async () => {
    vi.mocked(getBlogPostBySlug).mockReturnValue(post);

    await expect(generateMetadata({ params: Promise.resolve({ slug: "primer-post" }) })).resolves.toMatchObject({
      description: "Resumen del primer post",
      openGraph: {
        type: "article",
        publishedTime: "2026-05-25",
        tags: ["aprendizaje", "dev"],
      },
    });
  });

  it("devuelve metadata de fallback cuando el post no existe", async () => {
    vi.mocked(getBlogPostBySlug).mockReturnValue(null);

    await expect(generateMetadata({ params: Promise.resolve({ slug: "unknown" }) })).resolves.toMatchObject({
      description: "El artículo solicitado no está disponible.",
    });
  });
});
