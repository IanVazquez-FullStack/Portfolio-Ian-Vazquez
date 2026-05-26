import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contacto",
  description:
    "Ponte en contacto con Ian Vázquez. Envía un mensaje o consulta para colaborar en tu próximo proyecto.",
});

export default function ContactPage() {
  return (
    <Container className="py-20">
      <section className="max-w-3xl">
        <p className="text-caption font-semibold uppercase tracking-wide text-accent">
          Contact
        </p>
        <h1 className="mt-3 text-display text-foreground">Contacto</h1>
        <p className="mt-6 text-body-lg text-muted-foreground">
          Placeholder semántico para la página Contact. El formulario definitivo
          se incorporará en una historia posterior.
        </p>
      </section>
    </Container>
  );
}
