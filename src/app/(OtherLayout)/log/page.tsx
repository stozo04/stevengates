import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LogForm from './LogForm';

export default async function LogPage() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('user:', user);
    if (error || !user) {
        redirect('/login');
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="max-w-2xl mx-auto">
                <LogForm userId={user.id} />
            </section>
        </div>
    );
}