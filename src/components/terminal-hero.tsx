"use client";

import { useEffect, useReducer } from "react";

const LINES: { prompt: string; output: string; accent?: boolean }[] = [
  { prompt: "> who is steven", output: "" },
  { prompt: "", output: "Senior Software Engineer  ·  Dallas, TX" },
  { prompt: "", output: "Building communityarchives.com  ·  $100M+ ARR  ·  50k+ users" },
  { prompt: "", output: "Now building Kayley_Cowork — autonomous AI on Claude Code", accent: true },
  { prompt: "", output: "" },
  { prompt: "> ", output: "" },
];

const TYPE_MS = 24;
const LINE_PAUSE_MS = 220;

type State = {
  lineIndex: number;
  charIndex: number;
  done: boolean;
};

type Action = { type: "tick" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return { lineIndex: 0, charIndex: 0, done: false };

  if (state.done) return state;

  const line = LINES[state.lineIndex];
  const full = (line.prompt + line.output).length;

  if (state.charIndex < full) {
    return { ...state, charIndex: state.charIndex + 1 };
  }

  if (state.lineIndex + 1 >= LINES.length) {
    return { ...state, done: true };
  }

  return { lineIndex: state.lineIndex + 1, charIndex: 0, done: false };
}

export function TerminalHero() {
  const [state, dispatch] = useReducer(reducer, { lineIndex: 0, charIndex: 0, done: false });

  useEffect(() => {
    if (state.done) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // skip animation, just render fully
      const interval = setInterval(() => dispatch({ type: "tick" }), 1);
      return () => clearInterval(interval);
    }
    const atLineEnd = state.charIndex >= (LINES[state.lineIndex].prompt + LINES[state.lineIndex].output).length;
    const delay = atLineEnd ? LINE_PAUSE_MS : TYPE_MS;
    const t = setTimeout(() => dispatch({ type: "tick" }), delay);
    return () => clearTimeout(t);
  }, [state]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        dispatch({ type: "reset" });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      aria-label="terminal pitch"
      className="rounded-lg border border-border/60 bg-card/50 p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed shadow-[0_0_0_1px_rgba(6,182,212,0.06)] backdrop-blur"
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-zinc-500/40" />
        <span className="size-2.5 rounded-full bg-zinc-500/40" />
        <span className="size-2.5 rounded-full bg-zinc-500/40" />
        <span className="ml-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          stevengates.io ~ /pitch
        </span>
      </div>
      <div className="space-y-1">
        {LINES.map((line, i) => {
          const full = (line.prompt + line.output).length;
          const visible =
            i < state.lineIndex
              ? full
              : i === state.lineIndex
                ? state.charIndex
                : 0;
          const promptText = line.prompt.slice(0, Math.min(visible, line.prompt.length));
          const outputText = visible > line.prompt.length ? line.output.slice(0, visible - line.prompt.length) : "";
          const isCurrent = i === state.lineIndex && !state.done;
          const isLast = i === LINES.length - 1 && state.done;
          return (
            <div key={i} className="min-h-[1.5em] whitespace-pre-wrap">
              <span className="text-muted-foreground">{promptText}</span>
              <span className={line.accent ? "text-[color:var(--color-accent-cyan)]" : "text-foreground"}>
                {outputText}
              </span>
              {(isCurrent || isLast) && (
                <span aria-hidden className="terminal-cursor" />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground/60">
        Ctrl+L  ·  clear
      </p>
    </div>
  );
}
