"use client";
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOut, Gauge } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from "next/link";

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        // Check dark mode preference
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);

        const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
        if (!isDark && darkModePreference.matches) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, [router, supabase.auth]);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="fixed top-4 left-4 z-10">
            {/* Hamburger Button */}
            <button
                className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {/* Icon for the hamburger */}
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Navigation Menu */}
            <nav
                className={`${menuOpen ? 'block' : 'hidden'
                    } md:flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4`}
            >
                {/* Home Button */}
                <Link href="/" passHref>
                    <Button variant="outline" className="w-full md:w-auto">
                        ← Home
                    </Button>
                </Link>
                {/* Log Dashboard Button */}
                {pathname === '/daily-log' && (
                    <Link href="/logs" passHref>
                        <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
                            <Gauge className="h-4 w-4" />
                            Log Dashboard
                        </Button>
                    </Link>
                )}
                {/* Add Log Button */}
                {pathname === '/logs' && (
                    <Link href="/daily-log" passHref>
                    <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
                      <span>+</span>
                      Add Log
                    </Button>
                  </Link>
                )}
                {/* Sign Out Button */}
                {pathname === '/daily-log' || pathname === '/logs' && (<Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full md:w-auto"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
                )}
                {/* Toggle Mode Button */}
                <Button
                    onClick={toggleMode}
                    variant="outline"
                    className="flex items-center space-x-2 w-full md:w-auto md:fixed md:top-4 md:right-4"
                >
                    {isDarkMode ? (
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    )}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>
            </nav>
        </div>
    );
};

export default NavBar;
