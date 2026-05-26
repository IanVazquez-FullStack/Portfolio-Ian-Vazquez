import { CVDownloadButton } from "@/components/content/CVDownloadButton";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import { personal } from "@/lib/data/personal";

export const metadata = buildMetadata({
  title: "Sobre mí",
  description:
    `Conoce más sobre ${personal.displayName}: su trayectoria, habilidades y experiencia como desarrollador Full Stack.`,
});

export default function AboutPage() {
  return (
    <Container className="py-20">
      <section className="max-w-3xl">
        <p className="text-caption font-semibold uppercase tracking-wide text-accent">
          About
        </p>
        <h1 className="mt-3 text-display text-foreground">
          Sobre {personal.displayName.split(" ")[0]}
        </h1>

        <div className="mt-8 flex flex-col gap-10">
          {personal.bioSections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-h2 text-foreground">{section.heading}</h2>
              <p className="mt-3 text-body-lg text-muted-foreground">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <CVDownloadButton className="mt-10" />
      </section>
    </Container>
  );
}
