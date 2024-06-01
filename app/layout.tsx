import { ThemeInitializer } from "@/components/theme-initializer";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import type { PropsWithChildren } from "react";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auth.mrcai.dev"),
  title: {
    template: "%s | Auth",
    default: "Auth",
  },
  description:
    "Yuwang Cai's authentication and authorization server. Authenticate once, access everywhere.",
  generator: "Next.js",
  authors: [{ name: "Yuwang Cai", url: "https://mrcai.dev" }],
  creator: "Yuwang Cai",
  publisher: "Yuwang Cai",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en-US" suppressHydrationWarning className={fontSans.variable}>
      <head>
        <ThemeInitializer />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
