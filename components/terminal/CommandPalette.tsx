"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { chapters, terminalTabs } from "@/lib/data";
import type { TerminalTabId } from "@/lib/types";

const METRICS = [
  { label: "Peak revenue FY23", tab: "revenue" as TerminalTabId },
  { label: "Debt trajectory", tab: "demerger" as TerminalTabId },
  { label: "Debtor days", tab: "working-capital" as TerminalTabId },
  { label: "Realty growth", tab: "realty" as TerminalTabId },
  { label: "AI Analyst", tab: "ai-analyst" as TerminalTabId },
];

export function CommandPalette({
  onSelectTab,
}: {
  onSelectTab?: (tab: TerminalTabId) => void;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function goTab(tab: TerminalTabId) {
    setOpen(false);
    if (onSelectTab) {
      onSelectTab(tab);
      return;
    }
    router.push(`/terminal?tab=${tab}`);
  }

  function goChapter(slug: string) {
    setOpen(false);
    router.push(`/story/${slug}`);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded border border-navy-200 bg-navy-50/50 px-2.5 py-1 font-mono text-[10px] text-white/45 hover:border-gold/30 hover:text-gold sm:inline-flex"
        aria-label="Open command palette"
      >
        <span>Search</span>
        <kbd className="rounded bg-navy px-1 text-white/30">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-navy/80 px-4 pt-[15vh] backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
      />
      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-lg border border-gold/30 bg-navy-50 shadow-2xl"
        label="Command palette"
      >
        <Command.Input
          placeholder="Jump to tab, chapter, or metric…"
          className="w-full border-b border-navy-200 bg-transparent px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-white/35"
        />
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center font-mono text-xs text-white/40">
            No matches
          </Command.Empty>

          <Command.Group heading="Terminal" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-gold/70">
            {terminalTabs.map((tab) => (
              <Command.Item
                key={tab.id}
                value={`tab ${tab.label}`}
                onSelect={() => goTab(tab.id)}
                className="cursor-pointer rounded px-3 py-2 font-mono text-sm text-white/80 aria-selected:bg-gold/15 aria-selected:text-gold"
              >
                {tab.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Chapters" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-gold/70">
            {chapters.map((c) => (
              <Command.Item
                key={c.id}
                value={`chapter ${c.id} ${c.title}`}
                onSelect={() => goChapter(c.slug)}
                className="cursor-pointer rounded px-3 py-2 font-mono text-sm text-white/80 aria-selected:bg-gold/15 aria-selected:text-gold"
              >
                Ch. {c.id} — {c.title}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Metrics" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-gold/70">
            {METRICS.map((m) => (
              <Command.Item
                key={m.label}
                value={`metric ${m.label}`}
                onSelect={() => goTab(m.tab)}
                className="cursor-pointer rounded px-3 py-2 font-mono text-sm text-white/80 aria-selected:bg-gold/15 aria-selected:text-gold"
              >
                {m.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
