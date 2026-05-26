import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <ContactPreview />
    </div>
  );
}
