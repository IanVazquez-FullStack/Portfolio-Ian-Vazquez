import { z } from "zod";

const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)?$/;

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(kebabCaseRegex, "Slug must be kebab-case"),
  summary: z.string().min(1),
  publishedAt: z.string().regex(isoDateRegex, "publishedAt must be an ISO 8601 date string"),
  featured: z.boolean(),
  stack: z.array(z.string().min(1)).min(1),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  coverImage: z.string().min(1).startsWith("/", "coverImage must be a public path starting with /"),
});

export type Project = z.infer<typeof projectSchema>;

export type ProjectWithContent = Project & {
  content: string;
};

export const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(kebabCaseRegex, "Slug must be kebab-case"),
  summary: z.string().min(1),
  publishedAt: z.string().regex(isoDateRegex, "publishedAt must be an ISO 8601 date string"),
  tags: z.array(z.string().min(1)).min(1),
  draft: z.boolean().default(false),
});

export type BlogPost = z.infer<typeof postSchema> & {
  readingTime: number;
};

export type BlogPostWithContent = BlogPost & {
  content: string;
};
