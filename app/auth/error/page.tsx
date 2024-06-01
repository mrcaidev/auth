import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: {
    message?: string;
  };
};

export default function AuthErrorPage({
  searchParams: { message = "Unknown error" },
}: Props) {
  return (
    <div className="container grid min-h-screen place-content-center place-items-center gap-5 text-center">
      <h1 className="text-4xl font-bold">Authorization Error</h1>
      <p className="text-balance text-muted-foreground">{message}</p>
      <Button asChild>
        <Link href="/">
          <HomeIcon size={16} className="mr-2" />
          Take me home
        </Link>
      </Button>
    </div>
  );
}
