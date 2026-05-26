// Open-source contributions — projects I support.
// Same shape as FEATURED_PROJECTS so we can reuse ProjectCard.

import type { Project } from "./projects";

export const CONTRIBUTING_PROJECTS: Project[] = [
  {
    slug: "openclaw",
    name: "OpenClaw",
    tagline: "Early adopter and contributor.",
    longPitch:
      "Used the orchestration framework heavily when 'agent' wasn't a buzzword yet. Eventually moved to Claude Code directly — fewer headaches, no middleman, native MCP. OpenClaw was the stepping stone; this is the honest version of that story.",
    url: "https://github.com/openclaw/openclaw",
    tags: ["Agent Orchestration", "Open Source", "Reference"],
    image: "/projects/openclaw.jpg",
    tier: "secondary",
    status: "live",
    yearStart: 2024,
  },
  {
    slug: "win-codexbar",
    name: "Win-CodexBar",
    tagline: "Unblocked Windows devs on first-run setup.",
    longPitch:
      "PowerShell 5.1 was choking on UTF-8 characters in setup-windows.ps1 because the file shipped without a BOM — a common Windows-10/11 first-run failure. Re-saved the script as UTF-8 with BOM. Encoding-only change, no logic touched, script ran cleanly after.",
    url: "https://github.com/Finesssee/Win-CodexBar/pull/6",
    tags: ["PowerShell", "Windows", "Bug Fix"],
    image: "/projects/win-codexbar.png",
    tier: "secondary",
    status: "live",
    yearStart: 2026,
  },
];
