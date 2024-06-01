"use client";

import { GithubIcon } from "@/components/icons/github-icon";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import type { Provider } from "@supabase/supabase-js";
import { LoaderIcon, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, type PropsWithChildren, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { signInWithMagicLink, signInWithOauth } from "./actions";

export function SignInForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          id="email"
        />
      </div>
      <MagicLinkButton />
      <div className="relative text-center">
        <span className="-transform-y-1/2 absolute left-0 right-0 top-1/2 -z-10 h-[1px] bg-border" />
        <span className="bg-background px-3 text-sm text-muted-foreground">
          or
        </span>
      </div>
      <div className="space-y-2">
        <OauthButton provider="google" icon={<GoogleIcon className="mr-2" />}>
          Continue with Google
        </OauthButton>
        <OauthButton
          provider="github"
          icon={<GithubIcon className="mr-2 -translate-y-[1px]" />}
        >
          Continue with GitHub
        </OauthButton>
      </div>
    </form>
  );
}

function MagicLinkButton() {
  const { pending: isFormPending } = useFormStatus();

  const { toast } = useToast();

  const [, action, isSelfPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const email = formData.get("email")?.toString();

      if (!email) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Please enter your email address",
        });
        return;
      }

      const { error } = await signInWithMagicLink(email);

      if (error !== null) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: error,
        });
        return;
      }

      toast({
        title: "Check your inbox",
        description: `A magic link has been sent to ${email}. Please check your inbox and follow the link inside to complete the sign-in process.`,
      });
    },
    null,
  );

  return (
    <Button
      formAction={action}
      disabled={isFormPending || isSelfPending}
      className="w-full"
    >
      {isSelfPending ? (
        <LoaderIcon size={16} className="mr-2 animate-spin" />
      ) : (
        <LogInIcon size={16} className="mr-2" />
      )}
      Sign in
    </Button>
  );
}

type OauthButtonProps = PropsWithChildren<{
  provider: Provider;
  icon: ReactNode;
}>;

function OauthButton({ provider, icon, children }: OauthButtonProps) {
  const { pending: isFormPending } = useFormStatus();

  const { toast } = useToast();

  const router = useRouter();

  const [, action, isSelfPending] = useActionState(async (_: unknown) => {
    const { url, error } = await signInWithOauth(provider);

    if (error !== null) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error,
      });
      return;
    }

    router.push(url);
  }, null);

  return (
    <Button
      variant="outline"
      formAction={action}
      disabled={isFormPending || isSelfPending}
      className="w-full"
    >
      {isSelfPending ? (
        <LoaderIcon size={16} className="mr-2 animate-spin" />
      ) : (
        icon
      )}
      {children}
    </Button>
  );
}
