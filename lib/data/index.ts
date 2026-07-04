import { chapters } from "./chapters";
import { glossary } from "./glossary";
import { lifestyle } from "./lifestyle";
import { debtTrajectory, headlineStats, raymond } from "./raymond";
import { realty } from "./realty";
import type { TerminalTab } from "@/lib/types";

export { chapters, getChapter, chapterSlugs } from "./chapters";
export { glossary, getGlossaryTerm } from "./glossary";
export { lifestyle } from "./lifestyle";
export { debtTrajectory, headlineStats, raymond } from "./raymond";
export { realty } from "./realty";

export const terminalTabs: TerminalTab[] = [
  { id: "overview", label: "Overview", storyChapter: 1 },
  { id: "revenue", label: "Revenue", storyChapter: 1 },
  { id: "working-capital", label: "Working Capital", storyChapter: 3 },
  { id: "demerger", label: "Demerger", storyChapter: 4 },
  { id: "realty", label: "Realty", storyChapter: 5 },
  { id: "ai-analyst", label: "AI Analyst" },
  { id: "methodology", label: "Methodology" },
];

/** Compact dataset string injected into the AI Analyst system prompt. */
export function buildAnalystContext(): string {
  const raymondRows = raymond.years
    .map(
      (y) =>
        `${y.year}: revenue=${y.revenue}, netProfit=${y.netProfit}, opm=${y.opm}%${y.debt != null ? `, debt=${y.debt}` : ""}${y.note ? ` (${y.note})` : ""}`,
    )
    .join("\n");

  const lifestyleRows = lifestyle.years
    .map(
      (y) =>
        `${y.year}: revenue=${y.revenue}, netProfit=${y.netProfit}, opm=${y.opm}%, debtorDays=${y.debtorDays}, invTurnover=${y.inventoryTurnover}x, ccc=${y.cashConversionCycle}${y.note ? ` (${y.note})` : ""}`,
    )
    .join("\n");

  const realtyRows = realty.years
    .map(
      (y) =>
        `${y.year}: revenue=${y.revenue}, netProfit=${y.netProfit}${y.note ? ` (${y.note})` : ""}`,
    )
    .join("\n");

  const debtRows = debtTrajectory
    .map((d) => `${d.year}: debt=${d.debt} (${d.label}${d.note ? ` — ${d.note}` : ""})`)
    .join("\n");

  return `
DATASET: Raymond demerger case study (all figures ₹ crore unless noted).

RAYMOND LIMITED (pre-demerger, standalone FY17–FY23):
${raymondRows}

CONSOLIDATED DEBT TRAJECTORY:
${debtRows}

RAYMOND LIFESTYLE LIMITED (post-demerger FY24–FY26):
${lifestyleRows}

RAYMOND REALTY LIMITED (post-demerger FY24–FY26):
${realtyRows}

HEADLINE STATS:
- Peak pre-demerger revenue: ₹${headlineStats.peakRevenue.value} Cr (FY23)
- Debt cut FY24→FY25: ~${headlineStats.debtCut.value}%
- Realty revenue growth FY24→FY26: ~${headlineStats.realtyGrowth.value}x

DEMERGER (FY2023–24): Raymond Limited split into Raymond Ltd (engineering/residual), Raymond Lifestyle Ltd (apparel/textiles), and Raymond Realty Ltd (real estate).

KNOWN LIMITATIONS:
- FY24 transition year contains restructuring one-offs; Lifestyle FY24 net profit is not representative of underlying operations.
- Standalone figures for early post-demerger periods may understate group-level scale.
- Single-company case study — no peer benchmarks.
`.trim();
}

export const editionMeta = {
  name: "FinCase",
  edition: "Raymond Edition",
  editionNumber: 1,
  pitch:
    "FinCase turns a real corporate event into an interactive lesson. Edition #1: Raymond's 2024 demerger — one company splitting into three, told through its own numbers.",
  lastUpdated: "2026-07",
  sources: [
    "Screener.in — Raymond Limited, Raymond Lifestyle Limited, Raymond Realty Limited",
    "Raymond Limited Annual Report FY2022–23",
    "Raymond Lifestyle Limited Annual Report (latest available)",
    "Raymond Realty Limited Annual Report (latest available)",
    "Company disclosures relating to the FY2023–24 Scheme of Arrangement",
  ],
  chapterCount: chapters.length,
  glossaryCount: glossary.length,
} as const;
