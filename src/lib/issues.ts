// Open-source contributions of a different kind: detailed issue tickets.
// A good bug report — clean repro, root cause, proposed fix — is a contribution
// in its own right, separate from the PRs in CONTRIBUTING_PROJECTS.

export type IssueContribution = {
  repo: string; // "tobi/qmd"
  number: number;
  url: string;
  title: string;
  state: "open" | "closed";
  filed: string; // ISO date — formatted for display at render time
  summary: string;
  highlights: string[]; // what made the report useful
  impact?: string; // the outsized outcome, shown as a footer stat
};

export const ISSUE_CONTRIBUTIONS: IssueContribution[] = [
  {
    repo: "tobi/qmd",
    number: 672,
    url: "https://github.com/tobi/qmd/issues/672",
    title:
      "npm i -g @tobilu/qmd@2.5.2 on Windows + Node 22 silently produces a broken install — postinstall fails to land better-sqlite3 v127 binary",
    state: "open",
    filed: "2026-05-22",
    summary:
      "Hit a silent broken install, wrote a full reproduction, and traced it past the misleading error message to the real cause: postinstall never lands the native better-sqlite3 binary, yet the install still exits 0. Proposed two concrete fixes. Two other developers then confirmed the same regression on macOS ARM and Linux x64 — what looked like one Windows edge case turned out to be a cross-platform install bug.",
    highlights: ["clean repro", "root cause traced", "2 fixes proposed"],
    impact: "3 platforms confirmed",
  },
];
