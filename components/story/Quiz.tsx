"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <section className="space-y-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">Check your reading</p>
      {questions.map((q, index) => {
        const selected = answers[q.id];
        const revealed = selected != null;

        return (
          <div key={q.id} className="rounded-lg border border-navy-200 bg-navy-50/40 p-5">
            <p className="font-mono text-[10px] text-white/40">Q{index + 1}</p>
            <p className="mt-1 font-serif text-lg text-white">{q.prompt}</p>
            <ul className="mt-4 space-y-2">
              {q.options.map((opt) => {
                const isSelected = selected === opt.id;
                const isCorrect = opt.id === q.correctId;
                const showCorrect = revealed && isCorrect;
                const showWrong = revealed && isSelected && !isCorrect;

                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      disabled={revealed}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                      className={cn(
                        "w-full rounded border px-4 py-3 text-left text-sm transition-colors",
                        "border-navy-200 bg-navy text-white/85 hover:border-gold/40",
                        showCorrect && "border-up bg-up/10 text-up",
                        showWrong && "border-down bg-down/10 text-down",
                        !revealed && "cursor-pointer",
                        revealed && "cursor-default",
                      )}
                    >
                      <span className="font-mono text-[10px] text-white/40 mr-2">
                        {opt.id.toUpperCase()}.
                      </span>
                      {opt.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            {revealed && (
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  selected === q.correctId ? "text-up" : "text-down",
                )}
              >
                {q.explanation}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}
