import type { GlossaryTerm } from "@/lib/types";

export const glossary: GlossaryTerm[] = [
  {
    term: "OPM",
    definition:
      "Operating Profit Margin — operating profit as a percentage of revenue. Shows how much of each rupee of sales becomes operating profit before interest and tax.",
    formula: "OPM = Operating Profit ÷ Revenue × 100",
  },
  {
    term: "DEBTOR DAYS",
    definition:
      "Average number of days it takes customers to pay invoices. Higher debtor days mean more cash is tied up in receivables.",
    formula: "Debtor Days = (Trade Receivables ÷ Revenue) × 365",
  },
  {
    term: "INVENTORY TURNOVER",
    definition:
      "How many times inventory is sold and replaced in a year. Higher turnover generally means inventory is moving efficiently.",
    formula: "Inventory Turnover = Cost of Goods Sold ÷ Average Inventory",
  },
  {
    term: "CASH CONVERSION CYCLE",
    definition:
      "Days between paying suppliers and collecting cash from customers. A shorter cycle means cash is freed up faster.",
    formula: "CCC = Inventory Days + Debtor Days − Creditor Days",
  },
  {
    term: "DEMERGER",
    definition:
      "A corporate action that splits one company's businesses into separate, independently listed entities so each can be valued and managed on its own terms.",
  },
  {
    term: "VALUE UNLOCKING",
    definition:
      "The idea that separately valued businesses can be worth more, in aggregate, than one combined conglomerate — because the market can apply the right multiple to each piece.",
  },
  {
    term: "NET PROFIT",
    definition:
      "Profit left after all expenses, interest, and tax. The bottom line of the profit and loss statement.",
  },
  {
    term: "REVENUE",
    definition:
      "Total income from selling goods and services in a period, before expenses. Also called top-line or sales.",
  },
];

export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
  const key = term.trim().toUpperCase();
  return glossary.find((g) => g.term.toUpperCase() === key);
}
