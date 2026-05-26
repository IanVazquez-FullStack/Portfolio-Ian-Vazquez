# Blind Hunter — Code Review Prompt

## Role
You are the Blind Hunter. You have ZERO project context — no spec, no design docs, no conventions. You only see the diff below. Find bugs, security issues, performance problems, anti-patterns, and maintainability hazards purely from the code.

## Diff to Review

```diff
diff --git a/src/app/projects/page.tsx b/src/app/projects/page.tsx
index 9a75572..45ba8b9 100644
--- a/src/app/projects/page.tsx
+++ b/src/app/projects/page.tsx
@@ -1,23 +1,44 @@
 import type { Metadata } from "next";
 import { Container } from "@/components/ui/Container";
+import { ProjectCard } from "@/components/content/ProjectCard";
+import { getProjects } from "@/lib/content/getProjects";
 
 export const metadata: Metadata = {
-  title: "Projects",
-  description: "Proyectos destacados de Ian Vázquez.",
+  title: "Proyectos",
+  description: "Todos los proyectos de Ian Vázquez — desarrollo web, aplicaciones y experimentos técnicos.",
 };
 
 export default function ProjectsPage() {
+  const projects = getProjects();
+
   return (
     <Container className="py-20">
-      <section className="max-w-3xl">
-        <p className="text-caption font-semibold uppercase tracking-wide text-accent">
-          Projects
-        </p>
-        <h1 className="mt-3 text-display text-foreground">Proyectos</h1>
-        <p className="mt-6 text-body-lg text-muted-foreground">
-          Placeholder semántico para la página Projects. El listado definitivo se
-          incorporará en una historia posterior.
+      <section>
+        <h1 className="text-display text-foreground">Proyectos</h1>
+        <p className="mt-4 text-body-lg text-muted-foreground max-w-3xl">
+          Una selección de trabajos donde combino diseño, arquitectura y código para resolver problemas reales.
         </p>
+
+        {projects.length === 0 ? (
+          <div className="mt-16 flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-muted/30 py-16 text-center">
+            <p className="text-h3 text-muted-foreground">
+              Próximamente proyectos
+            </p>
+            <p className="text-body text-muted-foreground max-w-md">
+              Estoy trabajando en nuevos proyectos. Vuelve pronto para ver los resultados.
+            </p>
+          </div>
+        ) : (
+          <div
+            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
+            role="list"
+            aria-label="Listado de proyectos"
+          >
+            {projects.map((project) => (
+              <ProjectCard key={project.slug} project={project} headingLevel="h2" />
+            ))}
+          </div>
+        )}
       </section>
     </Container>
   );
diff --git a/src/app/projects/page.test.tsx b/src/app/projects/page.test.tsx
new file mode 100644
index 0000000..728c8e8
--- /dev/null
+++ b/src/app/projects/page.test.tsx
@@ -0,0 +1,71 @@
+import { describe, it, expect, vi, afterEach } from "vitest";
+import { render, screen, cleanup } from "@testing-library/react";
+import ProjectsPage, { metadata } from "./page";
+
+vi.mock("@/lib/content/getProjects", () => ({
+  getProjects: vi.fn(),
+}));
+
+import { getProjects } from "@/lib/content/getProjects";
+
+vi.mock("next/image", () => ({
+  default: function MockImage({ src, alt }: { src: string; alt: string }) {
+    return <div data-testid="mock-image" data-src={src} data-alt={alt} />;
+  },
+}));
+
+describe("ProjectsPage", () => {
+  afterEach(() => {
+    cleanup();
+    vi.clearAllMocks();
+  });
+
+  it("renderiza heading principal h1 Proyectos", () => {
+    vi.mocked(getProjects).mockReturnValue([]);
+
+    render(<ProjectsPage />);
+
+    expect(
+      screen.getByRole("heading", { level: 1, name: /proyectos/i })
+    ).toBeTruthy();
+  });
+
+  it("muestra empty state cuando no hay proyectos", () => {
+    vi.mocked(getProjects).mockReturnValue([]);
+
+    render(<ProjectsPage />);
+
+    expect(screen.getByText(/próximamente proyectos/i)).toBeTruthy();
+    expect(
+      screen.getByText(/estoy trabajando en nuevos proyectos/i)
+    ).toBeTruthy();
+  });
+
+  it("renderiza grid de proyectos con heading h2 por card", () => {
+    vi.mocked(getProjects).mockReturnValue([
+      {
+        title: "Portfolio Ian",
+        slug: "portfolio-ian",
+        summary: "Mi portfolio personal",
+        publishedAt: "2026-05-25",
+        featured: true,
+        stack: ["Next.js", "TypeScript"],
+        coverImage: "/projects/portfolio-ian/cover.webp",
+      },
+    ]);
+
+    render(<ProjectsPage />);
+
+    const list = screen.getByRole("list", { name: /listado de proyectos/i });
+    expect(list).toBeTruthy();
+
+    expect(
+      screen.getByRole("heading", { level: 2, name: /portfolio ian/i })
+    ).toBeTruthy();
+  });
+
+  it("exporta metadata estática correcta", () => {
+    expect(metadata.title).toBe("Proyectos");
+    expect(metadata.description).toContain("Ian Vázquez");
+  });
+});
diff --git a/src/components/content/ProjectCard.tsx b/src/components/content/ProjectCard.tsx
new file mode 100644
index 0000000..f59e1ae
--- /dev/null
+++ b/src/components/content/ProjectCard.tsx
@@ -0,0 +1,79 @@
+import Image from "next/image";
+import Link from "next/link";
+import { TechStackBadges } from "@/components/content/TechStackBadges";
+import type { Project } from "@/lib/content/schemas";
+
+type ProjectCardProps = {
+  project: Project;
+  headingLevel?: "h2" | "h3";
+};
+
+export function ProjectCard({ project, headingLevel = "h3" }: ProjectCardProps) {
+  const Heading = headingLevel;
+
+  return (
+    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-border-hover focus-within:border-border-hover">
+      <Link
+        href={`/projects/${project.slug}`}
+        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
+        aria-label={`Ver proyecto: ${project.title}`}
+      >
+        {/* Cover Image */}
+        <div className="relative aspect-video w-full overflow-hidden bg-muted">
+          <Image
+            src={project.coverImage}
+            alt={`Captura del proyecto ${project.title}`}
+            fill
+            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
+            className="object-cover transition-transform duration-300 group-hover:scale-105"
+            priority={false}
+          />
+        </div>
+
+        {/* Card Content */}
+        <div className="flex flex-col gap-2 p-4">
+          <Heading className="text-h3 text-card-foreground">{project.title}</Heading>
+          <p className="text-body text-muted-foreground line-clamp-2">{project.summary}</p>
+
+          {/* Stack resumido (siempre visible) */}
+          <div className="mt-1">
+            <TechStackBadges stack={project.stack} variant="compact" />
+          </div>
+        </div>
+      </Link>
+
+      {/* Hover/Focus reveal: stack completo y enlaces */}
+      <div
+        className="absolute inset-x-0 bottom-0 translate-y-full bg-card/95 backdrop-blur-sm border-t border-border p-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
+        aria-hidden="true"
+      >
+        <div className="flex flex-col gap-3">
+          <div>
+            <p className="text-caption font-medium text-foreground mb-1.5">
+              Stack completo
+            </p>
+            <TechStackBadges stack={project.stack} variant="detailed" />
+          </div>
+
+          {(project.demoUrl || project.repoUrl) && (
+            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/50">
+              {project.demoUrl && (
+                <span className="text-caption text-muted-foreground">
+                  <span className="sr-only">Demo disponible</span>
+                  <span aria-hidden="true">🔗 Demo</span>
+                </span>
+              )}
+              {project.repoUrl && (
+                <span className="text-caption text-muted-foreground">
+                  <span className="sr-only">Repositorio disponible</span>
+                  <span aria-hidden="true">📦 Repo</span>
+                </span>
+              )}
+            </div>
+          )}
+        </div>
+      </div>
+    </article>
+  );
+}
```

## Output Format

Provide findings as a Markdown list. Each finding must have:
- **One-line title** describing the issue
- **Severity**: [critical] / [high] / [medium] / [low] / [nit]
- **Location**: file and approximate line number
- **Explanation**: why it's a problem, with evidence from the diff
- **Suggested fix**: brief actionable recommendation

If no findings, explicitly state: "No findings from Blind Hunter layer."
