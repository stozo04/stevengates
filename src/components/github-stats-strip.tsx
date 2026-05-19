// Server Component — fetched at build, ISR'd hourly via getGithubStats().
import { getGithubStats } from "@/lib/github-stats";

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export async function GithubStatsStrip() {
  const stats = await getGithubStats();

  if (!stats.ok) {
    return (
      <div className="rounded-lg border border-dashed border-border/60 p-4 font-mono text-xs text-muted-foreground">
        github stats unavailable · check GITHUB_TOKEN
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-px rounded-lg border border-border/60 bg-border/40 md:grid-cols-4 overflow-hidden">
      <Stat label="commits / 7d" value={fmt(stats.commitsThisWeek)} />
      <Stat label="streak" value={`${stats.currentStreakDays}d`} />
      <Stat label="contribs / 1y" value={fmt(stats.totalContributionsYear)} />
      <Stat
        label="primary lang"
        value={stats.topLanguages[0]?.name ?? "—"}
        accent={stats.topLanguages[0]?.color}
      />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="bg-card px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex items-baseline gap-2">
        {accent && (
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
          />
        )}
        <span className="font-mono text-xl font-medium tabular-nums text-foreground sm:text-2xl">
          {value}
        </span>
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
