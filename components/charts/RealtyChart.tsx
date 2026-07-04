"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { realty } from "@/lib/data";
import { axisTick, chartTheme, tooltipStyle } from "./ChartTheme";
import { ChartFrame } from "./ChartFrame";

export function RealtyChart({ showStoryLink = true }: { showStoryLink?: boolean }) {
  const data = realty.years.map((y) => ({
    year: y.year,
    revenue: y.revenue,
  }));

  return (
    <ChartFrame
      label="Revenue (₹ Cr) — Raymond Realty post-demerger"
      storyChapter={showStoryLink ? 5 : undefined}
      alt="Bar chart of Raymond Realty revenue growing from FY24 to FY26"
      skeletonBars={[5, 30, 90]}
    >
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
            <YAxis tick={axisTick} axisLine={false} tickLine={false} width={48} />
            <Tooltip
              cursor={{ fill: "rgba(201,168,76,0.08)" }}
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")} Cr`, "Revenue"]}
            />
            <Bar dataKey="revenue" radius={[2, 2, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.year} fill={entry.year === "FY26" ? chartTheme.up : chartTheme.gold} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartFrame>
  );
}
