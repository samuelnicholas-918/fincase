"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ChapterChart } from "@/components/charts/ChapterChart";
import { PageLoader, useAssemblyLoader } from "@/components/loaders/PageLoader";
import {
  debtTrajectory,
  editionMeta,
  headlineStats,
  lifestyle,
  raymond,
  realty,
  terminalTabs,
} from "@/lib/data";
import type { TerminalTabId } from "@/lib/types";
import { formatCr, formatPct, cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/CountUp";
import { CommandPalette } from "./CommandPalette";

const AnalystChat = dynamic(() => import("./AnalystChat").then((m) => m.AnalystChat), {
  ssr: false,
  loading: () => (
    <div className="flex h-[28rem] items-center justify-center rounded-lg border border-navy-200 font-mono text-xs text-gold/70">
      LOADING ANALYST…
    </div>
  ),
});

function OverviewPanel() {
  const fy23 = raymond.years.find((y) => y.year === "FY23");
  const fy21 = raymond.years.find((y) => y.year === "FY21");

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatChip label="Peak revenue" value={headlineStats.peakRevenue.value} prefix="₹" suffix=" Cr" hint="FY23 pre-demerger" />
        <StatChip label="Debt cut" value={headlineStats.debtCut.value} suffix="%" hint="FY24 peak → FY25" />
        <StatChip label="Realty growth" value={headlineStats.realtyGrowth.value} suffix="x" hint="FY24 → FY26 revenue" tone="up" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniCard title="FY23 snapshot">
          <p>Revenue {fy23 ? formatCr(fy23.revenue) : "—"}</p>
          <p>Net profit {fy23 ? formatCr(fy23.netProfit) : "—"}</p>
          <p>OPM {fy23 ? formatPct(fy23.opm) : "—"}</p>
        </MiniCard>
        <MiniCard title="FY21 COVID trough">
          <p>Revenue {fy21 ? formatCr(fy21.revenue) : "—"}</p>
          <p>Net profit {fy21 ? formatCr(fy21.netProfit) : "—"}</p>
          <p>OPM {fy21 ? formatPct(fy21.opm) : "—"}</p>
        </MiniCard>
      </div>
      <ChapterChart kind="revenue" />
    </div>
  );
}

function DemergerPanel() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {debtTrajectory.map((d) => (
          <StatChip
            key={d.year}
            label={d.year}
            value={d.debt}
            prefix="₹"
            suffix=" Cr"
            hint={d.label}
            tone={d.year === "FY24" ? "down" : d.year === "FY25" ? "up" : "default"}
          />
        ))}
      </div>
      <ChapterChart kind="debt" />
      <p className="text-sm leading-relaxed text-white/65">
        FY24 debt spike reflects restructuring-related liabilities. FY25 normalisation (−82% from
        peak) is the balance-sheet signature of the demerger settling.
      </p>
    </div>
  );
}

function RealtyPanel() {
  const first = realty.years[0];
  const last = realty.years[realty.years.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <StatChip label="FY24 revenue" value={first.revenue} prefix="₹" suffix=" Cr" decimals={1} hint="Near-zero base" />
        <StatChip label="FY26 revenue" value={last.revenue} prefix="₹" suffix=" Cr" hint={`Net profit ${formatCr(last.netProfit, 1)}`} tone="up" />
      </div>
      <ChapterChart kind="realty" />
    </div>
  );
}

function WorkingCapitalPanel() {
  const latest = lifestyle.years[lifestyle.years.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatChip label="Debtor days" value={latest.debtorDays ?? 0} decimals={1} hint={latest.year} />
        <StatChip label="Inv. turnover" value={latest.inventoryTurnover ?? 0} decimals={2} suffix="x" hint={latest.year} />
        <StatChip label="OPM" value={latest.opm} decimals={1} suffix="%" hint="Normalised range 7–10%" />
      </div>
      <ChapterChart kind="working-capital" />
      <p className="text-sm leading-relaxed text-white/65">
        Lifestyle FY24 net profit (₹2,645 Cr) includes demerger one-offs. Read underlying operations
        from FY25–FY26.
      </p>
    </div>
  );
}

function MethodologyPanel() {
  return (
    <article className="space-y-8 text-sm leading-relaxed text-white/75">
      <div>
        <h2 className="font-serif text-xl text-gold">Data sources</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {editionMeta.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl text-gold">Extraction approach</h2>
        <p className="mt-3">
          Ten-year standalone history for Raymond Limited (FY17–FY23) via Screener.in. Post-demerger
          Lifestyle and Realty (FY24–FY26) from the same source, supplemented by targeted annual-report
          extraction (segment tables, MD&A) rather than full 300+ page processing.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-gold">Known limitations</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>FY24 transition year contains restructuring one-offs; Lifestyle FY24 net profit is not representative.</li>
          <li>Early post-demerger periods use standalone figures, which can understate group-level scale.</li>
          <li>Single-company case study — no peer benchmarks.</li>
        </ul>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        Last updated {editionMeta.lastUpdated}
      </p>
    </article>
  );
}

function StatChip({
  label,
  value,
  hint,
  tone = "default",
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  label: string;
  value: number;
  hint: string;
  tone?: "default" | "up" | "down";
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="rounded-lg border border-navy-200 bg-navy-50/50 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p
        className={cn(
          "mt-1 font-mono text-xl",
          tone === "up" && "text-up",
          tone === "down" && "text-down",
          tone === "default" && "text-gold",
        )}
      >
        <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
      </p>
      <p className="mt-1 text-xs text-white/45">{hint}</p>
    </div>
  );
}

function MiniCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-navy-200 bg-navy-50/40 p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">{title}</p>
      <div className="mt-2 space-y-1 font-mono text-sm text-white/75">{children}</div>
    </div>
  );
}

const VALID_TABS = new Set(terminalTabs.map((t) => t.id));

export function TabShell() {
  const searchParams = useSearchParams();
  const loading = useAssemblyLoader("terminal");
  const initial = searchParams.get("tab") as TerminalTabId | null;
  const [active, setActive] = useState<TerminalTabId>(
    initial && VALID_TABS.has(initial) ? initial : "overview",
  );
  const activeTab = terminalTabs.find((t) => t.id === active);

  useEffect(() => {
    const tab = searchParams.get("tab") as TerminalTabId | null;
    if (tab && VALID_TABS.has(tab)) setActive(tab);
  }, [searchParams]);

  function selectTab(tab: TerminalTabId) {
    setActive(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  }

  return (
    <div className="min-h-screen bg-navy">
      <PageLoader active={loading} />

      <header className="sticky top-0 z-40 border-b border-navy-200/80 bg-navy/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            FinCase
          </Link>
          <div className="flex items-center gap-3">
            <CommandPalette onSelectTab={selectTab} />
            <p className="hidden font-mono text-[10px] uppercase tracking-widest text-white/40 sm:block">
              The Terminal
            </p>
          </div>
          <Link
            href="/story/1"
            className="font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            Story
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-serif text-3xl text-white">Analyst Terminal</h1>
        <p className="mt-2 text-sm text-white/55">
          Raymond FY17–FY26 — pre- and post-demerger figures in one place. Press{" "}
          <kbd className="rounded border border-navy-200 px-1 font-mono text-[10px]">⌘K</kbd> to jump.
        </p>

        <div
          role="tablist"
          aria-label="Terminal views"
          className="mt-6 flex flex-wrap gap-2 border-b border-navy-200 pb-3"
        >
          {terminalTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => selectTab(tab.id)}
              className={cn(
                "rounded px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                active === tab.id ? "bg-gold/15 text-gold" : "text-white/50 hover:text-gold/80",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab?.storyChapter && (
          <Link
            href={`/story/${activeTab.storyChapter}`}
            className="mt-4 inline-flex font-mono text-[11px] text-gold/80 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            → told in Chapter {activeTab.storyChapter}
          </Link>
        )}

        <div className="mt-6" role="tabpanel">
          {active === "overview" && <OverviewPanel />}
          {active === "revenue" && <ChapterChart kind="revenue" />}
          {active === "working-capital" && <WorkingCapitalPanel />}
          {active === "demerger" && <DemergerPanel />}
          {active === "realty" && <RealtyPanel />}
          {active === "ai-analyst" && <AnalystChat onNavigate={selectTab} />}
          {active === "methodology" && <MethodologyPanel />}
        </div>
      </div>
    </div>
  );
}
