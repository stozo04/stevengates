"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          resolvedTheme === "dark" ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      />
      <Sun
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all ${
          resolvedTheme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      />
    </Button>
  );
}
