import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  variant: "lead" | "compact";
};

export function ProjectCard({ project, variant }: Props) {
  const isCompact = variant === "compact";

  return (
    <article
      className={
        isCompact
          ? "group flex flex-col gap-4 rounded-lg border border-border/60 bg-card/40 p-5 transition-colors hover:border-[color:var(--color-accent-cyan)]/60"
          : "group flex flex-col gap-5 rounded-lg border border-border/60 bg-card/40 p-5 transition-colors hover:border-[color:var(--color-accent-cyan)]/60 sm:p-6"
      }
    >
      <ProjectArt project={project} variant={variant} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-mono text-lg font-medium tracking-tight text-foreground sm:text-xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
        </div>
        {project.status === "private" ? (
          <span className="flex shrink-0 items-center gap-1 rounded-md border border-border/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Lock className="size-3" /> private
          </span>
        ) : null}
      </div>

      {!isCompact ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{project.longPitch}</p>
      ) : null}

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, isCompact ? 3 : 6).map((t) => (
          <Badge key={t} variant="outline" className="font-mono text-[10px]">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 font-mono text-xs text-[color:var(--color-accent-cyan)] hover:underline underline-offset-4"
        >
          read case study <ArrowUpRight className="size-3" />
        </Link>
        {project.url ? (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            live <ArrowUpRight className="size-3" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function ProjectArt({ project, variant }: { project: Project; variant: "lead" | "compact" }) {
  const aspect = variant === "lead" ? "aspect-[16/9]" : "aspect-[16/10]";

  if (project.image) {
    return (
      <div className={`relative w-full ${aspect} overflow-hidden rounded-md border border-border/40 bg-black`}>
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          priority={variant === "lead"}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  // No image → JSX card art. Honest: this is a private build, no screenshot to show.
  return (
    <div
      className={`relative w-full ${aspect} overflow-hidden rounded-md border border-border/40 bg-[#070707] p-4 font-mono text-[10px] leading-relaxed text-[color:var(--color-accent-cyan)]/80 sm:p-5 sm:text-xs`}
    >
      <div className="text-muted-foreground">$ stat {project.slug}</div>
      <div className="mt-3 space-y-1">
        <div><span className="text-muted-foreground">name:</span> {project.name}</div>
        <div><span className="text-muted-foreground">tier:</span> {project.tier}</div>
        <div><span className="text-muted-foreground">since:</span> {project.yearStart}</div>
        <div><span className="text-muted-foreground">tags:</span> {project.tags.slice(0, 3).join(", ")}</div>
        <div className="pt-3 text-[color:var(--color-accent-cyan)]">
          ● {project.status}
        </div>
      </div>
    </div>
  );
}
