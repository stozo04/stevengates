// source: Finesssee/Win-CodexBar PR #6 — merged 2026-03-17
// source: surfaced trying to onboard the project on a clean Windows 11 box

export const WIN_CODEXBAR_SECTIONS = [
  {
    heading: "the project",
    body: (
      <p>
        <strong>Win-CodexBar</strong> is a Rust-based Windows utility. First-run setup
        runs through a PowerShell script (<code>setup-windows.ps1</code>) that installs
        the Rust toolchain and MinGW for new contributors. I tried to install it on a
        clean Windows 11 box — the script refused to even parse.
      </p>
    ),
  },
  {
    heading: "the bug",
    body: (
      <>
        <p>PowerShell 5.1 — the default shell on Windows 10/11 — failed immediately with:</p>
        <pre className="overflow-x-auto rounded-md border border-border/60 bg-[#070707] p-4 font-mono text-xs">
          <code>The string is missing the terminator: &quot;.</code>
        </pre>
        <p>
          Confusing — there was no obviously-broken string in the source. Tracing it:
          PowerShell 5.1 falls back to ANSI (Windows-1252) when a file has no BOM, but the
          script contained UTF-8 characters in its decorative comment box. Bytes
          misinterpreted, parser broken.
        </p>
      </>
    ),
  },
  {
    heading: "the contribution",
    body: (
      <>
        <p>
          <strong>
            PR{" "}
            <a
              href="https://github.com/Finesssee/Win-CodexBar/pull/6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-accent-cyan)] hover:underline underline-offset-4"
            >
              #6
            </a>
          </strong>{" "}
          — re-saved <code>setup-windows.ps1</code> as{" "}
          <strong>UTF-8 with BOM</strong> (<code>EF BB BF</code>). PowerShell 5.1 now
          correctly interprets the file. No logic changes, no behavior changes, no
          surface-area expansion. The functional diff is three bytes.
        </p>
        <p>
          Wrote up the root cause + verification steps + before/after screenshots in the
          PR description so the maintainer could merge with confidence. Merged{" "}
          <strong>same day</strong>.
        </p>
      </>
    ),
  },
  {
    heading: "why it mattered",
    body: (
      <p>
        First-run scripts are the highest-leverage code in any open-source project — they
        gate every new contributor and user. A 3-byte BOM stops a flood of
        &ldquo;can&apos;t install&rdquo; issues from Windows developers (the majority of
        the Windows dev population still defaults to PowerShell 5.1). Small fix, outsized
        funnel impact.
      </p>
    ),
  },
  {
    heading: "what this demonstrates",
    body: (
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>Root-cause discipline.</strong> The error message pointed at a missing
          string terminator. The real cause was three layers down: shell default,
          file-encoding fallback, glyph misinterpretation.
        </li>
        <li>
          <strong>Minimum-surface fix.</strong> No script logic touched. Easy to review,
          easy to merge, low risk of regression.
        </li>
        <li>
          <strong>Cross-platform empathy.</strong> Most contributors run macOS or Linux
          where this never fires. Windows-default behavior is its own ecosystem; treating
          it as a first-class environment matters.
        </li>
      </ul>
    ),
  },
];
