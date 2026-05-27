"use client";

import { CVDownloadButton } from "@/components/content/CVDownloadButton";
import { AboutSection } from "@/components/content/AboutSection";
import { Container } from "@/components/ui/Container";
import { aboutSections } from "@/lib/data/about";

export function AboutPageClient() {
  return (
    <Container className="py-20">
      <section className="max-w-3xl">
        <header>
          <p className="text-caption font-semibold uppercase tracking-wide text-foreground">
            About
          </p>
          <h1 className="mt-3 text-display text-foreground">
            Sobre Mí
          </h1>
        </header>

        <div className="mt-8 flex flex-col gap-12">
          {aboutSections.map((section) => (
            <AboutSection
              key={section.id}
              id={section.id}
              heading={section.heading}
            >
              {section.content}
            </AboutSection>
          ))}
        </div>

        <CVDownloadButton className="mt-10" />
      </section>
    </Container>
  );
}
