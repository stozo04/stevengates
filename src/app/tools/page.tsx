import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

import pkg from "../../../package.json";

export const metadata = { title: "Tools" };

type DepRow = { name: string; version: string };

function rows(deps: Record<string, string>): DepRow[] {
  return Object.entries(deps)
    .map(([name, version]) => ({ name, version: version.replace(/^[\^~]/, "") }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function ToolsPage() {
  const prod = rows((pkg as { dependencies: Record<string, string> }).dependencies);
  const dev = rows((pkg as { devDependencies: Record<string, string> }).devDependencies);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>

      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          stevengates.io / tools
        </p>
        <h1 className="mt-4 font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> the actual stack
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Auto-read from <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">package.json</code> at build.
          What you see here is exactly what ships on Vercel.
        </p>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <DepTable heading="dependencies (prod)" deps={prod} />
        <DepTable heading="devDependencies" deps={dev} />
      </div>

      <p className="mt-12 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Github className="size-3" />
        <Link
          href="https://github.com/stozo04/stevengates/blob/master/package.json"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          source of truth — package.json on GitHub
        </Link>
      </p>
    </div>
  );
}

function DepTable({ heading, deps }: { heading: string; deps: DepRow[] }) {
  return (
    <div>
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
        &gt; {heading}
      </h2>
      <ul className="divide-y divide-border/40 rounded-md border border-border/60 bg-card/40 font-mono text-xs">
        {deps.map((d) => (
          <li key={d.name} className="flex items-center justify-between gap-3 px-3 py-2">
            <span className="truncate text-foreground">{d.name}</span>
            <span className="shrink-0 text-muted-foreground tabular-nums">{d.version}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
