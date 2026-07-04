import Link from "next/link";
import type { Chapter } from "@/lib/types";
import { chapters } from "@/lib/data";
import { ChapterChart } from "@/components/charts/ChapterChart";
import { ConceptCard } from "./ConceptCard";
import { Quiz } from "./Quiz";
import { cn } from "@/lib/utils";

export function ChapterShell({ chapter }: { chapter: Chapter }) {
  const prev = chapters.find((c) => c.id === chapter.id - 1);
  const next = chapters.find((c) => c.id === chapter.id + 1);

  return (
    <div className="min-h-screen bg-navy">
      <header className="border-b border-navy-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-light"
          >
            FinCase
          </Link>
          <nav className="flex items-center gap-2" aria-label="Chapter progress">
            {chapters.map((c) => (
              <Link
                key={c.id}
                href={`/story/${c.slug}`}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  c.id === chapter.id ? "bg-gold" : "bg-navy-200 hover:bg-gold/50",
                )}
                aria-label={`Chapter ${c.id}`}
                aria-current={c.id === chapter.id ? "step" : undefined}
              />
            ))}
          </nav>
          <Link
            href="/terminal"
            className="font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-gold"
          >
            Terminal
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
          Chapter {chapter.id} of {chapters.length}
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">
          {chapter.title}
        </h1>
        <p className="mt-3 text-white/60">{chapter.question}</p>

        <div className="mt-8 space-y-5">
          {chapter.narrative.map((para) => (
            <p key={para.slice(0, 24)} className="text-base leading-relaxed text-white/80">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <ChapterChart kind={chapter.chart} />
        </div>

        <div className="mt-10">
          <ConceptCard concept={chapter.concept} />
        </div>

        <div className="mt-10">
          <Quiz questions={chapter.quiz} />
        </div>

        <nav className="mt-12 flex items-center justify-between border-t border-navy-200 pt-8">
          {prev ? (
            <Link
              href={`/story/${prev.slug}`}
              className="font-mono text-xs uppercase tracking-wider text-white/50 hover:text-gold"
            >
              ← Ch. {prev.id}
            </Link>
          ) : (
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-white/50 hover:text-gold"
            >
              ← Home
            </Link>
          )}
          {next ? (
            <Link
              href={`/story/${next.slug}`}
              className="rounded border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/20"
            >
              Ch. {next.id} →
            </Link>
          ) : (
            <Link
              href="/terminal"
              className="rounded border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/20"
            >
              Open Terminal →
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
