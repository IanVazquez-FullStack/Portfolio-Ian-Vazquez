import { Container } from "@/components/ui/Container";
import { personal } from "@/lib/data/personal";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-body font-semibold text-foreground">
            © {new Date().getFullYear()} {personal.displayName}
          </p>
          <a
            href={`mailto:${personal.email}`}
            className="text-body text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {personal.email}
          </a>
        </div>
        <nav aria-label="Enlaces secundarios">
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href={personal.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full px-3 text-body font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {personal.social.github.label}
              </a>
            </li>
            <li>
              <a
                href={personal.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full px-3 text-body font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {personal.social.linkedin.label}
              </a>
            </li>
            <li>
              <a
                href="/cv/ian-vazquez-cv.pdf"
                download
                className="inline-flex min-h-11 items-center rounded-full px-3 text-body font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Descargar CV
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
