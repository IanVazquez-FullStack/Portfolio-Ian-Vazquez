import { compile, run } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";

export type ParsedMdx = {
  frontmatter: Record<string, unknown>;
  content: string;
};

export function parseMdx(source: string): ParsedMdx {
  const parsed = matter(source);

  return {
    frontmatter: parsed.data,
    content: parsed.content.trim(),
  };
}

const prettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

let rehypePrettyCode: typeof import("rehype-pretty-code").default | null = null;

async function getRehypePrettyCode() {
  if (!rehypePrettyCode) {
    rehypePrettyCode = (await import("rehype-pretty-code")).default;
  }
  return rehypePrettyCode;
}

export async function compileMdx(source: string): Promise<React.FC<{ components?: MDXComponents }>> {
  const code = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[await getRehypePrettyCode(), prettyCodeOptions]],
  });

  const { default: Content } = await run(String(code), {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return Content;
}
