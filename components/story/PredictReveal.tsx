"use client";

import { useState } from "react";
import type { PredictMoment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/CountUp";

function formatValue(value: number, unit: PredictMoment["unit"]) {
  if (unit === "cr") return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 1 })} Cr`;
  if (unit === "pct") return `${value.toFixed(1)}%`;
  if (unit === "days") return `${value.toFixed(1)} days`;
  return `${value.toFixed(0)}×`;
}

export function PredictReveal({
  predict,
  onRevealed,
}: {
  predict: PredictMoment;
  onRevealed?: () => void;
}) {
  const mid = (predict.min + predict.max) / 2;
  const [guess, setGuess] = useState(mid);
  const [revealed, setRevealed] = useState(false);

  function reveal() {
    setRevealed(true);
    onRevealed?.();
  }

  const delta = Math.abs(guess - predict.actual);
  const range = predict.max - predict.min || 1;
  const accuracy = Math.max(0, 1 - delta / range);

  return (
    <div className="rounded-lg border border-gold/30 bg-navy-50/50 p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">Predict first</p>
      <p className="mt-2 font-serif text-lg text-white">{predict.prompt}</p>

      <div className="mt-6">
        <div className="mb-2 flex justify-between font-mono text-xs text-white/50">
          <span>{formatValue(predict.min, predict.unit)}</span>
          <span className="text-gold">{formatValue(guess, predict.unit)}</span>
          <span>{formatValue(predict.max, predict.unit)}</span>
        </div>
        <input
          type="range"
          min={predict.min}
          max={predict.max}
          step={predict.step ?? 1}
          value={guess}
          disabled={revealed}
          onChange={(e) => setGuess(Number(e.target.value))}
          className="w-full accent-gold"
          aria-label={predict.label}
        />
        <div className="relative mt-3 h-10 rounded bg-navy">
          <div
            className="absolute bottom-0 w-3 -translate-x-1/2 rounded-t bg-gold/50"
            style={{
              left: `${((guess - predict.min) / range) * 100}%`,
              height: "70%",
            }}
            title="Your guess"
          />
          {revealed && (
            <div
              className="absolute bottom-0 w-3 -translate-x-1/2 rounded-t bg-up"
              style={{
                left: `${((predict.actual - predict.min) / range) * 100}%`,
                height: "100%",
              }}
              title="Actual"
            />
          )}
        </div>
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={reveal}
          className="mt-5 rounded border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/20"
        >
          Reveal actual
        </button>
      ) : (
        <div className="mt-5 space-y-2">
          <p className="font-mono text-sm text-white/70">
            Your guess: <span className="text-gold">{formatValue(guess, predict.unit)}</span>
          </p>
          <p className="font-mono text-sm text-white/70">
            Actual {predict.label}:{" "}
            <span className={cn(accuracy > 0.85 ? "text-up" : "text-gold")}>
              {formatValue(predict.actual, predict.unit)}
            </span>
          </p>
          <p className="text-xs text-white/45">
            Gold bar = your guess · Green bar = actual figure from filings
          </p>
        </div>
      )}
    </div>
  );
}

export function ScoreSoFar({ score, total }: { score: number; total: number }) {
  return (
    <p className="font-mono text-xs text-gold/80">
      Score so far: <CountUp value={score} className="text-gold" /> / {total}
    </p>
  );
}
