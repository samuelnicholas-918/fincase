import type { ConceptCard as ConceptCardType } from "@/lib/types";

export function ConceptCard({ concept }: { concept: ConceptCardType }) {
  return (
    <aside className="rounded-lg border border-gold/30 bg-navy-50 p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">Concept</p>
      <h3 className="mt-1 font-serif text-xl text-white">{concept.concept}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{concept.definition}</p>
      {concept.formula && (
        <p className="mt-3 font-mono text-xs text-gold/90">{concept.formula}</p>
      )}
      <div className="mt-4 border-t border-navy-200 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Raymond example
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white/80">{concept.raymondExample}</p>
      </div>
    </aside>
  );
}
