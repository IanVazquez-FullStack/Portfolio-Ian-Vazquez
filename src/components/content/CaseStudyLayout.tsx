import Image from "next/image";
import Link from "next/link";
import { TechStackBadges } from "@/components/content/TechStackBadges";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/content/schemas";

export type CaseStudyLayoutProps = {
  project: Project;
  children: React.ReactNode;
};

export function CaseStudyLayout({ project, children }: CaseStudyLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←</span> Volver a proyectos
        </Link>
      </div>

      {/* Hero */}
      <header className="mb-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={project.coverImage}
            alt={`Captura del proyecto ${project.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4="
          />
        </div>
        <h1 className="text-display mt-8 text-foreground">{project.title}</h1>
        <p className="mt-4 text-body-lg text-muted-foreground">{project.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <TechStackBadges stack={project.stack} variant="grouped" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.demoUrl ? (
            <Button as="a" href={project.demoUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
              Demo
            </Button>
          ) : null}
          {project.repoUrl ? (
            <Button as="a" href={project.repoUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
              Repositorio
            </Button>
          ) : null}
        </div>
      </header>

      {/* MDX content */}
      <section className="prose-container space-y-16">{children}</section>

      {/* CTA */}
      <div className="mt-16 flex flex-col items-center gap-4 rounded-lg border border-border bg-muted/30 p-8 text-center">
        <h2 className="text-h3 text-foreground">¿Te interesa algo similar?</h2>
        <p className="text-body text-muted-foreground">
          Estoy disponible para proyectos y colaboraciones técnicas.
        </p>
        <Button as="a" href={`/contact?ref=${project.slug}`} variant="primary">
          Contactá
        </Button>
      </div>
    </article>
  );
}
