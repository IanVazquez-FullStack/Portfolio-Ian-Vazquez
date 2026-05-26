import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { compileMdx, parseMdx } from "./mdx";
import fs from "node:fs";
import path from "node:path";

const testPostPath = path.join(
  process.cwd(),
  "src",
  "content",
  "blog",
  "test-mdx-features.mdx",
);

describe("compileMdx", () => {
  it("compiles the test blog post without errors", async () => {
    const source = fs.readFileSync(testPostPath, "utf8");
    const { content } = parseMdx(source);
    const Content = await compileMdx(content);

    expect(typeof Content).toBe("function");
  });

  it("renders syntax highlighting for ts and bash code blocks", async () => {
    const mdxSource = `
## Code Test

\`\`\`ts
const x: number = 1;
\`\`\`

\`\`\`bash
echo hello
\`\`\`
`;
    const Content = await compileMdx(mdxSource);
    const html = renderToStaticMarkup(<Content />);

    expect(html).toContain('data-language="ts"');
    expect(html).toContain('data-language="bash"');
    expect(html).toContain("const");
    expect(html).toContain("echo");
  });

  it("renders headings, paragraphs, lists, links, and blockquotes", async () => {
    const mdxSource = `
## Heading Two

Some paragraph text.

- Item one
- Item two

[Internal link](/about)

> A quote
`;
    const Content = await compileMdx(mdxSource);
    const html = renderToStaticMarkup(<Content />);

    expect(html).toContain("Heading Two");
    expect(html).toContain("Some paragraph text.");
    expect(html).toContain("Item one");
    expect(html).toContain("Item two");
    expect(html).toContain('/about');
    expect(html).toContain("A quote");
  });
});
