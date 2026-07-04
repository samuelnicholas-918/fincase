"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Chapter } from "@/lib/types";
import { chapters } from "@/lib/data";
import { getCompletedChapters, markChapterComplete } from "@/lib/progress";
import { ChapterChart } from "@/components/charts/ChapterChart";
import { DemergerSequence } from "@/components/scrolly/DemergerSequence";
import { ConceptCard } from "./ConceptCard";
import { NarrativeText } from "./NarrativeText";
import { PredictReveal } from "./PredictReveal";
import { Quiz } from "./Quiz";
import { cn } from "@/lib/utils";
import { PageLoader, useAssemblyLoader } from "@/components/loaders/PageLoader";

export function ChapterShell({ chapter }: { chapter: Chapter }) {
  const prev = chapters.find((c) => c.id === chapter.id - 1);
  const next = chapters.find((c) => c.id === chapter.id + 1);
  const loading = useAssemblyLoader(`chapter-${chapter.id}`);
  const [completed, setCompleted] = useState<number[]>([]);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    setCompleted(getCompletedChapters());
    setChartReady(false);
    const t = window.setTimeout(() => setChartReady(true), 200);
    return () => clearTimeout(t);
  }, [chapter.id]);

  function handleQuizComplete() {
    setCompleted(markChapterComplete(chapter.id));
  }

  return (
    <div className="min-h-screen bg-navy">
      <PageLoader active={loading} />

      <header className="sticky top-0 z-40 border-b border-navy-200/80 bg-navy/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            FinCase
          </Link>
          <nav className="flex items-center gap-2" aria-label="Chapter progress">
            {chapters.map((c) => (
              <Link
                key={c.id}
                href={`/story/${c.slug}`}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                  c.id === chapter.id && "bg-gold",
                  c.id !== chapter.id && completed.includes(c.id) && "bg-up",
                  c.id !== chapter.id && !completed.includes(c.id) && "bg-navy-200 hover:bg-gold/50",
                )}
                aria-label={`Chapter ${c.id}${completed.includes(c.id) ? ", completed" : ""}`}
                aria-current={c.id === chapter.id ? "step" : undefined}
              />
            ))}
          </nav>
          <Link
            href="/terminal"
            className="font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
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
            <NarrativeText key={para.slice(0, 32)} text={para} />
          ))}
        </div>

        {chapter.scrolly ? (
          <div className="mt-10 -mx-4 sm:mx-0">
            <DemergerSequence />
          </div>
        ) : null}

        <div className="mt-10">
          <PredictReveal predict={chapter.predict} />
        </div>

        {!chapter.scrolly && (
          <div className="mt-10 transition-opacity duration-200" style={{ opacity: chartReady ? 1 : 0 }}>
            {chartReady ? (
              <ChapterChart kind={chapter.chart} />
            ) : (
              <div className="h-64 rounded-lg border border-navy-200 bg-navy-50/60" />
            )}
          </div>
        )}

        <div className="mt-10">
          <ConceptCard concept={chapter.concept} />
        </div>

        <div className="mt-10">
          <Quiz questions={chapter.quiz} onComplete={handleQuizComplete} />
        </div>

        <nav className="mt-12 flex items-center justify-between border-t border-navy-200 pt-8">
          {prev ? (
            <Link
              href={`/story/${prev.slug}`}
              className="font-mono text-xs uppercase tracking-wider text-white/50 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
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
              className="rounded border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
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
