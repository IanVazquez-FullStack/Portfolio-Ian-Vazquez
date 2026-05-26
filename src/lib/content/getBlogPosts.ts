import fs from "node:fs";
import path from "node:path";

import { parseMdx } from "@/lib/content/mdx";
import { type BlogPostWithContent, postSchema } from "@/lib/content/schemas";
import { readingTime } from "@/lib/utils/readingTime";

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog");
const MDX_EXTENSION = ".mdx";

function getBlogFilePaths(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(MDX_EXTENSION))
    .sort()
    .map((fileName) => path.join(BLOG_DIRECTORY, fileName));
}

function getSlugFromFilePath(filePath: string): string {
  return path.basename(filePath, MDX_EXTENSION);
}

function readBlogPost(filePath: string): BlogPostWithContent {
  const slug = getSlugFromFilePath(filePath);
  const source = fs.readFileSync(filePath, "utf8");
  const { frontmatter, content } = parseMdx(source);
  const result = postSchema.safeParse(frontmatter);

  if (!result.success) {
    throw new Error(
      `[portfolio-ian] Invalid frontmatter in ${slug}: ${JSON.stringify(result.error.format())}`,
    );
  }

  if (result.data.slug !== slug) {
    throw new Error(
      `[portfolio-ian] Invalid frontmatter in ${slug}: {"slug":{"_errors":["Slug must match file name"]}}`,
    );
  }

  return {
    ...result.data,
    readingTime: readingTime(content),
    content,
  };
}

export function getBlogPosts(): BlogPostWithContent[] {
  const isProduction = process.env.NODE_ENV === "production";

  return getBlogFilePaths()
    .map(readBlogPost)
    .filter((post) => {
      if (!isProduction) return true;
      return !post.draft;
    })
    .sort((firstPost, secondPost) => {
      const firstDate = Date.parse(firstPost.publishedAt);
      const secondDate = Date.parse(secondPost.publishedAt);

      if (firstDate !== secondDate) {
        return secondDate - firstDate;
      }

      return secondPost.slug.localeCompare(firstPost.slug);
    });
}

export function getBlogPostBySlug(slug: string): BlogPostWithContent | null {
  const isProduction = process.env.NODE_ENV === "production";
  const filePath = path.join(BLOG_DIRECTORY, `${slug}${MDX_EXTENSION}`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const post = readBlogPost(filePath);

  if (isProduction && post.draft) {
    return null;
  }

  return post;
}
