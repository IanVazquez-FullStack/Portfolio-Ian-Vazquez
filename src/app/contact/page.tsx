import { BriefcaseBusiness, GitBranch, Mail, ShoppingBag } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { personal } from "@/lib/data/personal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contacto",
  description:
    "Ponte en contacto con Ian Vazquez. Envía un mensaje o consulta para colaborar en tu próximo proyecto.",
});

type ContactPageProps = {
  searchParams?: Promise<{
    ref?: string;
  }>;
};

export async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const defaultSubject = resolvedSearchParams?.ref
    ? `Consulta sobre proyecto: ${resolvedSearchParams.ref}`
    : "";

  return (
    <Container className="py-16 md:py-20">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:items-start">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-foreground">
            Contacto
          </p>
          <h1 className="mt-3 text-display text-foreground">Trabajemos juntos</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
            Si preferís hablar por otro canal, también podés contactarme aquí.
            Estoy abierto a colaboración, proyectos y conversaciones técnicas.
          </p>

          <div className="mt-8">
            <ContactForm defaultSubject={defaultSubject} />
          </div>
        </div>

        <aside className="rounded-3xl border border-border bg-muted/40 p-6 shadow-sm sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Canales alternativos
          </p>
          <div className="mt-5 space-y-3">
            <a
              href={personal.social.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-foreground transition-colors hover:border-border-hover hover:bg-muted"
            >
              <BriefcaseBusiness className="size-5 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">LinkedIn</span>
                <span className="block text-sm text-muted-foreground">{personal.social.linkedin.label}</span>
              </span>
            </a>

            <a
              href={personal.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-foreground transition-colors hover:border-border-hover hover:bg-muted"
            >
              <GitBranch className="size-5 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">GitHub</span>
                <span className="block text-sm text-muted-foreground">{personal.social.github.label}</span>
              </span>
            </a>

            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-foreground transition-colors hover:border-border-hover hover:bg-muted"
            >
              <Mail className="size-5 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">Email</span>
                <span className="block text-sm text-muted-foreground">{personal.email}</span>
              </span>
            </a>

            <a
              href="https://es.fiverr.com/s/yvk5EXq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-foreground transition-colors hover:border-border-hover hover:bg-muted"
            >
              <ShoppingBag className="size-5 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">Fiverr</span>
                <span className="block text-sm text-muted-foreground">Fiverr</span>
              </span>
            </a>
          </div>
        </aside>
      </section>
    </Container>
  );
}

export default ContactPage;
