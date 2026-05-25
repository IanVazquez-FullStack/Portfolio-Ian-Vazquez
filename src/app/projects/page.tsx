import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projects",
  description: "Proyectos destacados de Ian Vázquez.",
};

export default function ProjectsPage() {
  return (
    <Container className="py-20">
      <section className="max-w-3xl">
        <p className="text-caption font-semibold uppercase tracking-wide text-accent">
          Projects
        </p>
        <h1 className="mt-3 text-display text-foreground">Proyectos</h1>
        <p className="mt-6 text-body-lg text-muted-foreground">
          Placeholder semántico para la página Projects. El listado definitivo se
          incorporará en una historia posterior.
        </p>
      </section>
    </Container>
  );
}
