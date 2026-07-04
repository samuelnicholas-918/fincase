"use client";

import type { ChartKind } from "@/lib/types";
import { DebtChart } from "./DebtChart";
import { OpmChart } from "./OpmChart";
import { ProfitChart } from "./ProfitChart";
import { RealtyChart } from "./RealtyChart";
import { RevenueChart } from "./RevenueChart";
import { WorkingCapitalChart } from "./WorkingCapitalChart";

const chartLabels: Record<ChartKind, string> = {
  revenue: "Revenue (₹ Cr) — Raymond Limited, pre-demerger",
  profit: "Net Profit (₹ Cr) — Raymond Limited, pre-demerger",
  opm: "Operating Profit Margin (%) — Raymond Limited",
  debt: "Consolidated Debt (₹ Cr) — demerger transition",
  "working-capital": "Working Capital — Raymond Lifestyle post-demerger",
  realty: "Revenue (₹ Cr) — Raymond Realty post-demerger",
};

export function ChapterChart({ kind }: { kind: ChartKind }) {
  return (
    <div className="rounded-lg border border-navy-200 bg-navy-50/60 p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-gold/80">
        {chartLabels[kind]}
      </p>
      {kind === "revenue" && <RevenueChart />}
      {kind === "profit" && <ProfitChart />}
      {kind === "opm" && <OpmChart />}
      {kind === "debt" && <DebtChart />}
      {kind === "working-capital" && <WorkingCapitalChart />}
      {kind === "realty" && <RealtyChart />}
    </div>
  );
}
