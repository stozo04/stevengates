"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Listens for the Konami code and routes to /dev when unlocked.
// spec § 0.5 easter egg.
export function KonamiListener() {
  const router = useRouter();
  const buf = useRef<string[]>([]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.current = [...buf.current, key].slice(-SEQUENCE.length);
      if (buf.current.length === SEQUENCE.length && buf.current.every((k, i) => k === SEQUENCE[i])) {
        buf.current = [];
        router.push("/dev");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
