// Featured projects — locked in by Steven 2026-05-19 (spec § Phase B table).
// source: docs/exec-plan/active/goal-stevengates-modernization.md L256-273

export type ProjectTier = "lead" | "secondary";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  longPitch: string;
  url?: string;
  github?: string;
  tags: string[];
  image?: string; // path in /public, undefined → card uses inline JSX art
  tier: ProjectTier;
  status: "live" | "private";
  yearStart: number;
  reframe?: string; // optional honest framing for OpenClaw-style projects
};

export const FEATURED_PROJECTS: Project[] = [
  {
    slug: "kayley-cowork",
    name: "Kayley Cowork",
    tagline: "Autonomous companion agent built on Claude Code.",
    longPitch:
      "4-step cognitive loop. Multi-channel ingress: Telegram, Ring cameras, Gmail, calendar, heartbeat tick. 1.5M+ row long-term memory in Supabase. 24/7 PM2-managed services. The same brain replying to this question, written in Markdown + Claude Code + a lot of weekends.",
    tags: ["Claude Code", "Next.js", "Supabase", "TypeScript", "AI Agents"],
    tier: "lead",
    status: "private",
    yearStart: 2026,
  },
  {
    slug: "loan-tracker-mcp",
    name: "Loan Tracker",
    tagline: "Agentic web — no input fields. You speak.",
    longPitch:
      "Built to understand what 'agentic website' actually means before the buzzword settled. No forms, no buttons, no inputs — a mic and a transcript. Loan data lives behind an MCP server the page talks to in plain English.",
    url: "https://loan-tracker-mcp.vercel.app",
    tags: ["MCP", "Vercel", "Voice UI", "Agentic Web"],
    image: "/projects/loan-tracker.jpg",
    tier: "lead",
    status: "live",
    yearStart: 2026,
  },
  {
    slug: "milagates",
    name: "Mila Gates",
    tagline: "A growing-up site for my daughter.",
    longPitch:
      "Family-facing scrapbook + milestone log + photo timeline for Mila. The 'I build for the people I love' piece. Less technical, more important.",
    url: "https://milagates.com",
    tags: ["Next.js", "Family", "Storytelling"],
    image: "/projects/milagates.jpg",
    tier: "lead",
    status: "live",
    yearStart: 2025,
  },
  {
    slug: "gatesflix",
    name: "GatesFlix",
    tagline: "A private Netflix-clone movie database.",
    longPitch:
      "2,000+ purchased movies, .NET + C# + MVC, IMDb integration, Synology NAS with VLC encoding. Built because the streaming services kept losing the films I actually wanted to rewatch.",
    tags: [".NET", "C#", "MVC", "Synology"],
    image: "/projects/GatesFlix.png",
    tier: "secondary",
    status: "private",
    yearStart: 2017,
  },
];
