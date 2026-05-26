import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { personal } from "@/lib/data/personal";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20 text-center lg:py-32">
      <Container>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-display text-foreground">{personal.displayName}</h1>
          <p className="text-h2 text-muted-foreground">{personal.title}</p>
          <p className="text-body-lg text-muted-foreground max-w-xl">
            Construyo aplicaciones web modernas, accesibles y de alto rendimiento.
            Especializado en Node.js, Angular, React, Next.js y Nest.js.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Button as="a" href="/projects">
              Ver proyectos
            </Button>
            <Button as="a" href="/contact" variant="secondary">
              Contactar
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
