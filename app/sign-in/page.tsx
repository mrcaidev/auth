import { createServerSupabase } from "@/utils/supabase/server";
import { ChevronLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import background from "./background.webp";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Authenticate once, access everywhere.",
};

export default async function SignInPage() {
  const supabase = createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative grid place-items-center">
        <div className="absolute left-8 top-12 sm:left-12">
          <Link href="/" className="group flex items-center">
            <ChevronLeftIcon
              size={16}
              className="mr-2 transition-transform group-hover:-translate-x-1"
            />
            Home
          </Link>
        </div>
        <div className="w-80 sm:w-[360px]">
          <div className="mb-4 space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-balance text-muted-foreground">
              Authenticate once, access everywhere
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={background}
          alt="Beach and ocean during daytime"
          fill
          sizes="(max-width: 1024px) 0, 50vw"
          priority
          placeholder="blur"
          className="object-cover"
        />
      </div>
    </div>
  );
}
