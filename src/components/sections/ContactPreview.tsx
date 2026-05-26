import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ContactPreview() {
  return (
    <Section aria-labelledby="contact-preview-heading">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 id="contact-preview-heading" className="text-h1 text-foreground">
            ¿Hablamos?
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl">
            Estoy abierto a oportunidades freelance, colaboraciones y proyectos interesantes.
            Si tienes una idea o simplemente quieres charlar sobre tecnología, escríbeme.
          </p>
          <div className="mt-2">
            <Button as="a" href="/contact">
              Hablemos
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
