import Link from "next/link";
import { editionMeta } from "@/lib/data";

export const metadata = {
  title: "Methodology · FinCase",
  description: "Data sources, limitations, and extraction approach for FinCase Raymond Edition.",
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-navy">
      <header className="border-b border-navy-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-light"
          >
            FinCase
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Methodology
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-serif text-3xl text-white">Methodology</h1>
        <p className="mt-2 font-mono text-xs text-white/40">
          Last updated {editionMeta.lastUpdated}
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="font-serif text-xl text-gold">Data sources</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/75">
            {editionMeta.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="font-serif text-xl text-gold">Extraction approach</h2>
          <p className="text-sm leading-relaxed text-white/75">
            Ten-year standalone history for Raymond Limited (FY17–FY23) was sourced via Screener.in.
            Post-demerger figures for Raymond Lifestyle and Raymond Realty (FY24–FY26) use the same
            source, supplemented by targeted extraction from annual reports — segment tables and
            MD&A sections — rather than full-document processing of 300+ page filings.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="font-serif text-xl text-gold">Known limitations</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/75">
            <li>
              FY24 is a transition year with restructuring-related one-offs. Lifestyle FY24 net
              profit is not representative of underlying operating profitability.
            </li>
            <li>
              Early post-demerger periods use standalone figures, which can understate group-level
              scale.
            </li>
            <li>
              This is a single-company case study. Margins and growth are relative to Raymond&apos;s
              own history, not peer-benchmarked.
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="font-serif text-xl text-gold">Units</h2>
          <p className="text-sm leading-relaxed text-white/75">
            All monetary figures are in ₹ crore unless otherwise noted. Percentages are operating
            profit margins or stated ratios.
          </p>
        </section>
      </article>
    </main>
  );
}
