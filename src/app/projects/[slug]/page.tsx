import { notFound } from "next/navigation";

import { StubPage } from "@/components/stub-page";
import { FEATURED_PROJECTS } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  return { title: project?.name ?? "Project" };
}

export default async function ProjectCaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <StubPage
      title={project.name}
      hint={project.longPitch}
      phase="C"
    />
  );
}
