"use client";

import type { TerminalTabId } from "@/lib/types";
import { resolveCitationTab } from "@/lib/citations";

export function CitationChip({
  label,
  year,
  onNavigate,
}: {
  label: string;
  year?: string;
  onNavigate: (tab: TerminalTabId) => void;
}) {
  const tab = resolveCitationTab(label);

  return (
    <button
      type="button"
      onClick={() => onNavigate(tab)}
      className="mx-0.5 inline-flex items-center rounded border border-gold/40 bg-gold/10 px-1.5 py-0.5 font-mono text-[10px] text-gold hover:bg-gold/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      title={`Open ${tab} tab`}
    >
      [{label}
      {year ? ` · ${year}` : ""}]
    </button>
  );
}

export function CitedText({
  text,
  onNavigate,
}: {
  text: string;
  onNavigate: (tab: TerminalTabId) => void;
}) {
  const parts: Array<string | { label: string; year?: string }> = [];
  const re = /\[([^\]]+?)(?:\s*[·•|]\s*(FY\d{2}))?\]/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push({ label: match[1].trim(), year: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <CitationChip key={i} label={part.label} year={part.year} onNavigate={onNavigate} />
        ),
      )}
    </span>
  );
}
