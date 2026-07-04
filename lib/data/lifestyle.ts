import type { CompanyFinancials } from "@/lib/types";

/**
 * Raymond Lifestyle Limited — post-demerger branded apparel, textiles, garmenting.
 * FY24 net profit is inflated by one-off demerger accounting entries.
 */
export const lifestyle: CompanyFinancials = {
  id: "lifestyle",
  name: "Raymond Lifestyle Limited",
  ticker: "RAYMONDLSL",
  description:
    "Post-demerger lifestyle entity — branded apparel, textiles, and garmenting.",
  currency: "INR_CR",
  years: [
    {
      year: "FY24",
      revenue: 6535,
      netProfit: 2645,
      opm: 14.3,
      debtorDays: 51.6,
      inventoryTurnover: 3.77,
      cashConversionCycle: 100,
      note: "Transition year — net profit inflated by demerger one-offs",
    },
    {
      year: "FY25",
      revenue: 6177,
      netProfit: 38,
      opm: 7.6,
      debtorDays: 54.2,
      inventoryTurnover: 3.52,
      cashConversionCycle: 105,
    },
    {
      year: "FY26",
      revenue: 6888,
      netProfit: 46,
      opm: 9.6,
      debtorDays: 50.1,
      inventoryTurnover: 3.65,
      cashConversionCycle: 102,
    },
  ],
};
