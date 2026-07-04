"use client";

import { FormEvent, useRef, useState } from "react";
import type { TerminalTabId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TerminalCursor } from "@/components/loaders/TerminalCursor";
import { CitedText } from "./CitationChip";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Why did debt spike in FY24?",
  "Is Raymond Lifestyle's margin good?",
  "Explain the demerger like I'm 15",
];

export function AnalystChat({
  onNavigate,
}: {
  onNavigate?: (tab: TerminalTabId) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = onNavigate ?? (() => undefined);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        const text = await res.text();
        throw new Error(text || "Connection interrupted");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: assistant };
          return copy;
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "CONNECTION INTERRUPTED — RETRY";
      setError(message.replace(/^⚠\s*/, ""));
      setMessages((prev) => {
        const copy = [...prev];
        if (copy[copy.length - 1]?.role === "assistant" && !copy[copy.length - 1].content) {
          return copy.slice(0, -1);
        }
        return copy;
      });
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
    <div className="flex h-[28rem] flex-col rounded-lg border border-navy-200 bg-navy-50/40 sm:h-[32rem]">
      <div className="border-b border-navy-200 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gold">AI Analyst</p>
        <p className="mt-1 text-xs text-white/50">
          Grounded in Raymond FY17–FY26. Citations open the matching chart.
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
                  className="rounded border border-gold/30 bg-navy px-3 py-1.5 font-mono text-[11px] text-gold/90 hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
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
              "max-w-[92%] rounded px-3 py-2 text-sm leading-relaxed",
              m.role === "user"
                ? "ml-auto bg-gold/15 text-white"
                : "mr-auto border border-navy-200 bg-navy text-white/85",
            )}
          >
            {m.role === "assistant" && (
              <span className="mb-1 block font-mono text-[10px] text-gold/70">ANALYST</span>
            )}
            {m.role === "assistant" ? (
              m.content ? (
                <CitedText text={m.content} onNavigate={navigate} />
              ) : (
                <TerminalCursor />
              )
            ) : (
              <p className="whitespace-pre-wrap">{m.content}</p>
            )}
          </div>
        ))}

        {error && (
          <p className="font-mono text-xs text-down">⚠ {error.toUpperCase()}</p>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="border-t border-navy-200 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Raymond's numbers…"
            className="min-w-0 flex-1 rounded border border-navy-200 bg-navy px-3 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none"
            disabled={loading}
            aria-label="Ask the AI Analyst"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="shrink-0 rounded border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gold disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
