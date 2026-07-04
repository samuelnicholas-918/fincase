"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { raymond } from "@/lib/data";
import { axisTick, chartTheme, tooltipStyle } from "./ChartTheme";
import { ChartFrame } from "./ChartFrame";

export function RevenueChart({ showStoryLink = true }: { showStoryLink?: boolean }) {
  const data = raymond.years.map((y) => ({
    year: y.year,
    revenue: y.revenue,
    fill: y.year === "FY21" ? chartTheme.down : chartTheme.gold,
  }));

  return (
    <ChartFrame
      label="Revenue (₹ Cr) — Raymond Limited, pre-demerger"
      storyChapter={showStoryLink ? 1 : undefined}
      alt="Bar chart of Raymond revenue from FY17 to FY23, with a sharp drop in FY21"
      skeletonBars={[50, 55, 62, 60, 32, 58, 78]}
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
            <ReferenceLine
              x="FY23"
              stroke={chartTheme.goldDim}
              strokeDasharray="4 4"
              label={{ value: "Pre-demerger", fill: chartTheme.axis, fontSize: 10, position: "insideTopRight" }}
            />
            <Bar dataKey="revenue" radius={[2, 2, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.year} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartFrame>
  );
}
