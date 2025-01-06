"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle/page";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { LogOut, Gauge, Menu, Home as HomeIcon } from "lucide-react";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 bg-white dark:bg-gray-950">
      {/* Mobile Menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-4 py-6">
            <Link href="/" prefetch={false} className="text-lg font-semibold">
              Home
            </Link>
            {pathname === "/daily-log" && (
              <Link href="/logs" prefetch={false} className="text-lg font-semibold">
                Log Dashboard
              </Link>
            )}
            {pathname === "/logs" && (
              <Link href="/daily-log" prefetch={false} className="text-lg font-semibold">
                Add Log
              </Link>
            )}
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2 text-lg"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <Link href="/" prefetch={false} className="hidden lg:flex items-center">
        <HomeIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="ml-auto hidden lg:flex items-center gap-6">
        {pathname === "/daily-log" && (
          <Link
            href="/logs"
            prefetch={false}
            className="group inline-flex h-9 items-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
          >
            Log Dashboard
          </Link>
        )}
        {pathname === "/logs" && (
          <Link
            href="/daily-log"
            prefetch={false}
            className="group inline-flex h-9 items-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
          >
            Add Log
          </Link>
        )}
        {pathname === "/logs" || pathname === "/daily-log" && (<Button
          variant="outline"
          onClick={handleSignOut}
          className="flex items-center gap-2 h-9 text-sm font-medium"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
         )}
        {/* Mode Toggle */}
        <ModeToggle />
      </nav>
    </header>
  );
}
 