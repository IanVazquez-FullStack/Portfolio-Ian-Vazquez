import { describe, expect, it } from "vitest";

import { SITE_URL } from "@/lib/seo/site";
import robots from "./robots";

describe("robots metadata route", () => {
  it("returns allow all rules and sitemap reference", () => {
    const result = robots();

    expect(result).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${SITE_URL}/sitemap.xml`,
    });
  });
});
