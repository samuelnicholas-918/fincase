import type { Chapter } from "@/lib/types";

export const chapters: Chapter[] = [
  {
    id: 1,
    slug: "1",
    title: "What does Raymond sell, and how much?",
    question: "How did Raymond's revenue evolve over a decade?",
    narrative: [
      "Raymond is one of India's oldest diversified business houses — worsted suiting, branded apparel, engineering, and later real estate, all under one listed name.",
      "From FY17 to FY23, revenue grew from ₹5,353 Cr to ₹8,215 Cr. The path was not a straight line: FY21 shows what a pandemic does to a suit-maker's top line.",
      "By FY23 — the last full year before the demerger — Raymond was at peak pre-split revenue, with the lifestyle businesses still carrying most of the weight.",
    ],
    chart: "revenue",
    concept: {
      concept: "Revenue (Top Line)",
      definition:
        "Total income from selling goods and services in a period, before any expenses are deducted.",
      raymondExample:
        "Raymond's revenue rose from ₹5,353 Cr in FY17 to ₹8,215 Cr in FY23, with a sharp COVID dip to ₹3,446 Cr in FY21.",
      formula: "Revenue = Units sold × Price (simplified)",
    },
    quiz: [
      {
        id: "c1q1",
        prompt: "In which year did Raymond's revenue fall the most sharply, and why?",
        options: [
          { id: "a", label: "FY20 — GST disruption" },
          { id: "b", label: "FY21 — COVID impact on discretionary apparel" },
          { id: "c", label: "FY23 — demerger costs" },
          { id: "d", label: "FY18 — input cost spike" },
        ],
        correctId: "b",
        explanation:
          "FY21 revenue fell to ₹3,446 Cr as COVID crushed discretionary apparel spending — suits and formalwear were among the hardest-hit categories.",
      },
      {
        id: "c1q2",
        prompt: "What was Raymond's peak pre-demerger revenue?",
        options: [
          { id: "a", label: "₹5,353 Cr (FY17)" },
          { id: "b", label: "₹6,582 Cr (FY19)" },
          { id: "c", label: "₹8,215 Cr (FY23)" },
          { id: "d", label: "₹6,179 Cr (FY22)" },
        ],
        correctId: "c",
        explanation:
          "FY23 revenue of ₹8,215 Cr was the last full pre-demerger year and the peak of the decade-long trajectory.",
      },
    ],
  },
  {
    id: 2,
    slug: "2",
    title: "Is the company actually making money?",
    question: "How did profitability and operating margins move?",
    narrative: [
      "Revenue alone does not tell you if a company is healthy. Operating profit margin (OPM) shows how much of each rupee of sales becomes operating profit.",
      "Raymond's OPM climbed from 5.7% in FY17 to 14.6% in FY23 — a recovery story as much as a growth one. FY21 was the exception: a net loss of ₹297 Cr and negative OPM.",
      "By the eve of the demerger, margins had more than doubled from the start of the decade, setting up the lifestyle business as a mature, cash-generative core.",
    ],
    chart: "opm",
    concept: {
      concept: "Operating Profit Margin (OPM)",
      definition:
        "Operating profit as a percentage of revenue — how efficiently the core business converts sales into profit before interest and tax.",
      raymondExample:
        "OPM rose from 5.7% (FY17) to 14.6% (FY23), with a COVID trough of −1.7% in FY21.",
      formula: "OPM = Operating Profit ÷ Revenue × 100",
    },
    quiz: [
      {
        id: "c2q1",
        prompt: "What was Raymond's operating margin in FY23?",
        options: [
          { id: "a", label: "5.7%" },
          { id: "b", label: "8.6%" },
          { id: "c", label: "11.4%" },
          { id: "d", label: "14.6%" },
        ],
        correctId: "d",
        explanation:
          "FY23 OPM of 14.6% was the peak of the pre-demerger decade — more than double FY17's 5.7%.",
      },
      {
        id: "c2q2",
        prompt: "In FY21, Raymond reported a net loss of approximately:",
        options: [
          { id: "a", label: "₹26 Cr" },
          { id: "b", label: "₹135 Cr" },
          { id: "c", label: "₹297 Cr" },
          { id: "d", label: "₹529 Cr" },
        ],
        correctId: "c",
        explanation:
          "FY21 net loss was ₹297 Cr, with OPM at −1.7% — the only loss-making year in the FY17–FY23 window.",
      },
    ],
  },
  {
    id: 3,
    slug: "3",
    title: "How does the company manage cash?",
    question: "What do working-capital metrics say about Lifestyle post-demerger?",
    narrative: [
      "Profit on paper is not the same as cash in the bank. Working capital metrics — debtor days, inventory turnover, cash conversion cycle — show how fast cash moves through the business.",
      "After the demerger, Raymond Lifestyle reports these metrics cleanly. Debtor days sit around 50–54 days; inventory turns roughly 3.5–3.8×; the cash conversion cycle is about 100–105 days.",
      "FY24's net profit looks spectacular (₹2,645 Cr) but is inflated by demerger one-offs. Underlying operations are better read from FY25–FY26 margins in the 7–10% range.",
    ],
    chart: "working-capital",
    concept: {
      concept: "Cash Conversion Cycle",
      definition:
        "The number of days between paying suppliers and collecting cash from customers. Shorter is generally better.",
      raymondExample:
        "Raymond Lifestyle's CCC runs roughly 100–105 days post-demerger, with debtor days around 50–54.",
      formula: "CCC = Inventory Days + Debtor Days − Creditor Days",
    },
    quiz: [
      {
        id: "c3q1",
        prompt: "Why should you treat Raymond Lifestyle's FY24 net profit of ₹2,645 Cr with caution?",
        options: [
          { id: "a", label: "It excludes export revenue" },
          { id: "b", label: "It is inflated by demerger-related one-off accounting entries" },
          { id: "c", label: "It is a quarterly figure, not annual" },
          { id: "d", label: "It uses a different currency" },
        ],
        correctId: "b",
        explanation:
          "FY24 is a transition year. Demerger-related accounting entries inflate net profit; FY25–FY26 (₹38 Cr and ₹46 Cr) better reflect underlying profitability.",
      },
      {
        id: "c3q2",
        prompt: "Post-demerger, Raymond Lifestyle's debtor days are approximately:",
        options: [
          { id: "a", label: "20–25 days" },
          { id: "b", label: "50–54 days" },
          { id: "c", label: "90–100 days" },
          { id: "d", label: "150+ days" },
        ],
        correctId: "b",
        explanation:
          "Debtor days range from 50.1 (FY26) to 54.2 (FY25) — customers take roughly seven to eight weeks to pay.",
      },
    ],
  },
  {
    id: 4,
    slug: "4",
    title: "The big bet: why split one company into three?",
    question: "What happened to debt and structure in the FY23–24 demerger?",
    narrative: [
      "In FY2023–24, Raymond did something most companies never do: it split itself into three. If you owned one share of Raymond before the demerger, you ended up holding shares in three separately listed companies.",
      "Why make yourself smaller? Because sometimes smaller is easier to value. When textiles, real estate, and engineering sit inside one company, an investor cannot tell how much of the stock price comes from each piece.",
      "Debt tells the transition story: it spiked to ₹4,181 Cr in FY24 as restructuring liabilities were recognised, then collapsed to ₹740 Cr in FY25 — an ~82% cut. The demerger was a value-visibility exercise, not primarily a debt-reduction one.",
    ],
    chart: "debt",
    concept: {
      concept: "Demerger",
      definition:
        "A corporate action splitting one company's businesses into separate, independently listed entities.",
      raymondExample:
        "Raymond Limited split into Raymond Ltd, Raymond Lifestyle Ltd, and Raymond Realty Ltd in FY2023–24. Debt fell ~82% from the FY24 peak to FY25.",
    },
    quiz: [
      {
        id: "c4q1",
        prompt: "Why might splitting a company into three listed entities increase total shareholder value?",
        options: [
          { id: "a", label: "It automatically reduces tax rates" },
          {
            id: "b",
            label: "Each business can be valued on its own terms with appropriate multiples",
          },
          { id: "c", label: "It guarantees higher revenue" },
          { id: "d", label: "It eliminates all debt overnight" },
        ],
        correctId: "b",
        explanation:
          "Segment-level transparency lets the market apply the right valuation multiple to each business — lifestyle vs realty vs engineering — rather than one blended conglomerate discount.",
      },
      {
        id: "c4q2",
        prompt: "Debt fell by roughly what percentage from the FY24 peak to FY25?",
        options: [
          { id: "a", label: "25%" },
          { id: "b", label: "50%" },
          { id: "c", label: "82%" },
          { id: "d", label: "95%" },
        ],
        correctId: "c",
        explanation:
          "Debt fell from ₹4,181 Cr (FY24) to ₹740 Cr (FY25) — roughly an 82% cut as balance sheets normalised post-split.",
      },
    ],
  },
  {
    id: 5,
    slug: "5",
    title: "Where is the money going next?",
    question: "What does Raymond Realty's trajectory say about the demerger's purpose?",
    narrative: [
      "Raymond Realty is the clearest illustration of why the demerger happened. As a standalone entity, it went from a near-zero, loss-making base to just under ₹3,000 Cr in revenue within two years.",
      "FY24: ₹3.5 Cr revenue, ₹44.3 Cr loss. FY26: ₹2,991 Cr revenue, ₹304.6 Cr net profit. That is roughly 850× revenue growth — growth that would have been invisible buried inside a diversified conglomerate.",
      "The restructuring was not primarily about cutting debt (debt rose in the transition year). It was about making value legible: once separated, Realty could be priced like a real-estate business, not a footnote to a textile stock.",
    ],
    chart: "realty",
    concept: {
      concept: "Value Unlocking",
      definition:
        "The idea that separately valued businesses can be worth more, in aggregate, than one combined entity.",
      raymondExample:
        "Raymond Realty grew from ₹3.5 Cr to ₹2,991 Cr in revenue within two years of separate listing — ~850×.",
    },
    quiz: [
      {
        id: "c5q1",
        prompt: "Which demerged entity showed the most dramatic revenue growth after separation?",
        options: [
          { id: "a", label: "Raymond Limited (engineering)" },
          { id: "b", label: "Raymond Lifestyle Limited" },
          { id: "c", label: "Raymond Realty Limited" },
          { id: "d", label: "All three equally" },
        ],
        correctId: "c",
        explanation:
          "Raymond Realty grew from ₹3.5 Cr (FY24) to ₹2,991 Cr (FY26) — roughly 850× — the standout post-demerger growth story.",
      },
      {
        id: "c5q2",
        prompt: "According to the analysis, the demerger was primarily a:",
        options: [
          { id: "a", label: "Debt-reduction exercise" },
          { id: "b", label: "Value-visibility exercise" },
          { id: "c", label: "Tax-avoidance scheme" },
          { id: "d", label: "Hostile takeover defence" },
        ],
        correctId: "b",
        explanation:
          "Debt actually rose in FY24. The core intent was value visibility — letting the market price each business independently.",
      },
    ],
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export const chapterSlugs = chapters.map((c) => c.slug);
