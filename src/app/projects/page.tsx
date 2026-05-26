import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/content/ProjectCard";
import { StaggeredGrid, StaggeredItem } from "@/components/motion/StaggeredGrid";
import { getProjects } from "@/lib/content/getProjects";

export const metadata: Metadata = buildMetadata({
  title: "Proyectos",
  description:
    "Todos los proyectos de Ian Vazquez — desarrollo web, aplicaciones y experimentos técnicos.",
});

export default function ProjectsPage() {
  let projects: ReturnType<typeof getProjects> = [];
  try {
    projects = getProjects();
  } catch {
    // Build/SSR error: invalid MDX frontmatter. Show empty state gracefully.
  }

  return (
    <Container className="py-20">
      <section>
        <h1 className="text-display text-foreground">Proyectos</h1>
        <p className="mt-4 text-body-lg text-muted-foreground max-w-3xl">
          Una selección de trabajos donde combino diseño, arquitectura y código para resolver problemas reales.
        </p>

        {projects.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-muted/30 py-16 text-center">
            <p className="text-h3 text-muted-foreground">
              Próximamente: proyectos en construcción
            </p>
            <p className="text-body text-muted-foreground max-w-md">
              Estoy trabajando en nuevos proyectos. Vuelve pronto para ver los resultados.
            </p>
          </div>
        ) : (
          <StaggeredGrid
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Listado de proyectos"
          >
            {projects.map((project) => (
              <StaggeredItem key={project.slug}>
                <ProjectCard project={project} headingLevel="h2" />
              </StaggeredItem>
            ))}
          </StaggeredGrid>
        )}
      </section>
    </Container>
  );
}
