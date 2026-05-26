import { describe, it, expect } from "vitest";
import { buildMetadata } from "./metadata";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  AUTHOR,
  DEFAULT_OG_IMAGE,
} from "./site";

describe("site.ts constants", () => {
  it("exports expected constants", () => {
    expect(SITE_NAME).toBe("Ian Vázquez");
    expect(SITE_URL).toBeTruthy();
    expect(DEFAULT_DESCRIPTION).toContain("Full Stack");
    expect(AUTHOR).toBe("Ian Vázquez");
    expect(DEFAULT_OG_IMAGE).toBe("/og/default-og.webp");
  });
});

describe("buildMetadata", () => {
  it("returns default metadata with no options", () => {
    const meta = buildMetadata();

    expect(meta.title).toEqual({
      default: SITE_NAME,
      template: `%s — ${SITE_NAME}`,
    });
    expect(meta.description).toBe(DEFAULT_DESCRIPTION);
    expect(meta.metadataBase).toBeInstanceOf(URL);
    expect(meta.openGraph).toMatchObject({
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
      siteName: SITE_NAME,
      type: "website",
    });
    expect(meta.twitter).toMatchObject({
      card: "summary_large_image",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    });
    expect(meta.alternates).toBeUndefined();
  });

  it("uses custom title and description when provided", () => {
    const meta = buildMetadata({
      title: "Sobre mí",
      description: "Una descripción personalizada.",
    });

    expect(meta.openGraph?.title).toBe("Sobre mí");
    expect(meta.twitter?.title).toBe("Sobre mí");
    expect(meta.description).toBe("Una descripción personalizada.");
    expect(meta.openGraph?.description).toBe("Una descripción personalizada.");
  });

  it("uses custom ogImage when provided", () => {
    const meta = buildMetadata({ ogImage: "/custom-og.webp" });

    expect(meta.openGraph?.images).toEqual(["/custom-og.webp"]);
    expect(meta.twitter?.images).toEqual(["/custom-og.webp"]);
  });

  it("adds alternates.canonical when canonical is provided", () => {
    const meta = buildMetadata({ canonical: "/about" });

    expect(meta.alternates).toEqual({ canonical: "/about" });
    expect(meta.openGraph?.url).toBe("/about");
  });

  it("falls back to defaults when empty strings are passed", () => {
    const meta = buildMetadata({
      title: "",
      description: "  ",
      ogImage: "",
    });

    expect(meta.openGraph?.title).toBe(SITE_NAME);
    expect(meta.twitter?.title).toBe(SITE_NAME);
    expect(meta.description).toBe(DEFAULT_DESCRIPTION);
    expect(meta.openGraph?.images).toEqual([DEFAULT_OG_IMAGE]);
  });

  it("handles SITE_URL from environment", () => {
    expect(SITE_URL).toMatch(/^https?:\/\//);
    expect(() => new URL(SITE_URL)).not.toThrow();
  });
});
