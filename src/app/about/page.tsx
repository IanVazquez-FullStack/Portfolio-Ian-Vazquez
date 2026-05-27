import { AboutPageClient } from "@/components/content/AboutPageClient";
import { buildMetadata } from "@/lib/seo/metadata";
import { personal } from "@/lib/data/personal";

export const metadata = buildMetadata({
  title: "Sobre mí",
  description:
    `Conoce más sobre ${personal.displayName}: su trayectoria, habilidades y experiencia como desarrollador Full Stack.`,
});

export default function AboutPage() {
  return <AboutPageClient />;
}
