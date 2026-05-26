# Blind Hunter — Code Review Prompt (Story 2-1)

You are the Blind Hunter. You are reviewing a code diff with zero project context, no spec, and no background. You are intentionally hostile: look for bugs, logical errors, security holes, performance issues, type safety gaps, and maintainability problems.

Read the diff below. Output findings as a Markdown list. Each finding must have:
- One-line title
- Evidence from the diff (file + line reference if visible)
- Explanation of why it is a problem
- Severity: critical / warning / nit

Do not assume intent. Do not give benefit of the doubt. If something looks risky, flag it.

---

## Diff

```diff
diff --git a/_bmad-output/implementation-artifacts/2-1-definir-schema-de-contenido-de-proyectos-y-loader-mdx.md b/_bmad-output/implementation-artifacts/2-1-definir-schema-de-contenido-de-proyectos-y-loader-mdx.md
index 038f592..2595961 100644
--- a/_bmad-output/implementation-artifacts/2-1-definir-schema-de-contenido-de-proyectos-y-loader-mdx.md
+++ b/_bmad-output/implementation-artifacts/2-1-definir-schema-de-contenido-de-proyectos-y-loader-mdx.md
@@ -1,6 +1,6 @@
 # Story 2.1: Definir schema de contenido de proyectos y loader MDX
 
-Status: ready-for-dev
+Status: review
 
 ## Story
 
@@ -19,19 +19,19 @@ so that pueda agregar proyectos como archivos `.mdx` sin modificar lógica (FR-0
 
 ## Tasks / Subtasks
 
-- [ ] Instalar dependencias MDX necesarias (AC: #2, #3)
-  - [ ] `@next/mdx`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter`, `gray-matter` — evaluar qué combinación no usa `next-mdx-remote`
-- [ ] Crear `src/lib/content/schemas.ts` con `projectSchema` Zod (AC: #1)
-  - [ ] Campos: `title`, `slug`, `summary`, `publishedAt`, `featured`, `stack`, `demoUrl?`, `repoUrl?`, `coverImage`
-  - [ ] Exportar `Project = z.infer<typeof projectSchema>`
-- [ ] Crear `src/lib/content/mdx.ts` con helpers de parsing MDX (AC: #2, #3)
-- [ ] Crear `src/lib/content/getProjects.ts` (AC: #2, #3)
-  - [ ] `getProjects()`: lee directorio, parsea frontmatter, valida con Zod, ordena por `publishedAt` desc
-  - [ ] `getProjectBySlug(slug)`: busca por slug, retorna con contenido MDX o `null`
-- [ ] Configurar `next.config.js` para soporte MDX si necesario (AC: #2)
-- [ ] Crear `src/content/projects/portfolio-ian.mdx` con frontmatter completo válido (AC: #5)
-- [ ] Verificar que frontmatter inválido produce error claro (AC: #4)
-- [ ] Ejecutar `npm run build` y `tsc --noEmit` (AC: #6)
+- [x] Instalar dependencias MDX necesarias (AC: #2, #3)
+  - [x] `@next/mdx`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter`, `gray-matter` — evaluar qué combinación no usa `next-mdx-remote`
+- [x] Crear `src/lib/content/schemas.ts` con `projectSchema` Zod (AC: #1)
+  - [x] Campos: `title`, `slug`, `summary`, `publishedAt`, `featured`, `stack`, `demoUrl?`, `repoUrl?`, `coverImage`
+  - [x] Exportar `Project = z.infer<typeof projectSchema>`
+- [x] Crear `src/lib/content/mdx.ts` con helpers de parsing MDX (AC: #2, #3)
+- [x] Crear `src/lib/content/getProjects.ts` (AC: #2, #3)
+  - [x] `getProjects()`: lee directorio, parsea frontmatter, valida con Zod, ordena por `publishedAt` desc
+  - [x] `getProjectBySlug(slug)`: busca por slug, retorna con contenido MDX o `null`
+- [x] Configurar `next.config.js` para soporte MDX si necesario (AC: #2)
+- [x] Crear `src/content/projects/portfolio-ian.mdx` con frontmatter completo válido (AC: #5)
+- [x] Verificar que frontmatter inválido produce error claro (AC: #4)
+- [x] Ejecutar `npm run build` y `tsc --noEmit` (AC: #6)
 
 ## Dev Notes
 
@@ -75,10 +75,35 @@ src/content/projects/
 
 ### Agent Model Used
 
-_pending_
+Cascade
 
 ### Debug Log References
 
+- `npm run lint && npx tsc --noEmit && npm run build` — passed.
+
 ### Completion Notes List
 
+- Se instalaron dependencias MDX oficiales de Next y `gray-matter`/`zod`; no se usó `next-mdx-remote`.
+- Se implementó `projectSchema` con validación de slug kebab-case, fecha ISO, campos obligatorios/opcionales y tipos inferidos.
+- Se implementaron helpers server-side para parsear frontmatter MDX, listar proyectos ordenados por `publishedAt` descendente y obtener un proyecto por slug.
+- Se agregó contenido seed `portfolio-ian.mdx` con frontmatter válido.
+- Se agregó configuración MDX en Next y `src/mdx-components.tsx` requerido por App Router.
+- Se agregó test co-localizado para schema y loaders; la validación final del repo pasó con lint, typecheck y build.
+
 ### File List
+
+- `_bmad-output/implementation-artifacts/2-1-definir-schema-de-contenido-de-proyectos-y-loader-mdx.md`
+- `_bmad-output/implementation-artifacts/sprint-status.yaml`
+- `next.config.ts`
+- `package-lock.json`
+- `package.json`
+- `src/content/projects/portfolio-ian.mdx`
+- `src/lib/content/getProjects.test.ts`
+- `src/lib/content/getProjects.ts`
+- `src/lib/content/mdx.ts`
+- `src/lib/content/schemas.ts`
+- `src/mdx-components.tsx`
+
+### Change Log
+
+- 2026-05-25: Implementada historia 2.1 completa y lista para review.
diff --git a/_bmad-output/implementation-artifacts/sprint-status.yaml b/_bmad-output/implementation-artifacts/sprint-status.yaml
index 361043c..db32ed2 100644
--- a/_bmad-output/implementation-artifacts/sprint-status.yaml
+++ b/_bmad-output/implementation-artifacts/sprint-status.yaml
@@ -54,7 +54,7 @@ development_status:
 
   # ─── Epic 2: Vitrina de Proyectos y Casos Técnicos ──────────────────────────
   epic-2: backlog
-  2-1-definir-schema-de-contenido-de-proyectos-y-loader-mdx: ready-for-dev
+  2-1-definir-schema-de-contenido-de-proyectos-y-loader-mdx: review
   2-2-construir-componentes-de-presentacion-de-proyectos: ready-for-dev
   2-3-implementar-grid-de-proyectos-destacados-en-home: ready-for-dev
   2-4-implementar-pagina-de-listado-projects: ready-for-dev
@@ -64,7 +64,7 @@ development_status:
 
   # ─── Epic 3: Sistema de Contacto Full-Stack ─────────────────────────────────
   epic-3: backlog
-  3-1-definir-schema-zod-compartido-y-helpers-apiresponse: ready-for-dev
+  3-1-definir-schema-zod-compartido-y-helpers-apiresponse: in-progress
   3-2-construir-contactform-con-validacion-en-tiempo-real: ready-for-dev
   3-3-implementar-route-handler-post-api-contact-con-validacion-y-honeypot: ready-for-dev
   3-4-integrar-resend-para-envio-de-email: ready-for-dev
diff --git a/next.config.ts b/next.config.ts
index e9ffa30..135c84d 100644
--- a/next.config.ts
+++ b/next.config.ts
@@ -1,7 +1,12 @@
 import type { NextConfig } from "next";
+import createMDX from "@next/mdx";
 
 const nextConfig: NextConfig = {
-  /* config options here */
+  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
 };
 
-export default nextConfig;
+const withMDX = createMDX({
+  extension: /\.(md|mdx)$/,
+});
+
+export default withMDX(nextConfig);
diff --git a/package.json b/package.json
index f36f03c..4d5bcce 100644
--- a/package.json
+++ b/package.json
@@ -9,25 +9,37 @@
     "lint": "eslint"
   },
   "dependencies": {
+    "@mdx-js/loader": "^3.1.1",
+    "@mdx-js/react": "^3.1.1",
+    "@next/mdx": "^16.2.6",
+    "@types/mdx": "^2.0.13",
     "class-variance-authority": "^0.7.1",
     "clsx": "^2.1.1",
+    "gray-matter": "^4.0.3",
     "lucide-react": "^1.16.0",
     "next": "16.2.6",
     "radix-ui": "^1.4.3",
     "react": "19.2.4",
     "react-dom": "19.2.4",
+    "remark-frontmatter": "^5.0.0",
+    "remark-mdx-frontmatter": "^5.2.0",
     "shadcn": "^4.8.0",
     "tailwind-merge": "^3.6.0",
-    "tw-animate-css": "^1.4.0"
+    "tw-animate-css": "^1.4.0",
+    "zod": "^4.4.3"
   },
   "devDependencies": {
     "@tailwindcss/postcss": "^4",
+    "@types/jsdom": "^28.0.3",
     "@types/node": "^20",
     "@types/react": "^19",
     "@types/react-dom": "^19",
+    "@vitest/coverage-v8": "^4.1.7",
     "eslint": "^9",
     "eslint-config-next": "16.2.6",
+    "jsdom": "^29.1.1",
     "tailwindcss": "^4",
-    "typescript": "^5"
+    "typescript": "^5",
+    "vitest": "^4.1.7"
   }
 }
diff --git a/src/app/about/page.tsx b/src/app/about/page.tsx
index bc18213..c6eda75 100644
--- a/src/app/about/page.tsx
+++ b/src/app/about/page.tsx
@@ -1,11 +1,12 @@
-import type { Metadata } from "next";
 import { CVDownloadButton } from "@/components/content/CVDownloadButton";
 import { Container } from "@/components/ui/Container";
+import { buildMetadata } from "@/lib/seo/metadata";
 
-export const metadata: Metadata = {
-  title: "About",
-  description: "Información sobre Ian Vázquez.",
-};
+export const metadata = buildMetadata({
+  title: "Sobre mí",
+  description:
+    "Conoce más sobre Ian Vázquez: su trayectoria, habilidades y experiencia como desarrollador Full Stack.",
+});
 
 export default function AboutPage() {
   return (
diff --git a/src/app/contact/page.tsx b/src/app/contact/page.tsx
index 7427174..c82a290 100644
--- a/src/app/contact/page.tsx
+++ b/src/app/contact/page.tsx
@@ -1,10 +1,11 @@
-import type { Metadata } from "next";
 import { Container } from "@/components/ui/Container";
+import { buildMetadata } from "@/lib/seo/metadata";
 
-export const metadata: Metadata = {
-  title: "Contact",
-  description: "Contacto de Ian Vázquez.",
-};
+export const metadata = buildMetadata({
+  title: "Contacto",
+  description:
+    "Ponte en contacto con Ian Vázquez. Envía un mensaje o consulta para colaborar en tu próximo proyecto.",
+});
 
 export default function ContactPage() {
   return (
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index a38a923..33f1b4f 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -1,7 +1,7 @@
-import type { Metadata } from "next";
 import { Inter, JetBrains_Mono } from "next/font/google";
 import { Footer } from "@/components/layout/Footer";
 import { Header } from "@/components/layout/Header";
+import { buildMetadata } from "@/lib/seo/metadata";
 import "./globals.css";
 import { cn } from "@/lib/utils";
 
@@ -33,13 +33,7 @@ const jetbrainsMono = JetBrains_Mono({
   display: "swap",
 });
 
-export const metadata: Metadata = {
-  title: {
-    default: "Ian Vázquez | Portfolio",
-    template: "%s | Ian Vázquez",
-  },
-  description: "Portfolio personal de Ian Vázquez - Desarrollador Full Stack",
-};
+export const metadata = buildMetadata();
 
 export default function RootLayout({
   children,
diff --git a/src/content/blog/.gitkeep b/src/content/blog/.gitkeep
deleted file mode 100644
index e69de29..0000000
diff --git a/src/lib/content/.gitkeep b/src/lib/content/.gitkeep
deleted file mode 100644
index e69de29..0000000
diff --git a/src/lib/utils/.gitkeep b/src/lib/utils/.gitkeep
deleted file mode 100644
index e69de29..0000000
=== NEW: src/content/projects/portfolio-ian.mdx ===
diff --git a/src/content/projects/portfolio-ian.mdx b/src/content/projects/portfolio-ian.mdx
new file mode 100644
index 0000000..f723680
--- /dev/null
+++ b/src/content/projects/portfolio-ian.mdx
@@ -0,0 +1,18 @@
+---
+title: "portfolio-ian"
+slug: "portfolio-ian"
+summary: "Portfolio web de desarrollador full stack con Next.js 14, TypeScript y Framer Motion"
+publishedAt: "2026-05-25"
+featured: true
+stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend", "MDX", "Vercel"]
+repoUrl: "https://github.com/ianv/portfolio-ian"
+coverImage: "/projects/portfolio-ian/cover.webp"
+---
+
+# Portfolio Ian
+
+Portfolio personal construido con Next.js, TypeScript, Tailwind CSS y MDX para presentar proyectos técnicos, artículos y formas de contacto profesional.
+
+## Objetivo
+
+Crear una experiencia rápida, accesible y mantenible que pueda evolucionar agregando contenido desde archivos locales sin modificar la lógica central.
=== NEW: src/lib/content/getProjects.test.ts ===
diff --git a/src/lib/content/getProjects.test.ts b/src/lib/content/getProjects.test.ts
new file mode 100644
index 0000000..285d56c
--- /dev/null
+++ b/src/lib/content/getProjects.test.ts
@@ -0,0 +1,57 @@
+import { describe, it } from "node:test";
+import assert from "node:assert/strict";
+
+import { getProjectBySlug, getProjects } from "@/lib/content/getProjects";
+import { projectSchema } from "@/lib/content/schemas";
+
+describe("projectSchema", () => {
+  it("validates required project frontmatter", () => {
+    const parsed = projectSchema.safeParse({
+      title: "portfolio-ian",
+      slug: "portfolio-ian",
+      summary: "Portfolio web de desarrollador full stack con Next.js 14, TypeScript y Framer Motion",
+      publishedAt: "2026-05-25",
+      featured: true,
+      stack: ["Next.js", "TypeScript"],
+      coverImage: "/projects/portfolio-ian/cover.webp",
+    });
+
+    assert.equal(parsed.success, true);
+  });
+
+  it("rejects non-kebab-case slugs", () => {
+    const parsed = projectSchema.safeParse({
+      title: "Portfolio Ian",
+      slug: "PortfolioIan",
+      summary: "Portfolio web de desarrollador full stack con Next.js 14, TypeScript y Framer Motion",
+      publishedAt: "2026-05-25",
+      featured: true,
+      stack: ["Next.js", "TypeScript"],
+      coverImage: "/projects/portfolio-ian/cover.webp",
+    });
+
+    assert.equal(parsed.success, false);
+  });
+});
+
+describe("project loaders", () => {
+  it("loads projects sorted by publishedAt descending", () => {
+    const projects = getProjects();
+
+    assert.ok(projects.length >= 1);
+    assert.equal(projects[0]?.slug, "portfolio-ian");
+  });
+
+  it("loads one project by slug with renderable MDX content", () => {
+    const project = getProjectBySlug("portfolio-ian");
+
+    assert.notEqual(project, null);
+    assert.equal(project?.slug, "portfolio-ian");
+    assert.equal(typeof project?.content, "string");
+    assert.ok(project?.content.includes("# Portfolio Ian"));
+  });
+
+  it("returns null for an unknown slug", () => {
+    assert.equal(getProjectBySlug("unknown-project"), null);
+  });
+});
=== NEW: src/lib/content/getProjects.ts ===
diff --git a/src/lib/content/getProjects.ts b/src/lib/content/getProjects.ts
new file mode 100644
index 0000000..eb21e78
--- /dev/null
+++ b/src/lib/content/getProjects.ts
@@ -0,0 +1,60 @@
+import fs from "node:fs";
+import path from "node:path";
+
+import { parseMdx } from "@/lib/content/mdx";
+import { type ProjectWithContent, projectSchema } from "@/lib/content/schemas";
+
+const PROJECTS_DIRECTORY = path.join(process.cwd(), "src", "content", "projects");
+const MDX_EXTENSION = ".mdx";
+
+function getProjectFilePaths(): string[] {
+  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
+    return [];
+  }
+
+  return fs
+    .readdirSync(PROJECTS_DIRECTORY)
+    .filter((fileName) => fileName.endsWith(MDX_EXTENSION))
+    .sort()
+    .map((fileName) => path.join(PROJECTS_DIRECTORY, fileName));
+}
+
+function getSlugFromFilePath(filePath: string): string {
+  return path.basename(filePath, MDX_EXTENSION);
+}
+
+function readProject(filePath: string): ProjectWithContent {
+  const slug = getSlugFromFilePath(filePath);
+  const source = fs.readFileSync(filePath, "utf8");
+  const { frontmatter, content } = parseMdx(source);
+  const result = projectSchema.safeParse(frontmatter);
+
+  if (!result.success) {
+    throw new Error(`[portfolio-ian] Invalid frontmatter in ${slug}: ${JSON.stringify(result.error.format())}`);
+  }
+
+  if (result.data.slug !== slug) {
+    throw new Error(`[portfolio-ian] Invalid frontmatter in ${slug}: {"slug":{"_errors":["Slug must match file name"]}}`);
+  }
+
+  return {
+    ...result.data,
+    content,
+  };
+}
+
+export function getProjects(): ProjectWithContent[] {
+  return getProjectFilePaths()
+    .map(readProject)
+    .sort((firstProject, secondProject) => Date.parse(secondProject.publishedAt) - Date.parse(firstProject.publishedAt));
+}
+
+export function getProjectBySlug(slug: string): ProjectWithContent | null {
+  const filePath = path.join(PROJECTS_DIRECTORY, `${slug}${MDX_EXTENSION}`);
+
+  if (!fs.existsSync(filePath)) {
+    return null;
+  }
+
+  return readProject(filePath);
+}
=== NEW: src/lib/content/mdx.ts ===
diff --git a/src/lib/content/mdx.ts b/src/lib/content/mdx.ts
new file mode 100644
index 0000000..bf30a88
--- /dev/null
+++ b/src/lib/content/mdx.ts
@@ -0,0 +1,15 @@
+import matter from "gray-matter";
+
+export type ParsedMdx = {
+  frontmatter: Record<string, unknown>;
+  content: string;
+};
+
+export function parseMdx(source: string): ParsedMdx {
+  const parsed = matter(source);
+
+  return {
+    frontmatter: parsed.data,
+    content: parsed.content.trim(),
+  };
+}
=== NEW: src/lib/content/schemas.ts ===
diff --git a/src/lib/content/schemas.ts b/src/lib/content/schemas.ts
new file mode 100644
index 0000000..9a9cc9f
--- /dev/null
+++ b/src/lib/content/schemas.ts
@@ -0,0 +1,39 @@
+import { z } from "zod";
+
+const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
+const isoDateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)?$/;
+
+export const projectSchema = z.object({
+  title: z.string().min(1),
+  slug: z.string().regex(kebabCaseRegex, "Slug must be kebab-case"),
+  summary: z.string().min(1),
+  publishedAt: z.string().regex(isoDateRegex, "publishedAt must be an ISO 8601 date string"),
+  featured: z.boolean(),
+  stack: z.array(z.string().min(1)).min(1),
+  demoUrl: z.string().url().optional(),
+  repoUrl: z.string().url().optional(),
+  coverImage: z.string().min(1).startsWith("/", "coverImage must be a public path starting with /"),
+});
+
+export type Project = z.infer<typeof projectSchema>;
+
+export type ProjectWithContent = Project & {
+  content: string;
+};
+
+export const postSchema = z.object({
+  title: z.string().min(1),
+  slug: z.string().regex(kebabCaseRegex, "Slug must be kebab-case"),
+  summary: z.string().min(1),
+  publishedAt: z.string().regex(isoDateRegex, "publishedAt must be an ISO 8601 date string"),
+  tags: z.array(z.string().min(1)).min(1),
+  draft: z.boolean().default(false),
+});
+
+export type BlogPost = z.infer<typeof postSchema> & {
+  readingTime: number;
+};
+
+export type BlogPostWithContent = BlogPost & {
+  content: string;
+};
=== NEW: src/mdx-components.tsx ===
diff --git a/src/mdx-components.tsx b/src/mdx-components.tsx
new file mode 100644
index 0000000..766d18f
--- /dev/null
+++ b/src/mdx-components.tsx
@@ -0,0 +1,7 @@
+import type { MDXComponents } from "mdx/types";
+
+const components = {} satisfies MDXComponents;
+
+export function useMDXComponents(): MDXComponents {
+  return components;
+}

```
