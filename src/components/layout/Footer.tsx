import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-body font-semibold text-foreground">
            © {new Date().getFullYear()} Ian Vázquez
          </p>
          <a
            href="mailto:ianvazquezwork@gmail.com"
            className="text-body text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ianvazquezwork@gmail.com
          </a>
        </div>
        <nav aria-label="Enlaces secundarios">
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href="https://github.com/oneConnor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full px-3 text-body font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ian-vazquez-full-stack-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full px-3 text-body font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <span
                aria-disabled="true"
                className="inline-flex min-h-11 items-center rounded-full px-3 text-body font-semibold text-muted-foreground"
              >
                Descargar CV
              </span>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
