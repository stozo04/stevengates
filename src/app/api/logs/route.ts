import { supabase } from '../../../lib/supabase';


export async function POST(req: Request) {
    const body = await req.json();

    const { data, error } = await supabase.from('daily_logs').insert(body);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
}
