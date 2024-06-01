"use server";

import { createServerSupabase } from "@/utils/supabase/server";
import type { Provider } from "@supabase/supabase-js";

export async function signInWithMagicLink(email: string) {
  const supabase = createServerSupabase();

  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function signInWithOauth(provider: Provider) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: process.env["ORIGIN"] + "/auth/callback",
    },
  });

  if (error) {
    return { url: null, error: error.message };
  }

  return { url: data.url, error: null };
}
