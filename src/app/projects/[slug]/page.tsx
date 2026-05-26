import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/content/getProjects";
import { compileMdx } from "@/lib/content/mdx";
import { CaseStudyLayout } from "@/components/content/CaseStudyLayout";
import MDXComponents from "@/components/content/MDXComponents";
import { Container } from "@/components/ui/Container";
import { SITE_URL } from "@/lib/seo/site";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [`${SITE_URL}${project.coverImage}`] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const CompiledContent = await compileMdx(project.content);

  return (
    <Container className="py-12 md:py-20">
      <CaseStudyLayout project={project}>
        <CompiledContent components={MDXComponents} />
      </CaseStudyLayout>
    </Container>
  );
}
