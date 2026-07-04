"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { editionMeta, headlineStats, raymond } from "@/lib/data";
import { chartTheme } from "@/components/charts/ChartTheme";
import { PageLoader, useAssemblyLoader } from "@/components/loaders/PageLoader";
import { CountUp } from "@/components/ui/CountUp";
import { CommandPalette } from "@/components/terminal/CommandPalette";

export function LandingHero() {
  const loading = useAssemblyLoader("landing");
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    if (loading) return;
    const t = window.setTimeout(() => setDraw(true), 100);
    return () => clearTimeout(t);
  }, [loading]);

  const data = raymond.years.map((y) => ({ year: y.year, revenue: y.revenue }));

  return (
    <>
      <PageLoader active={loading} />
      <main className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-0 top-1/4">
            {draw && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={chartTheme.gold}
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive
                    animationDuration={1800}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
            {editionMeta.name} · Edition #{editionMeta.editionNumber}
          </p>
          <CommandPalette />
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-12">
          <h1 className="max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl">
            In 2024, one of India&apos;s oldest companies split itself in three.
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/65">
            Explore why — through its own numbers.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <EntryCard
              href="/story/1"
              eyebrow="Guided · ~15 min"
              title="Learn the Story"
              description="Five chapters: narrative, charts, concepts, and quizzes built from Raymond's real figures."
            />
            <EntryCard
              href="/terminal"
              eyebrow="Analyst dashboard"
              title="Open the Terminal"
              description="Charts, demerger metrics, methodology, and an AI Analyst grounded in the dataset."
            />
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <StatLink href="/story/1" label="Peak revenue" value={headlineStats.peakRevenue.value} prefix="₹" suffix=" Cr" />
            <StatLink href="/story/4" label="Debt cut" value={headlineStats.debtCut.value} suffix="%" />
            <StatLink href="/story/5" label="Realty growth" value={headlineStats.realtyGrowth.value} suffix="x" />
          </div>
        </div>

        <footer className="relative z-10 flex flex-wrap items-center justify-center gap-4 border-t border-navy-200 py-4">
          <Link
            href="/methodology"
            className="font-mono text-[10px] uppercase tracking-widest text-white/35 hover:text-gold"
          >
            Methodology
          </Link>
          <Link
            href="/about"
            className="font-mono text-[10px] uppercase tracking-widest text-white/35 hover:text-gold"
          >
            How this was made
          </Link>
        </footer>
      </main>
    </>
  );
}

function EntryCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-navy-200 bg-navy-50/40 p-6 transition-colors hover:border-gold/40 hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl text-white group-hover:text-gold-light">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
    </Link>
  );
}

function StatLink({
  href,
  label,
  value,
  prefix = "",
  suffix = "",
}: {
  href: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded border border-navy-200 bg-navy-50/30 px-4 py-3 transition-colors hover:border-gold/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-1 font-mono text-lg text-gold">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </p>
    </Link>
  );
}
