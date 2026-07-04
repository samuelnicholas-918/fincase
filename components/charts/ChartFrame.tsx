"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ChartSkeleton } from "@/components/loaders/ChartSkeleton";

export function ChartFrame({
  label,
  storyChapter,
  alt,
  skeletonBars,
  children,
}: {
  label: string;
  storyChapter?: number;
  alt: string;
  skeletonBars?: number[];
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <figure className="rounded-lg border border-navy-200 bg-navy-50/60 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <figcaption className="font-mono text-[10px] uppercase tracking-widest text-gold/80">
          {label}
        </figcaption>
        {storyChapter != null && (
          <Link
            href={`/story/${storyChapter}`}
            className="rounded-full border border-gold/30 bg-navy px-2.5 py-0.5 font-mono text-[10px] text-gold/90 hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            → told in Chapter {storyChapter}
          </Link>
        )}
      </div>
      <div
        className="transition-opacity duration-200"
        style={{ opacity: ready ? 1 : 0 }}
        role="img"
        aria-label={alt}
      >
        {ready ? children : <ChartSkeleton bars={skeletonBars} />}
      </div>
      {!ready && (
        <div className="sr-only" aria-live="polite">
          Loading chart
        </div>
      )}
    </figure>
  );
}
