/** Shared types — the Edition #2 seam. Swap data files, keep the shell. */

export type FiscalYear =
  | "FY17"
  | "FY18"
  | "FY19"
  | "FY20"
  | "FY21"
  | "FY22"
  | "FY23"
  | "FY24"
  | "FY25"
  | "FY26";

export interface YearlyFinancials {
  year: FiscalYear;
  revenue: number;
  netProfit: number;
  opm: number;
  debt?: number;
  debtorDays?: number;
  inventoryTurnover?: number;
  cashConversionCycle?: number;
  note?: string;
}

export interface CompanyFinancials {
  id: string;
  name: string;
  ticker?: string;
  description: string;
  currency: "INR_CR";
  years: YearlyFinancials[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  formula?: string;
}

export interface ConceptCard {
  concept: string;
  definition: string;
  raymondExample: string;
  formula?: string;
}

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
}

export type ChartKind = "revenue" | "profit" | "opm" | "debt" | "working-capital" | "realty";

export interface PredictMoment {
  prompt: string;
  min: number;
  max: number;
  actual: number;
  unit: "cr" | "pct" | "days" | "x";
  label: string;
  step?: number;
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  question: string;
  narrative: string[];
  chart: ChartKind;
  predict: PredictMoment;
  concept: ConceptCard;
  quiz: QuizQuestion[];
  scrolly?: boolean;
}

export type TerminalTabId =
  | "overview"
  | "revenue"
  | "working-capital"
  | "demerger"
  | "realty"
  | "ai-analyst"
  | "methodology";

export interface TerminalTab {
  id: TerminalTabId;
  label: string;
  storyChapter?: number;
}

export type CitationTarget =
  | TerminalTabId
  | "working-capital"
  | "debt"
  | "revenue"
  | "realty"
  | "demerger"
  | "overview";
