"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { lifestyle } from "@/lib/data";
import { axisTick, chartTheme, tooltipStyle } from "./ChartTheme";
import { ChartFrame } from "./ChartFrame";

export function WorkingCapitalChart({ showStoryLink = true }: { showStoryLink?: boolean }) {
  const data = lifestyle.years.map((y) => ({
    year: y.year,
    debtorDays: y.debtorDays,
    inventoryTurnover: y.inventoryTurnover,
  }));

  return (
    <ChartFrame
      label="Working Capital — Raymond Lifestyle post-demerger"
      storyChapter={showStoryLink ? 3 : undefined}
      alt="Bar chart of debtor days and inventory turnover for Raymond Lifestyle FY24 to FY26"
      skeletonBars={[55, 52, 50]}
    >
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
            <YAxis tick={axisTick} axisLine={false} tickLine={false} width={40} />
            <Tooltip cursor={{ fill: "rgba(201,168,76,0.08)" }} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontFamily: chartTheme.font, fontSize: 11, color: chartTheme.axis }} />
            <Bar dataKey="debtorDays" name="Debtor Days" fill={chartTheme.gold} radius={[2, 2, 0, 0]} />
            <Bar dataKey="inventoryTurnover" name="Inv. Turnover (x)" fill={chartTheme.goldDim} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartFrame>
  );
}
