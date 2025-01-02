"use client";

import DailyLogForm from '@/components/daily-log/DailyLogForm';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, Moon, LogOut } from "lucide-react";

const DailyLogPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        // Check authentication
        const checkAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) throw error;

                if (!session) {
                    router.push('/login');
                    return;
                }

                setIsAuthenticated(true);
            } catch (error) {
                console.error('Auth error:', error);
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

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
        <div>
            {/* Navigation buttons */}
            <div className="fixed top-4 left-4 z-10 flex gap-2">
                <Link href="/" passHref>
                    <Button variant="outline">
                        ← Home
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>

            <div className="fixed top-4 right-4 z-10">
                <Button
                    onClick={toggleMode}
                    variant="outline"
                    className="flex items-center space-x-2"
                >
                    {isDarkMode ?
                        <Sun className="h-[1.2rem] w-[1.2rem]" /> :
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    }
                    <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </Button>
            </div>

            {/* Main content */}
            <div className="p-4">

                <DailyLogForm />
            </div>
        </div>
    );
};

export default DailyLogPage;