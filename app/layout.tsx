import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fincase.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${editionMeta.name}: ${editionMeta.edition}`,
    template: `%s · ${editionMeta.name}`,
  },
  description: editionMeta.pitch,
  openGraph: {
    title: `${editionMeta.name}: ${editionMeta.edition}`,
    description: editionMeta.pitch,
    type: "website",
    url: siteUrl,
    siteName: editionMeta.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${editionMeta.name}: ${editionMeta.edition}`,
    description: editionMeta.pitch,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${libreBaskerville.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
