// source: openclaw/openclaw PR #30978 — Steven, author_association: CONTRIBUTOR
// source: 2024–2026 daily-driver usage of OpenClaw on Windows 11 before migrating to Claude Code

export const OPENCLAW_SECTIONS = [
  {
    heading: "the project",
    body: (
      <p>
        <strong>OpenClaw</strong> {" "} is an open-source agent orchestration framework — one of
        the earliest working takes on multi-agent task execution, shipped before
        &ldquo;agent&rdquo; was a buzzword. I picked it up as a daily driver in 2024 and
        ran it locally on Windows 11 while building the precursors to my current Kayley
        Cowork stack.
      </p>
    ),
  },
  {
    heading: "what i noticed",
    body: (
      <p>
        Heavy daily use surfaced a debug-UX gap. The{" "}
        <code>Settings → Debug → Event Log</code> panel rendered event payloads inside the
        same two-column layout the rest of the debug views used. Payloads are high-signal
        JSON — exactly what you need when something&apos;s broken — and they were getting
        squished into a narrow right-hand column. Readability dropped right at the moments
        I needed it most.
      </p>
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
              href="https://github.com/openclaw/openclaw/pull/30978"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-accent-cyan)] hover:underline underline-offset-4"
            >
              #30978
            </a>
          </strong>{" "}
          — added Event Log–specific class names in <code>ui/src/ui/views/debug.ts</code>{" "}
          and a scoped CSS override block in <code>ui/src/styles/components.css</code> so
          Event Log entries render as single-column cards with full-width payload blocks.
        </p>
        <ul className="ml-6 list-disc space-y-1">
          <li>
            <strong>Scope:</strong> UI / DX only — no gateway, no RPC contract, no event
            data shape touched.
          </li>
          <li>
            <strong>Risk surface:</strong> contained to the Event Log view. Empty-state
            (&ldquo;No events yet&rdquo;) unchanged.
          </li>
          <li>
            <strong>Verification:</strong> repro&apos;d locally against real incoming
            events, hard refresh + gateway restart, before/after screenshots attached to
            the PR.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "outcome",
    body: (
      <p>
        Reviewed and accepted by the OpenClaw maintainers. GitHub labels me as{" "}
        <strong>CONTRIBUTOR</strong> on the repo. Two +1 reactions on the PR. The Event
        Log surface in the control UI now reads cleanly at full width.
      </p>
    ),
  },
  {
    heading: "why it mattered",
    body: (
      <p>
        Debug tooling is the kind of thing maintainers rarely have time to polish — it
        works &ldquo;well enough&rdquo; for them because they wrote it. For a daily user
        hitting the same surface twenty times a day, those rough edges compound. Small UX
        patches like this are how a project goes from <em>usable</em> to{" "}
        <em>trustworthy</em>.
      </p>
    ),
  },
  {
    heading: "stack",
    body: (
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>TypeScript</strong> control UI built on a lightweight DOM-string
          template renderer (not React).
        </li>
        <li>
          <strong>Scoped CSS</strong> via co-located class names — no Tailwind, no
          CSS-in-JS, just disciplined naming.
        </li>
        <li>
          <strong>Windows 11</strong> local install of OpenClaw used as the repro
          environment.
        </li>
      </ul>
    ),
  },
];
