// Stub-page shell — used by /about, /contact, /resume, etc. between phases.
// Replaced in Phase C/D with the real implementation.
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  hint: string;
  phase: "C" | "D";
};

export function StubPage({ title, hint, phase }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        stevengates.io / {title.toLowerCase()}
      </p>
      <h1 className="mt-4 font-mono text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> {title}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">{hint}</p>
      <p className="mt-4 font-mono text-xs text-muted-foreground/60">
        landing in phase {phase} of the v2 rebuild.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-1 font-mono text-xs text-[color:var(--color-accent-cyan)] hover:underline underline-offset-4"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>
    </section>
  );
}
