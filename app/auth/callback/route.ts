import { createServerSupabase } from "@/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    const message = encodeURIComponent("Invalid authorization code.");
    return NextResponse.redirect(`${origin}/auth/error?message=${message}`);
  }

  const supabase = createServerSupabase();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const message = encodeURIComponent(error.message);
    return NextResponse.redirect(`${origin}/auth/error?message=${message}`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
