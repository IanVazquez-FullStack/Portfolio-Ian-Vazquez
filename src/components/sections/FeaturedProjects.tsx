import { ProjectCard } from "@/components/content/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getFeaturedProjects } from "@/lib/content/getProjects";

export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <Section aria-labelledby="featured-projects-heading">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="featured-projects-heading" className="text-h1 text-foreground">
              Proyectos destacados
            </h2>
            <Button as="a" href="/projects" variant="ghost" className="hidden sm:inline-flex">
              Ver todos los proyectos
            </Button>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-muted/30 py-16 text-center">
              <p className="text-h3 text-muted-foreground">
                Próximamente: proyectos en construcción
              </p>
              <p className="text-body text-muted-foreground max-w-md">
                Estoy trabajando en nuevos proyectos. Vuelve pronto para ver los resultados.
              </p>
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
                aria-label="Proyectos destacados"
              >
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
              <div className="flex justify-center sm:hidden">
                <Button as="a" href="/projects" variant="secondary">
                  Ver todos los proyectos
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
