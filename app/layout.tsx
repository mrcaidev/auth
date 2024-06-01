import { ThemeInitializer } from "@/components/theme-initializer";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import type { PropsWithChildren } from "react";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Auth",
  description: "My authorization server",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en-US" suppressHydrationWarning className={fontSans.variable}>
      <head>
        <ThemeInitializer />
      </head>
      <body>{children}</body>
    </html>
  );
}
