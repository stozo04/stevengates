export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col justify-center px-4 sm:px-6">
      <div className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          v2 / phase-a / scaffold
        </p>
        <h1 className="font-mono text-3xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl">
          <span className="text-muted-foreground">&gt;</span> stevengates v2
          <br />
          <span className="text-[color:var(--color-accent-cyan)] terminal-cursor">loading</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Next.js 16, React 19, Tailwind v4, shadcn/ui, motion, Geist Mono.
          Dark by default. Theme toggle in the nav.
          The terminal hero lands in Phase B.
        </p>
        <div className="font-mono text-xs text-muted-foreground">
          <span className="text-[color:var(--color-accent-cyan)]">●</span>{" "}
          dev server running &middot; no Bootstrap, no jQuery, no template cruft
        </div>
      </div>
    </section>
  );
}
