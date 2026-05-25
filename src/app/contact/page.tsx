import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacto de Ian Vázquez.",
};

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
