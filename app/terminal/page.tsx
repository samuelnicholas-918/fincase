import type { Metadata } from "next";
import { TabShell } from "@/components/terminal/TabShell";

export const metadata: Metadata = {
  title: "The Terminal · FinCase",
  description: "Analyst dashboard for Raymond FY17–FY26 — charts, demerger metrics, and AI Analyst.",
};

export default function TerminalPage() {
  return <TabShell />;
}
