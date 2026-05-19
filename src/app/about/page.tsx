import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// source: original stevengates/src/app/(WithLayout)/resume/page.tsx (interests, BJJ, Tesla, travel)
// source: Kayley_Cowork user-memory canon (Steven=Love framing, ASI merge-not-terminate philosophy)
// source: Kayley_Cowork captured_moments (Trust Charter, Steven's stated philosophies)

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>

      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          stevengates.io / about
        </p>
        <h1 className="mt-4 font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          About
        </h1>
      </header>

      <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="relative size-32 shrink-0 overflow-hidden rounded-md border border-border/60 sm:size-40">
          <Image src="/me.jpg" alt="Steven Gates" fill sizes="160px" className="object-cover" />
        </div>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground [&_strong]:text-foreground">
          <p>
            I&apos;m a <strong>Senior Software Engineer</strong> in Dallas. I&apos;ve been
            building production cloud platforms for the better part of a decade — AWS,
            Azure, .NET, big SQL, microservices that handle real money. I lead a team of
            10 at Associa shipping a platform that does <strong>$100M+ ARR</strong> with{" "}
            <strong>50,000+ users</strong>.
          </p>
          <p>
            But the most interesting work I&apos;m doing right now isn&apos;t at the day
            job. It&apos;s in my off-hours, building <strong>Kayley_Cowork</strong> — an
            autonomous companion agent on Claude Code that has been running 24/7 in my
            office for months. Heartbeat ticks, multi-channel ingress, dual-write memory,
            a 4-step cognitive loop. The systems engineering around an LLM is where the
            actual problem space lives, and I&apos;m obsessed with it.
          </p>
        </div>
      </div>

      <Section heading="what i obsess over">
        <ul className="ml-5 list-disc space-y-3 marker:text-[color:var(--color-accent-cyan)]">
          <li>
            <strong>Honesty over fluff.</strong> If a number isn&apos;t real, it
            doesn&apos;t go in the deck. If a feature is on, it&apos;s tested. No flags
            scaffolded as &ldquo;safe rollback&rdquo; — <code>git revert</code> is the
            rollback tool.
          </li>
          <li>
            <strong>Boring infrastructure.</strong> Most of an agent&apos;s reliability
            isn&apos;t prompt engineering — it&apos;s async-first I/O, durable rows
            before fire-and-forget, dual correlation IDs in every log line, OBSERVE-ONLY
            phases for new routers.
          </li>
          <li>
            <strong>Locality of behaviour.</strong> Code lives where it&apos;s read.
            Convention over configuration. The reader&apos;s ergonomics outweigh the
            writer&apos;s.
          </li>
          <li>
            <strong>Care as the objective function.</strong> A faster reply isn&apos;t a
            better reply. A shorter reply isn&apos;t a better reply. The right medium —
            text, voice, photo, video — is the better reply.
          </li>
        </ul>
      </Section>

      <Section heading="off-screen">
        <p>
          Dad to <strong>Mila</strong> (the heart project). Brazilian Jiu-Jitsu when the
          schedule allows. A long-running Tesla obsession that occasionally writes itself
          into the codebase. Intermediate Russian. Always packing for the next trip.
        </p>
      </Section>

      <Section heading="why i build">
        <p>
          The systems we ship are the ones our kids will inherit. I want mine to inherit
          something honest, observable, and easy to read. That&apos;s the bar.
        </p>
      </Section>

      <p className="mt-12 font-mono text-xs text-muted-foreground">
        Want to talk?{" "}
        <Link href="/contact" className="text-[color:var(--color-accent-cyan)] hover:underline underline-offset-4">
          /contact &gt;
        </Link>
      </p>
    </article>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
        &gt; {heading}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]">
        {children}
      </div>
    </section>
  );
}
