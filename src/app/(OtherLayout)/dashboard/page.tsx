import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Dashboard from './Dashboard';

export default async function LogPage() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    // Check if user is authenticated
    if (error || !user) {
        redirect('/login');
    }

    // Check for specific email address from environment variable
    const allowedEmail = process.env.NEXT_PUBLIC_ALLOWED_EMAIL;
    if (!allowedEmail || user.email !== allowedEmail) {
        redirect('/unauthorized');
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="max-w-2xl mx-auto">
                <Dashboard />
            </section>
        </div>
    );
}