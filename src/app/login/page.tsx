"use client";

import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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