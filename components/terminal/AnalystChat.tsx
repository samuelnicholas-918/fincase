"use client";

import { FormEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Why did debt spike in FY24?",
  "Is Raymond Lifestyle's margin good?",
  "Explain the demerger like I'm 15",
];

export function AnalystChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "No response." },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div className="flex h-[28rem] flex-col rounded-lg border border-navy-200 bg-navy-50/40">
      <div className="border-b border-navy-200 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gold">AI Analyst</p>
        <p className="mt-1 text-xs text-white/50">
          Grounded in Raymond FY17–FY26 figures. Ask about the demerger, margins, or debt.
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && !loading && (
          <div className="space-y-3">
            <p className="font-mono text-xs text-white/40">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="rounded border border-gold/30 bg-navy px-3 py-1.5 font-mono text-[11px] text-gold/90 hover:bg-gold/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={cn(
              "max-w-[90%] rounded px-3 py-2 text-sm leading-relaxed",
              m.role === "user"
                ? "ml-auto bg-gold/15 text-white"
                : "mr-auto border border-navy-200 bg-navy text-white/85",
            )}
          >
            {m.role === "assistant" && (
              <span className="mb-1 block font-mono text-[10px] text-gold/70">ANALYST</span>
            )}
            <p className="whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}

        {loading && (
          <p className="font-mono text-xs text-gold/70">ANALYSING DATASET…</p>
        )}

        {error && (
          <p className="font-mono text-xs text-down">
            ⚠ {error.toUpperCase()} — RETRY
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="border-t border-navy-200 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Raymond's numbers…"
            className="flex-1 rounded border border-navy-200 bg-navy px-3 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
