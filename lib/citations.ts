import type { TerminalTabId } from "@/lib/types";

/** Map citation labels in AI output to terminal tabs. */
const CITATION_MAP: Record<string, TerminalTabId> = {
  revenue: "revenue",
  "net profit": "revenue",
  profit: "revenue",
  opm: "revenue",
  margin: "revenue",
  "working capital": "working-capital",
  "debtor days": "working-capital",
  inventory: "working-capital",
  ccc: "working-capital",
  debt: "demerger",
  demerger: "demerger",
  realty: "realty",
  lifestyle: "working-capital",
  overview: "overview",
};

export interface CitationMatch {
  full: string;
  label: string;
  year?: string;
  tab: TerminalTabId;
  start: number;
  end: number;
}

const CITATION_RE = /\[([^\]]+?)(?:\s*[·•|]\s*(FY\d{2}))?\]/g;

export function parseCitations(text: string): CitationMatch[] {
  const matches: CitationMatch[] = [];
  let m: RegExpExecArray | null;
  while ((m = CITATION_RE.exec(text)) !== null) {
    const label = m[1].trim();
    const year = m[2];
    const key = label.toLowerCase();
    let tab: TerminalTabId = "overview";
    for (const [k, v] of Object.entries(CITATION_MAP)) {
      if (key.includes(k)) {
        tab = v;
        break;
      }
    }
    matches.push({
      full: m[0],
      label,
      year,
      tab,
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  return matches;
}

export function resolveCitationTab(label: string): TerminalTabId {
  const key = label.toLowerCase();
  for (const [k, v] of Object.entries(CITATION_MAP)) {
    if (key.includes(k)) return v;
  }
  return "overview";
}
