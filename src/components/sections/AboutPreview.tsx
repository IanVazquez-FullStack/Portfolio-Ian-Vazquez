import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { personal } from "@/lib/data/personal";

export function AboutPreview() {
  return (
    <Section aria-labelledby="about-preview-heading" className="bg-muted/30">
      <Container>
        <AnimatedSection variant="fadeIn">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-col gap-6 lg:max-w-xl">
              <h2 id="about-preview-heading" className="text-h1 text-foreground">
                Sobre mí
              </h2>
              <p className="text-body-lg text-muted-foreground">
                {personal.bioShort}
              </p>
              <div>
                <Button as="a" href="/about" variant="secondary">
                  Saber más
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
