import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  throw new Error("Supabase env vars not set");
}

function createSupabaseServerClient(request: Request) {
  const authorization = request.headers.get("authorization");
  const headers: Record<string, string> = {
    cookie: request.headers.get("cookie") ?? "",
  };

  if (authorization) {
    headers.Authorization = authorization;
  }

  return createClient(url!, anon!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers,
    },
  });
}

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient(request);
  const body = await request.json();
  const { name, phone, address } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const sessionRes = await supabase.auth.getSession();
    if (sessionRes.error || !sessionRes.data.session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = sessionRes.data.session.user.id;

    const { data: businessData, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", userId)
      .single();

    if (businessError) {
      return NextResponse.json({ error: businessError.message }, { status: 500 });
    }

    const businessId = businessData?.id;
    if (!businessId) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("customers")
      .insert({
        business_id: businessId,
        name,
        phone,
        address,
      })
      .select("id, name, phone, address")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
