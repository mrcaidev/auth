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
    <html lang="en-US" className={fontSans.variable}>
      <body>{children}</body>
    </html>
  );
}
