"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ChapterChart } from "@/components/charts/ChapterChart";
import { debtTrajectory, headlineStats, lifestyle, raymond, realty, terminalTabs } from "@/lib/data";
import type { TerminalTabId } from "@/lib/types";
import { formatCr, formatPct, cn } from "@/lib/utils";
import { AnalystChat } from "./AnalystChat";

function OverviewPanel() {
  const fy23 = raymond.years.find((y) => y.year === "FY23");
  const fy21 = raymond.years.find((y) => y.year === "FY21");

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatChip
          label="Peak revenue"
          value={formatCr(headlineStats.peakRevenue.value)}
          hint="FY23 pre-demerger"
        />
        <StatChip
          label="Debt cut"
          value={`${headlineStats.debtCut.value}%`}
          hint="FY24 peak → FY25"
        />
        <StatChip
          label="Realty growth"
          value={`${headlineStats.realtyGrowth.value}x`}
          hint="FY24 → FY26 revenue"
        />
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
      <div className="grid gap-3 sm:grid-cols-3">
        {debtTrajectory.map((d) => (
          <StatChip
            key={d.year}
            label={d.year}
            value={formatCr(d.debt)}
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
        <StatChip label="FY24 revenue" value={formatCr(first.revenue, 1)} hint="Near-zero base" />
        <StatChip
          label="FY26 revenue"
          value={formatCr(last.revenue)}
          hint={`Net profit ${formatCr(last.netProfit, 1)}`}
          tone="up"
        />
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
        <StatChip
          label="Debtor days"
          value={`${latest.debtorDays}`}
          hint={latest.year}
        />
        <StatChip
          label="Inv. turnover"
          value={`${latest.inventoryTurnover}x`}
          hint={latest.year}
        />
        <StatChip
          label="OPM"
          value={formatPct(latest.opm)}
          hint="Normalised range 7–10%"
        />
      </div>
      <ChapterChart kind="working-capital" />
      <p className="text-sm leading-relaxed text-white/65">
        Lifestyle FY24 net profit (₹2,645 Cr) includes demerger one-offs. Read underlying operations
        from FY25–FY26.
      </p>
    </div>
  );
}

function StatChip({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "up" | "down";
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
        {value}
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

export function TabShell() {
  const [active, setActive] = useState<TerminalTabId>("overview");
  const activeTab = terminalTabs.find((t) => t.id === active);

  return (
    <div className="min-h-screen bg-navy">
      <header className="border-b border-navy-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-light"
          >
            FinCase
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            The Terminal
          </p>
          <Link
            href="/story/1"
            className="font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-gold"
          >
            Story
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-serif text-3xl text-white">Analyst Terminal</h1>
        <p className="mt-2 text-sm text-white/55">
          Raymond FY17–FY26 — pre- and post-demerger figures in one place.
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
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
                active === tab.id
                  ? "bg-gold/15 text-gold"
                  : "text-white/50 hover:text-gold/80",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab?.storyChapter && (
          <Link
            href={`/story/${activeTab.storyChapter}`}
            className="mt-4 inline-flex font-mono text-[11px] text-gold/80 hover:text-gold"
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
          {active === "ai-analyst" && <AnalystChat />}
        </div>
      </div>
    </div>
  );
}
