"use client";

import { useState } from "react";
import { getGlossaryTerm } from "@/lib/data";
import { cn } from "@/lib/utils";

export function GlossaryTerm({ term }: { term: string }) {
  const entry = getGlossaryTerm(term);
  const [open, setOpen] = useState(false);

  if (!entry) {
    return <span className="font-mono text-[0.85em] uppercase tracking-wide text-gold/90">{term}</span>;
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className={cn(
          "font-mono text-[0.85em] uppercase tracking-wide text-gold underline decoration-gold/30 underline-offset-2",
          "hover:decoration-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        )}
        aria-expanded={open}
        aria-describedby={open ? `glossary-${entry.term}` : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
      >
        {entry.term}
      </button>
      {open && (
        <span
          id={`glossary-${entry.term}`}
          role="tooltip"
          className="absolute left-0 top-full z-20 mt-2 w-64 rounded border border-gold/40 bg-navy-50 p-3 shadow-xl"
        >
          <span className="block font-mono text-[10px] uppercase tracking-widest text-gold">
            {entry.term}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-white/80 normal-case tracking-normal font-sans">
            {entry.definition}
          </span>
          {entry.formula && (
            <span className="mt-2 block font-mono text-[10px] text-gold/80 normal-case">
              {entry.formula}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
