import type { CompanyFinancials } from "@/lib/types";

/**
 * Raymond Realty Limited — post-demerger real estate entity.
 * Grew from ₹3.5 Cr to ₹2,991 Cr revenue in two years (~850x).
 */
export const realty: CompanyFinancials = {
  id: "realty",
  name: "Raymond Realty Limited",
  ticker: "RAYMONDREAL",
  description:
    "Post-demerger real estate entity — monetising land bank (Thane) and expanding project pipeline.",
  currency: "INR_CR",
  years: [
    {
      year: "FY24",
      revenue: 3.5,
      netProfit: -44.3,
      opm: -1265,
      note: "First listed year — near-zero base",
    },
    { year: "FY25", revenue: 565, netProfit: 17.8, opm: 3.2 },
    {
      year: "FY26",
      revenue: 2991,
      netProfit: 304.6,
      opm: 10.2,
      note: "~850x revenue growth from FY24",
    },
  ],
};
