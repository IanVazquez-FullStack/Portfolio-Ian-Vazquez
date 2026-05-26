import Link from "next/link";
import { CVDownloadButton } from "@/components/content/CVDownloadButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import { personal } from "@/lib/data/personal";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full text-h3 font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Ir al inicio"
        >
          {personal.logo}
        </Link>
        <div className="hidden items-center gap-3 md:flex">
          <Navigation />
          <CVDownloadButton variant="secondary" />
        </div>
        <MobileNav />
      </Container>
    </header>
  );
}
