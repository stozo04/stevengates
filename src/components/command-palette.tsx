"use client";

import { Command } from "cmdk";
import { ArrowUpRight, FileText, FolderGit2, Home, Mail, ScrollText, Sparkles, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FEATURED_PROJECTS } from "@/lib/projects";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Certificates", href: "/certificates", icon: ScrollText },
  { label: "About", href: "/about", icon: Sparkles },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Tools", href: "/tools", icon: Wrench },
];

const EXTERNAL = [
  { label: "GitHub", href: "https://github.com/stozo04", icon: ArrowUpRight },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gates-steven/", icon: ArrowUpRight },
  { label: "X (Twitter)", href: "https://x.com/sgates2011", icon: ArrowUpRight },
  { label: "Email Steven", href: "mailto:gates.steven@gmail.com", icon: ArrowUpRight },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "/" && !open && e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function go(href: string) {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="command palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg border border-border/80 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="font-mono text-sm">
          <Command.Input
            placeholder="type a command or search…  esc to close"
            className="w-full border-b border-border/60 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-muted-foreground">
              no results · try /projects, /resume, kayley
            </Command.Empty>
            <Command.Group heading="navigate" className="px-1 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              {NAV_ITEMS.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => go(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-foreground aria-selected:bg-muted/60"
                >
                  <item.icon className="size-4 text-[color:var(--color-accent-cyan)]" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{item.href}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="projects" className="px-1 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              {FEATURED_PROJECTS.map((p) => (
                <Command.Item
                  key={p.slug}
                  value={`${p.name} ${p.tags.join(" ")}`}
                  onSelect={() => go(`/projects/${p.slug}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-foreground aria-selected:bg-muted/60"
                >
                  <FolderGit2 className="size-4 text-[color:var(--color-accent-cyan)]" />
                  <span>{p.name}</span>
                  <span className="ml-auto truncate text-xs text-muted-foreground">{p.tagline}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="external" className="px-1 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              {EXTERNAL.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => go(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-foreground aria-selected:bg-muted/60"
                >
                  <item.icon className="size-4 text-[color:var(--color-accent-cyan)]" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">↗</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <div className="border-t border-border/60 px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <kbd>⌘K</kbd> · <kbd>/</kbd> · <kbd>esc</kbd>
          </div>
        </Command>
      </div>
    </div>
  );
}
