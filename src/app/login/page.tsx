"use client";

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

export default function LoginPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Check initial dark mode preference
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

    // Check system preference
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
    if (!isDark && darkModePreference.matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'consent' // This forces Google to show the consent screen
            }
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* Navigation buttons */}
      <div className="fixed top-4 left-4 z-10">
        <Link href="/" passHref>
          <Button variant="outline">
            ← Home
          </Button>
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-10">
        <Button
          onClick={toggleMode}
          variant="outline"
          className="flex items-center space-x-2"
        >
          {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}