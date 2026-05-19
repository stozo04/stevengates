"use client";

import { useEffect } from "react";

// spec § 0.5 easter egg — console banner for inspecting recruiters.

const BANNER = String.raw`
   _____  __                          ______      __
  / ___/ / /_  ___  _   __ ___  ____  / ____/____ _/ /____  _____
  \__ \ / __/ / _ \| | / // _ \/ __ \/ / __ / __ \/ __/ _ \/ ___/
 ___/ // /_  /  __/| |/ //  __/ / / / /_/ // /_/ / /_/  __(__  )
/____/ \__/  \___/ |___/ \___/_/ /_/\____/ \__,_/\__/\___/____/

  hey recruiter — view-source is encouraged.
  github   github.com/stozo04
  linkedin linkedin.com/in/gates-steven
  email    gates.steven@gmail.com
  built on next 16 + tailwind v4 + shadcn/ui + motion
  type /tools in your URL bar to see the full stack.
`;

export function ConsoleBanner() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only fire once per session.
    const flag = "__sg_banner_seen__";
    if ((window as unknown as Record<string, boolean>)[flag]) return;
    (window as unknown as Record<string, boolean>)[flag] = true;

    const accent = "color:#06b6d4;font-family:ui-monospace,SF Mono,Menlo,monospace;font-size:11px;line-height:1.4";
    // eslint-disable-next-line no-console
    console.log(`%c${BANNER}`, accent);
  }, []);

  return null;
}
