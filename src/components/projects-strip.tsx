import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { FEATURED_PROJECTS } from "@/lib/projects";

export function ProjectsStrip() {
  const lead = FEATURED_PROJECTS.filter((p) => p.tier === "lead");
  const secondary = FEATURED_PROJECTS.filter((p) => p.tier === "secondary");

  return (
    <section
      aria-labelledby="featured-projects"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            featured / 2026
          </p>
          <h2 id="featured-projects" className="mt-2 font-mono text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> what i&apos;m shipping
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden md:inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          all projects <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {lead.map((p) => (
          <ProjectCard key={p.slug} project={p} variant="lead" />
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {secondary.map((p) => (
          <ProjectCard key={p.slug} project={p} variant="compact" />
        ))}
      </div>
    </section>
  );
}
