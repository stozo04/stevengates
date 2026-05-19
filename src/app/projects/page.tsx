import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { FEATURED_PROJECTS } from "@/lib/projects";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const lead = FEATURED_PROJECTS.filter((p) => p.tier === "lead");
  const secondary = FEATURED_PROJECTS.filter((p) => p.tier === "secondary");

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>

      <header className="mt-8 border-b border-border/60 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          stevengates.io / projects
        </p>
        <h1 className="mt-3 font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> what i&apos;m shipping
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The full set, in order of where the autonomous-AI signal lives strongest. Each card links
          through to a case study — Kayley_Cowork and Loan Tracker MCP are fully written; the rest
          are bones with prose to follow.
        </p>
      </header>

      <div className="mt-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          lead tier &middot; the proof-of-context-aware-AI pieces
        </p>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {lead.map((p) => (
            <ProjectCard key={p.slug} project={p} variant="lead" />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          secondary tier &middot; credibility markers
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {secondary.map((p) => (
            <ProjectCard key={p.slug} project={p} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
