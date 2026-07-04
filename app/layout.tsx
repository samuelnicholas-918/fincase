import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Libre_Baskerville, Space_Mono } from "next/font/google";
import { editionMeta } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${editionMeta.name}: ${editionMeta.edition}`,
  description: editionMeta.pitch,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${libreBaskerville.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
