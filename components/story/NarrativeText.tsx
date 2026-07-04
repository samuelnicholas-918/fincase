"use client";

import { glossary } from "@/lib/data";
import { GlossaryTerm } from "./GlossaryTerm";

const TERMS = glossary
  .map((g) => g.term)
  .sort((a, b) => b.length - a.length);

export function NarrativeText({ text }: { text: string }) {
  const pattern = new RegExp(`\\b(${TERMS.map(escapeRegExp).join("|")})\\b`, "gi");
  const parts: Array<string | { term: string }> = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push({ term: match[1].toUpperCase() });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <p className="text-base leading-relaxed text-white/80">
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <GlossaryTerm key={`${part.term}-${i}`} term={part.term} />
        ),
      )}
    </p>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
