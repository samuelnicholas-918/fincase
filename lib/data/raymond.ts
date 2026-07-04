import type { CompanyFinancials } from "@/lib/types";

/** Pre-demerger Raymond Limited (standalone), FY17–FY23. Source: Screener.in + AR FY23. */
export const raymond: CompanyFinancials = {
  id: "raymond",
  name: "Raymond Limited",
  ticker: "RAYMOND",
  description:
    "Pre-demerger Raymond Limited — textiles, branded apparel, engineering, and real estate under one listed entity.",
  currency: "INR_CR",
  years: [
    { year: "FY17", revenue: 5353, netProfit: 26, opm: 5.7 },
    { year: "FY18", revenue: 5906, netProfit: 135, opm: 7.2 },
    { year: "FY19", revenue: 6582, netProfit: 168, opm: 8.6 },
    { year: "FY20", revenue: 6482, netProfit: 196, opm: 8.0 },
    {
      year: "FY21",
      revenue: 3446,
      netProfit: -297,
      opm: -1.7,
      note: "COVID impact on discretionary apparel spending",
    },
    { year: "FY22", revenue: 6179, netProfit: 260, opm: 11.4 },
    {
      year: "FY23",
      revenue: 8215,
      netProfit: 529,
      opm: 14.6,
      debt: 2529,
      note: "Last full pre-demerger year",
    },
  ],
};

/** Consolidated debt across the demerger transition (₹ Cr). */
export const debtTrajectory = [
  { year: "FY23" as const, debt: 2529, label: "Pre-demerger" },
  {
    year: "FY24" as const,
    debt: 4181,
    label: "Demerger year",
    note: "Restructuring-related liabilities recognised",
  },
  {
    year: "FY25" as const,
    debt: 740,
    label: "Normalised",
    note: "~82% debt cut from FY24 peak",
  },
  { year: "FY26" as const, debt: 1055, label: "Post-normalisation" },
];

/** Headline stats for landing / overview. */
export const headlineStats = {
  peakRevenue: { value: 8215, label: "FY23 revenue", unit: "Cr" },
  debtCut: { value: 82, label: "Debt cut FY24→FY25", unit: "%" },
  realtyGrowth: { value: 850, label: "Realty revenue growth FY24→FY26", unit: "x" },
} as const;
