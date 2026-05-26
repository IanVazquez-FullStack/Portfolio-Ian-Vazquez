import fs from "node:fs";
import path from "node:path";

import { parseMdx } from "@/lib/content/mdx";
import { type ProjectWithContent, projectSchema } from "@/lib/content/schemas";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "src", "content", "projects");
const MDX_EXTENSION = ".mdx";

function getProjectFilePaths(): string[] {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(PROJECTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(MDX_EXTENSION))
    .sort()
    .map((fileName) => path.join(PROJECTS_DIRECTORY, fileName));
}

function getSlugFromFilePath(filePath: string): string {
  return path.basename(filePath, MDX_EXTENSION);
}

function readProject(filePath: string): ProjectWithContent {
  const slug = getSlugFromFilePath(filePath);
  const source = fs.readFileSync(filePath, "utf8");
  const { frontmatter, content } = parseMdx(source);
  const result = projectSchema.safeParse(frontmatter);

  if (!result.success) {
    throw new Error(`[portfolio-ian] Invalid frontmatter in ${slug}: ${JSON.stringify(result.error.format())}`);
  }

  if (result.data.slug !== slug) {
    throw new Error(`[portfolio-ian] Invalid frontmatter in ${slug}: {"slug":{"_errors":["Slug must match file name"]}}`);
  }

  return {
    ...result.data,
    content,
  };
}

export function getProjects(): ProjectWithContent[] {
  return getProjectFilePaths()
    .map(readProject)
    .sort((firstProject, secondProject) => new Date(secondProject.publishedAt).getTime() - new Date(firstProject.publishedAt).getTime());
}

export function getFeaturedProjects(limit = 4): ProjectWithContent[] {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): ProjectWithContent | null {
  const filePath = path.join(PROJECTS_DIRECTORY, `${slug}${MDX_EXTENSION}`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return readProject(filePath);
}
