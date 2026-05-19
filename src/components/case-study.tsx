import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

type Section = { heading: string; body: React.ReactNode };

type Props = {
  project: Project;
  sections: Section[];
  codeBlocks?: { lang: string; code: string; caption?: string }[];
  heroImage?: { src: string; alt: string };
};

export function CaseStudy({ project, sections, codeBlocks, heroImage }: Props) {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>case study</span>
          <span>&middot;</span>
          <span>{project.tier}</span>
          <span>&middot;</span>
          <span>since {project.yearStart}</span>
        </div>
        <h1 className="mt-4 font-mono text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.url ? (
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-[color:var(--color-accent-cyan)] px-3 py-1.5 font-mono text-xs text-[color:var(--accent-foreground)] hover:opacity-90"
            >
              visit live <ArrowUpRight className="size-3" />
            </Link>
          ) : null}
          {project.status === "private" ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-3 py-1.5 font-mono text-xs text-muted-foreground">
              <Lock className="size-3" /> private build
            </span>
          ) : null}
          {project.tags.map((t) => (
            <Badge key={t} variant="outline" className="font-mono text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
        {project.reframe ? (
          <p className="mt-6 rounded-md border-l-2 border-[color:var(--color-accent-cyan)]/60 bg-card/40 px-4 py-3 text-sm italic text-muted-foreground">
            {project.reframe}
          </p>
        ) : null}
      </header>

      {heroImage ? (
        <div className="mt-10 overflow-hidden rounded-lg border border-border/60 bg-black">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={1280}
            height={800}
            className="h-auto w-full"
          />
        </div>
      ) : null}

      <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground/90">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
              &gt; {s.heading}
            </h2>
            <div className="space-y-4 text-muted-foreground [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]">
              {s.body}
            </div>
          </section>
        ))}

        {codeBlocks && codeBlocks.length > 0 ? (
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
              &gt; receipts (source)
            </h2>
            <div className="space-y-6">
              {codeBlocks.map((block, i) => (
                <figure key={i} className="overflow-hidden rounded-md border border-border/60 bg-[#070707]">
                  <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>{block.caption ?? `snippet-${i + 1}.${block.lang}`}</span>
                    <span>{block.lang}</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground/90">
                    <code>{block.code}</code>
                  </pre>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
