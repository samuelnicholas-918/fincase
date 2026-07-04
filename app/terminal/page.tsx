import type { Metadata } from "next";
import { Suspense } from "react";
import { TabShell } from "@/components/terminal/TabShell";

export const metadata: Metadata = {
  title: "The Terminal · FinCase",
  description: "Analyst dashboard for Raymond FY17–FY26 — charts, demerger metrics, and AI Analyst.",
};

export default function TerminalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <TabShell />
    </Suspense>
  );
}
