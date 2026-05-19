import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

// source: original stevengates/src/app/(WithLayout)/contact/page.tsx (kept email + socials)

export const metadata = { title: "Contact" };

const CHANNELS = [
  {
    label: "Email",
    detail: "gates.steven@gmail.com",
    href: "mailto:gates.steven@gmail.com",
    icon: Mail,
    note: "Best route for recruiters and project conversations.",
  },
  {
    label: "GitHub",
    detail: "github.com/stozo04",
    href: "https://github.com/stozo04",
    icon: Github,
    note: "Public work + open-source contributions.",
  },
  {
    label: "LinkedIn",
    detail: "linkedin.com/in/gates-steven",
    href: "https://www.linkedin.com/in/gates-steven/",
    icon: Linkedin,
    note: "Formal route — connect requests welcomed.",
  },
  {
    label: "X (Twitter)",
    detail: "@sgates2011",
    href: "https://x.com/sgates2011",
    icon: Twitter,
    note: "Where the casual stuff lives.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>

      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          stevengates.io / contact
        </p>
        <h1 className="mt-4 font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> get in touch
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Direct routes. No contact form theater. Pick the channel that fits and
          I&apos;ll get back to you.
        </p>
      </header>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <li key={c.label}>
            <Link
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex h-full flex-col gap-2 rounded-md border border-border/60 bg-card/40 p-4 transition-colors hover:border-[color:var(--color-accent-cyan)]/60"
            >
              <div className="flex items-center gap-2">
                <c.icon className="size-4 text-[color:var(--color-accent-cyan)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {c.label}
                </span>
              </div>
              <span className="font-mono text-sm text-foreground">{c.detail}</span>
              <span className="text-xs text-muted-foreground">{c.note}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <MapPin className="size-3" /> Dallas, Texas &middot; Central time
      </div>
    </div>
  );
}
