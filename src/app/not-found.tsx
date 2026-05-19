import Link from "next/link";

// ASCII 404 — the route tree with the missing one struck-through.
// spec § 0.5 easter egg.

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
  { path: "/projects/kayley-cowork", label: "case study" },
  { path: "/projects/loan-tracker-mcp", label: "case study" },
  { path: "/projects/milagates", label: "case study" },
  { path: "/projects/gatesflix", label: "case study" },
  { path: "/projects/openclaw", label: "case study" },
  { path: "/resume", label: "resume" },
  { path: "/certificates", label: "certificates" },
  { path: "/about", label: "about" },
  { path: "/contact", label: "contact" },
  { path: "/tools", label: "tools" },
  { path: "/dev", label: "konami-unlocked telemetry" },
];

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 sm:pt-20 pb-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404 / route not found
      </p>
      <h1 className="mt-4 font-mono text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
        <span className="text-[color:var(--color-accent-cyan)]">&gt;</span> nope.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        The URL you typed isn&apos;t on the routing table. Here&apos;s the full tree —
        pick a node and click through.
      </p>

      <div className="mt-10 rounded-md border border-border/60 bg-[#070707] p-5 font-mono text-xs leading-relaxed text-foreground/80 sm:text-sm">
        <div className="mb-3 text-muted-foreground">$ tree stevengates.io</div>
        <div className="space-y-1">
          <div>
            <span className="text-[color:var(--color-accent-cyan)]">.</span>
          </div>
          {ROUTES.map((r, i) => {
            const isLast = i === ROUTES.length - 1;
            const branch = isLast ? "└──" : "├──";
            return (
              <div key={r.path}>
                <span className="text-muted-foreground">{branch} </span>
                <Link
                  href={r.path}
                  className="text-foreground hover:text-[color:var(--color-accent-cyan)]"
                >
                  {r.path}
                </Link>
                <span className="text-muted-foreground"> — {r.label}</span>
              </div>
            );
          })}
          <div className="pt-3">
            <span className="text-muted-foreground">└── </span>
            <span className="line-through text-destructive/80">&lt;the route you wanted&gt;</span>
            <span className="text-muted-foreground"> — not a thing</span>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-1 font-mono text-xs text-[color:var(--color-accent-cyan)] hover:underline underline-offset-4"
      >
        &lt;-- back to home
      </Link>
    </section>
  );
}
