"use client";

import dynamic from "next/dynamic";
import type { ChartKind } from "@/lib/types";
import { ChartSkeleton } from "@/components/loaders/ChartSkeleton";

const RevenueChart = dynamic(() => import("./RevenueChart").then((m) => m.RevenueChart), {
  ssr: false,
  loading: () => <ChartSkeleton bars={[50, 55, 62, 60, 32, 58, 78]} />,
});
const ProfitChart = dynamic(() => import("./ProfitChart").then((m) => m.ProfitChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const OpmChart = dynamic(() => import("./OpmChart").then((m) => m.OpmChart), {
  ssr: false,
  loading: () => <ChartSkeleton bars={[30, 40, 48, 45, 10, 55, 70]} />,
});
const DebtChart = dynamic(() => import("./DebtChart").then((m) => m.DebtChart), {
  ssr: false,
  loading: () => <ChartSkeleton bars={[40, 80, 20, 25]} />,
});
const WorkingCapitalChart = dynamic(
  () => import("./WorkingCapitalChart").then((m) => m.WorkingCapitalChart),
  { ssr: false, loading: () => <ChartSkeleton bars={[55, 52, 50]} /> },
);
const RealtyChart = dynamic(() => import("./RealtyChart").then((m) => m.RealtyChart), {
  ssr: false,
  loading: () => <ChartSkeleton bars={[5, 30, 90]} />,
});

export function ChapterChart({
  kind,
  showStoryLink = true,
}: {
  kind: ChartKind;
  showStoryLink?: boolean;
}) {
  if (kind === "revenue") return <RevenueChart showStoryLink={showStoryLink} />;
  if (kind === "profit") return <ProfitChart showStoryLink={showStoryLink} />;
  if (kind === "opm") return <OpmChart showStoryLink={showStoryLink} />;
  if (kind === "debt") return <DebtChart showStoryLink={showStoryLink} />;
  if (kind === "working-capital") return <WorkingCapitalChart showStoryLink={showStoryLink} />;
  return <RealtyChart showStoryLink={showStoryLink} />;
}
