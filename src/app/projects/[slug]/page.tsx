import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/case-study";
import { StubPage } from "@/components/stub-page";
import { KAYLEY_CODE_BLOCKS, KAYLEY_SECTIONS } from "@/lib/case-studies/kayley-cowork";
import { LOAN_TRACKER_SECTIONS } from "@/lib/case-studies/loan-tracker";
import { GATESFLIX_SECTIONS } from "@/lib/case-studies/gatesflix";
import { MILAGATES_SECTIONS } from "@/lib/case-studies/milagates";
import { OPENCLAW_SECTIONS } from "@/lib/case-studies/openclaw";
import { WIN_CODEXBAR_SECTIONS } from "@/lib/case-studies/win-codexbar";
import { CONTRIBUTING_PROJECTS } from "@/lib/contributing";
import { FEATURED_PROJECTS } from "@/lib/projects";

const ALL_PROJECTS = [...FEATURED_PROJECTS, ...CONTRIBUTING_PROJECTS];

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
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
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
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

  if (project.slug === "openclaw") {
    return (
      <CaseStudy
        project={project}
        sections={OPENCLAW_SECTIONS}
        heroImage={{ src: "/projects/openclaw.jpg", alt: "OpenClaw control UI Event Log fix" }}
      />
    );
  }

  if (project.slug === "win-codexbar") {
    return (
      <CaseStudy
        project={project}
        sections={WIN_CODEXBAR_SECTIONS}
        heroImage={{ src: "/projects/win-codexbar.png", alt: "Win-CodexBar PowerShell setup script fix" }}
      />
    );
  }

  if (project.slug === "gatesflix") {
    return (
      <CaseStudy
        project={project}
        sections={GATESFLIX_SECTIONS}
        heroImage={{ src: "/projects/GatesFlix.png", alt: "GatesFlix private Netflix-clone movie library" }}
      />
    );
  }

  if (project.slug === "milagates") {
    return (
      <CaseStudy
        project={project}
        sections={MILAGATES_SECTIONS}
        heroImage={{ src: "/projects/milagates-hero.jpg", alt: "Mila Gates landing carousel — family photo timeline" }}
      />
    );
  }

  // fallback — projects without a built-out case study yet
  return (
    <StubPage
      title={project.name}
      hint={`${project.longPitch} (Full case study to follow.)`}
      phase="C"
    />
  );
}
