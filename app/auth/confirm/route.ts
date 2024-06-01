import { createServerSupabase } from "@/utils/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (!token_hash || !type) {
    const message = encodeURIComponent("Invalid token hash or type.");
    return NextResponse.redirect(`${origin}/auth/error?message=${message}`);
  }

  const supabase = createServerSupabase();

  const { error } = await supabase.auth.verifyOtp({ token_hash, type });

  if (error) {
    const message = encodeURIComponent(error.message);
    return NextResponse.redirect(`${origin}/auth/error?message=${message}`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
