import { ArrowRight, ArrowUpRight, Check, CircleDot } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ISSUE_CONTRIBUTIONS, type IssueContribution } from "@/lib/issues";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

export function IssuesStrip() {
  return (
    <section
      aria-labelledby="issue-contributions"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            contributing / open source
          </p>
          <h2
            id="issue-contributions"
            className="mt-2 font-mono text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
          >
            <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> issues, not just
            pull requests
          </h2>
        </div>
        <Link
          href="https://github.com/issues?q=is%3Aissue+author%3Astozo04"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          all issues <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        <div className="md:pt-1">
          <p className="text-base leading-relaxed text-muted-foreground">
            Code isn&apos;t the only way to move a project forward. A reproducible bug report — with
            the root cause traced and a fix proposed — saves a maintainer hours and gets the real
            problem shipped faster.
          </p>
          <p className="mt-4 font-mono text-sm leading-relaxed text-foreground/80">
            I file the ticket I&apos;d want to receive.
          </p>
        </div>

        <ul className="space-y-5">
          {ISSUE_CONTRIBUTIONS.map((issue) => (
            <li key={`${issue.repo}#${issue.number}`}>
              <IssueCard issue={issue} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IssueCard({ issue }: { issue: IssueContribution }) {
  const isOpen = issue.state === "open";

  return (
    <article className="group relative flex flex-col gap-4 rounded-lg border border-border/60 bg-card/40 p-5 transition-colors hover:border-[color:var(--color-accent-cyan)]/60 sm:p-6">
      <div className="flex items-center justify-between gap-3 font-mono text-[11px]">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <CircleDot
            className={
              isOpen
                ? "size-3.5 text-[color:var(--color-accent-cyan)]"
                : "size-3.5 text-muted-foreground"
            }
          />
          <span className="uppercase tracking-widest">{issue.state}</span>
          <span className="text-border">·</span>
          <span className="text-foreground/80">{issue.repo}</span>
          <span className="text-foreground/80">#{issue.number}</span>
        </span>
        <span className="shrink-0 text-muted-foreground/70">
          filed {dateFmt.format(new Date(issue.filed))}
        </span>
      </div>

      <h3 className="font-mono text-sm font-medium leading-snug tracking-tight text-foreground sm:text-[15px]">
        {issue.title}
      </h3>

      <p className="text-sm leading-relaxed text-muted-foreground">{issue.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {issue.highlights.map((h) => (
          <Badge key={h} variant="outline" className="font-mono text-[10px]">
            {h}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        {issue.impact ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[color:var(--color-accent-cyan)]">
            <Check className="size-3.5" /> {issue.impact}
          </span>
        ) : (
          <span />
        )}
        <Link
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View issue ${issue.repo} #${issue.number} on GitHub`}
          className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground after:absolute after:inset-0 after:content-['']"
        >
          view issue <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </article>
  );
}
