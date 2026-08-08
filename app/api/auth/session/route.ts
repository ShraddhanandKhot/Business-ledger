import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  throw new Error("Supabase env vars not set");
}

function createSupabaseServerClient(request: Request) {
  return createClient(url!, anon!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });
}

export async function GET(request: Request) {
  const supabase = createSupabaseServerClient(request);
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, session: data.session });
}
