import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="container grid min-h-screen place-content-center place-items-center gap-5 text-center">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-balance text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s
        get you back on track!
      </p>
      <Button asChild>
        <Link href="/">
          <HomeIcon size={16} className="mr-2" />
          Take me home
        </Link>
      </Button>
    </main>
  );
}
