import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/projects", label: "projects" },
  { href: "/resume", label: "resume" },
  { href: "/certificates", label: "certificates" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-[color:var(--color-accent-cyan)]"
        >
          stevengates<span className="text-[color:var(--color-accent-cyan)]">.io</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
