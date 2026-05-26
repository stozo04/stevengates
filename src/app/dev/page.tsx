import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import telemetry from "@/data/dev-telemetry-snapshot.json";

// Konami-unlocked dev page. Faked Kayley telemetry from a static JSON snapshot
// per spec § Phase D — preserves portability (no live DB connection).

export const metadata = { title: "/dev", robots: { index: false } };

function fmtUptime(s: number): string {
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  return `${days}d ${hours}h`;
}

export default function DevPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24 font-mono text-sm">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>

      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          stevengates.io / dev · konami unlock
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          <span className="text-[color:var(--color-accent-cyan)]">●</span> kayley telemetry
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          You found it. This is a frozen snapshot from my Kayley Cowork PM2 mainframe —
          faked at build, no live connection. The real dashboard lives behind WireGuard at
          home. Numbers below are representative, not synthetic-random.
        </p>
      </header>

      <section className="mt-10 grid gap-3 sm:grid-cols-4">
        <Tile label="host" value={telemetry.host} />
        <Tile label="uptime" value={fmtUptime(telemetry.uptimeSeconds)} />
        <Tile label="memory" value={`${telemetry.memoryUsedGb} / ${telemetry.memoryTotalGb} GB`} />
        <Tile label="load avg" value={telemetry.loadAverage.join("  ")} />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
          &gt; services (pm2)
        </h2>
        <div className="overflow-hidden rounded-md border border-border/60 bg-card/40">
          <table className="w-full text-xs">
            <thead className="border-b border-border/60 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">name</th>
                <th className="px-3 py-2 text-left font-medium">status</th>
                <th className="px-3 py-2 text-right font-medium">restarts</th>
                <th className="px-3 py-2 text-right font-medium">uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {telemetry.services.map((s) => (
                <tr key={s.name}>
                  <td className="px-3 py-2 text-foreground">{s.name}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-1.5 text-[color:var(--color-accent-cyan)]">
                      <span aria-hidden className="size-1.5 rounded-full bg-[color:var(--color-accent-cyan)]" />
                      {s.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{s.restarts}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{s.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
            &gt; last 5 system_logs
          </h2>
          <ul className="space-y-1 rounded-md border border-border/60 bg-[#070707] p-4 text-xs leading-relaxed">
            {telemetry.logs.map((l, i) => (
              <li key={i}>
                <span className="text-muted-foreground">{l.ts}</span>{" "}
                <span className="text-[color:var(--color-accent-cyan)]">{l.level}</span>{" "}
                <span className="text-foreground">{l.component}</span>{" "}
                <span className="text-muted-foreground">{l.msg}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
            &gt; today
          </h2>
          <dl className="space-y-2 rounded-md border border-border/60 bg-card/40 p-4 text-xs">
            {Object.entries(telemetry.todayCounts).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">{k.replace(/([A-Z])/g, " $1").toLowerCase()}</dt>
                <dd className="tabular-nums text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <p className="mt-12 text-xs text-muted-foreground">
        snapshot · {telemetry.capturedAt} · noindex
      </p>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-card/40 p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 truncate text-base text-foreground">{value}</div>
    </div>
  );
}
