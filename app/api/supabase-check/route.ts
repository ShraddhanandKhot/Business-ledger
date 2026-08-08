import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  if (!url || !anon) {
    return NextResponse.json({ ok: false, error: 'Supabase env vars not set' }, { status: 500 });
  }

  const supabase = createClient(url, anon);

  try {
    // Try to query a `customers` table if it exists
    const { data, error, status } = await supabase.from('customers').select('*').limit(1);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message, status }, { status: 502 });
    }

    return NextResponse.json({ ok: true, sample: data || [] });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
