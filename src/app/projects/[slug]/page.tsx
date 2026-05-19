import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/case-study";
import { StubPage } from "@/components/stub-page";
import { KAYLEY_CODE_BLOCKS, KAYLEY_SECTIONS } from "@/lib/case-studies/kayley-cowork";
import { LOAN_TRACKER_SECTIONS } from "@/lib/case-studies/loan-tracker";
import { FEATURED_PROJECTS } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
      images: [{ url: `/og/${project.slug}`, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectCaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  if (project.slug === "kayley-cowork") {
    return <CaseStudy project={project} sections={KAYLEY_SECTIONS} codeBlocks={KAYLEY_CODE_BLOCKS} />;
  }

  if (project.slug === "loan-tracker-mcp") {
    return (
      <CaseStudy
        project={project}
        sections={LOAN_TRACKER_SECTIONS}
        heroImage={{ src: "/projects/loan-tracker.png", alt: "Loan Tracker MCP voice-driven UI" }}
      />
    );
  }

  // milagates / gatesflix / openclaw — stubbed bones per spec § Phase C
  return (
    <StubPage
      title={project.name}
      hint={`${project.longPitch} (Full case study to follow.)`}
      phase="C"
    />
  );
}
