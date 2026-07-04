import Link from "next/link";
import { editionMeta, headlineStats } from "@/lib/data";
import { formatCr } from "@/lib/utils";

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          {editionMeta.name} · Edition #{editionMeta.editionNumber}
        </p>

        <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl">
          In 2024, one of India&apos;s oldest companies split itself in three.
        </h1>

        <p className="mt-4 max-w-xl text-lg text-white/65">
          Explore why — through its own numbers.
        </p>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/45">
          {editionMeta.pitch}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <EntryCard
            href="/story/1"
            eyebrow="Guided · ~15 min"
            title="Learn the Story"
            description="Five chapters: narrative, charts, concepts, and quizzes built from Raymond's real figures."
          />
          <EntryCard
            href="/terminal"
            eyebrow="Analyst dashboard"
            title="Open the Terminal"
            description="Six tabs — overview, revenue, working capital, demerger, realty, and an AI Analyst."
          />
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          <StatLink
            href="/story/1"
            label="Peak revenue"
            value={formatCr(headlineStats.peakRevenue.value)}
          />
          <StatLink
            href="/story/4"
            label="Debt cut"
            value={`${headlineStats.debtCut.value}%`}
          />
          <StatLink
            href="/story/5"
            label="Realty growth"
            value={`${headlineStats.realtyGrowth.value}x`}
          />
        </div>
      </div>

      <footer className="border-t border-navy-200 py-4 text-center">
        <Link
          href="/methodology"
          className="font-mono text-[10px] uppercase tracking-widest text-white/35 hover:text-gold"
        >
          Methodology & sources
        </Link>
      </footer>
    </main>
  );
}

function EntryCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-navy-200 bg-navy-50/40 p-6 transition-colors hover:border-gold/40 hover:bg-navy-50"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl text-white group-hover:text-gold-light">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
    </Link>
  );
}

function StatLink({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  return (
    <Link
      href={href}
      className="rounded border border-navy-200 bg-navy-50/30 px-4 py-3 transition-colors hover:border-gold/30"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-1 font-mono text-lg text-gold">{value}</p>
    </Link>
  );
}
