import Image from "next/image";
import Link from "next/link";
import { TechStackBadges } from "@/components/content/TechStackBadges";
import type { Project } from "@/lib/content/schemas";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, headingLevel = "h3" }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-border-hover">
      <Link
        href={`/projects/${project.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Ver proyecto: ${project.title}`}
      >
        {/* Cover Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={project.coverImage}
            alt={`Captura del proyecto ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4="
            priority={false}
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-col gap-2 p-4 pb-2">
          <Heading className="text-h3 text-card-foreground">{project.title}</Heading>
          <p className="text-body text-muted-foreground line-clamp-2">{project.summary}</p>
        </div>
      </Link>

      {/* Stack completo y enlaces externos */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        <TechStackBadges stack={project.stack} variant="detailed" />

        {(project.demoUrl || project.repoUrl) && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/50">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver demo de ${project.title}`}
                className="text-caption text-accent hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver repositorio de ${project.title}`}
                className="text-caption text-accent hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Repositorio
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
