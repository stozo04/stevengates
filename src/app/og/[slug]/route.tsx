import { ImageResponse } from "next/og";

import { FEATURED_PROJECTS } from "@/lib/projects";

// Dynamic OG image per project — Satori-rendered on the edge per spec § 0.5.
// Falls through to a generic site OG when slug doesn't match.

export const runtime = "edge";

type Params = { params: Promise<{ slug: string }> };

const SIZE = { width: 1200, height: 630 };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);

  const title = project?.name ?? "Steven Gates";
  const subtitle = project?.tagline ?? "Senior Software Engineer · Dallas, TX";
  const tier = project?.tier ?? "site";
  const since = project?.yearStart ?? new Date().getFullYear();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "monospace",
          padding: "70px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#9ca3af" }}>
          <span style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>stevengates.io</span>
          <span style={{ color: "#06b6d4" }}>/</span>
          <span style={{ fontSize: 20, color: "#06b6d4" }}>{project ? `case study · ${tier}` : "portfolio"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ color: "#6b7280", fontSize: 64 }}>&gt;</span>
            <span style={{ fontSize: 88, fontWeight: 500, letterSpacing: -2, lineHeight: 1 }}>{title}</span>
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#a3a3a3", maxWidth: 1000 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#6b7280", fontSize: 22 }}>
          <span>steven gates · dallas, tx</span>
          <span>since {since}</span>
        </div>
      </div>
    ),
    { ...SIZE },
  );
}
