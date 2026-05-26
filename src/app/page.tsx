import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContributingStrip } from "@/components/contributing-strip";
import { GithubStatsStrip } from "@/components/github-stats-strip";
import { ProjectsStrip } from "@/components/projects-strip";
import { TerminalHero } from "@/components/terminal-hero";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-20 pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          steven gates  ·  senior software engineer  ·  dallas, tx
        </p>
        <h1 className="mt-4 max-w-3xl font-mono text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          context-aware autonomous AI systems,{" "}
          <span className="text-[color:var(--color-accent-cyan)]">
            production cloud platforms,
          </span>{" "}
          and the occasional Tesla rant.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A decade of AWS / Azure / .NET cloud work behind me. Now obsessed with what
          happens when an LLM gets MCP tools, persistent memory, and a heartbeat.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <TerminalHero />
          <div className="flex flex-row gap-3 md:flex-col md:gap-2 font-mono text-xs">
            <Link
              href="/projects/kayley-cowork"
              className="inline-flex items-center justify-center gap-1 rounded-md bg-[color:var(--color-accent-cyan)] px-4 py-2 text-[color:var(--accent-foreground)] hover:opacity-90"
            >
              read the case study <ArrowRight className="size-3" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-1 rounded-md border border-border px-4 py-2 text-foreground hover:border-[color:var(--color-accent-cyan)]"
            >
              resume <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              live / github
            </p>
            <h2 className="mt-2 font-mono text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> commits, not adjectives
            </h2>
          </div>
          <Link
            href="https://github.com/stozo04"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            github.com/stozo04 <ArrowRight className="size-3" />
          </Link>
        </div>
        <GithubStatsStrip />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
          pulled at build  ·  ISR / 1h  ·  source: github graphql v4
        </p>
      </section>

      <ProjectsStrip />

      <ContributingStrip />
    </>
  );
}
