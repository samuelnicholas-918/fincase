import Link from "next/link";
import { editionMeta } from "@/lib/data";

export const metadata = {
  title: "How this was made · FinCase",
  description: "The build story behind FinCase Raymond Edition.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy">
      <header className="border-b border-navy-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-light"
          >
            FinCase
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">About</p>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-serif text-3xl text-white sm:text-4xl">How this was made</h1>
        <p className="mt-4 text-lg text-white/60">{editionMeta.pitch}</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-white/75">
          <p>
            I built FinCase during a B.Com summer internship at Raymond Limited. There was no
            assigned project — so I scoped one myself around the single most significant financial
            event in Raymond&apos;s recent history: the FY2023–24 demerger that split one listed
            company into three.
          </p>
          <p>
            The data is public: Screener exports for FY17–FY26, plus targeted extraction from annual
            reports (segment tables and MD&A sections) rather than full-document processing of 300+
            page filings. FY24 one-offs are flagged, not smoothed over.
          </p>
          <p>
            The product is deliberately dual-mode. Story Mode teaches the demerger to someone who
            has never read a balance sheet. The Terminal is for someone who already can — professors,
            peers, recruiters — with an AI Analyst grounded only in this dataset.
          </p>
          <p>
            Direction and implementation were AI-assisted; the financial analysis, narrative choices,
            and scope discipline are mine. Edition #1 is Raymond. The typed data layer is the seam
            for Edition #2 — any listed company — without building a multi-company platform now.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/story/1"
            className="rounded border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/20"
          >
            Start the story
          </Link>
          <Link
            href="/terminal"
            className="rounded border border-navy-200 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-gold"
          >
            Open the terminal
          </Link>
        </div>
      </article>
    </main>
  );
}
