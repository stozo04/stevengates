// Live GitHub stats for the home-page strip. Cached at build, ISR'd hourly.
// source: spec § 0.1 signal #1 — "Live GitHub data (commits this week, language %, current streak) pulled at build time via GraphQL"

const GITHUB_LOGIN = "stozo04";
const ENDPOINT = "https://api.github.com/graphql";

export type GithubLang = { name: string; color: string; size: number; pct: number };
export type GithubStats = {
  ok: boolean;
  commitsThisWeek: number;
  totalContributionsYear: number;
  currentStreakDays: number;
  topLanguages: GithubLang[];
  fetchedAt: string;
};

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { contributionCount date }
          }
        }
      }
      repositories(first: 50, ownerAffiliations: OWNER, orderBy: { field: PUSHED_AT, direction: DESC }, isFork: false) {
        nodes {
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name color }
            }
          }
        }
      }
    }
  }
`;

function emptyStats(reason: string): GithubStats {
  console.warn(`[github-stats] returning empty (${reason})`);
  return {
    ok: false,
    commitsThisWeek: 0,
    totalContributionsYear: 0,
    currentStreakDays: 0,
    topLanguages: [],
    fetchedAt: new Date().toISOString(),
  };
}

function sumLast7(days: { date: string; contributionCount: number }[]): number {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return days
    .filter((d) => new Date(d.date).getTime() >= cutoff)
    .reduce((acc, d) => acc + d.contributionCount, 0);
}

function currentStreak(days: { date: string; contributionCount: number }[]): number {
  const sorted = [...days].sort((a, b) => (a.date < b.date ? 1 : -1));
  let streak = 0;
  for (const day of sorted) {
    if (day.contributionCount > 0) streak += 1;
    else if (streak > 0) break;
  }
  return streak;
}

function aggregateLanguages(repos: { languages: { edges: { size: number; node: { name: string; color: string } }[] } }[]): GithubLang[] {
  const totals = new Map<string, { size: number; color: string }>();
  for (const repo of repos) {
    for (const edge of repo.languages.edges) {
      const prev = totals.get(edge.node.name) ?? { size: 0, color: edge.node.color };
      prev.size += edge.size;
      totals.set(edge.node.name, prev);
    }
  }
  const totalSize = Array.from(totals.values()).reduce((acc, v) => acc + v.size, 0);
  return Array.from(totals.entries())
    .map(([name, v]) => ({ name, color: v.color ?? "#888", size: v.size, pct: totalSize > 0 ? (v.size / totalSize) * 100 : 0 }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 4);
}

export async function getGithubStats(): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return emptyStats("missing GITHUB_TOKEN");

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "stevengates.io",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_LOGIN } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return emptyStats(`HTTP ${res.status}`);

    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions: number;
              weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
            };
          };
          repositories?: {
            nodes: { languages: { edges: { size: number; node: { name: string; color: string } }[] } }[];
          };
        };
      };
      errors?: unknown;
    };

    if (json.errors || !json.data?.user) return emptyStats("GraphQL errors");

    const cal = json.data.user.contributionsCollection?.contributionCalendar;
    const days = cal?.weeks.flatMap((w) => w.contributionDays) ?? [];

    return {
      ok: true,
      commitsThisWeek: sumLast7(days),
      totalContributionsYear: cal?.totalContributions ?? 0,
      currentStreakDays: currentStreak(days),
      topLanguages: aggregateLanguages(json.data.user.repositories?.nodes ?? []),
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    return emptyStats((err as Error).message);
  }
}
