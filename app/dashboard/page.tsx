import { Button } from "@/components/ui/button";
import { createServerSupabase } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <p>{JSON.stringify(user)}</p>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </main>
  );
}

async function signOut() {
  "use server";

  const supabase = createServerSupabase();
  await supabase.auth.signOut();

  redirect("/sign-in");
}
