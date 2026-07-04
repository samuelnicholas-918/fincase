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

export function ProfitChart({ showStoryLink = true }: { showStoryLink?: boolean }) {
  const data = raymond.years.map((y) => ({
    year: y.year,
    netProfit: y.netProfit,
    fill: y.netProfit < 0 ? chartTheme.down : chartTheme.up,
  }));

  return (
    <ChartFrame
      label="Net Profit (₹ Cr) — Raymond Limited, pre-demerger"
      storyChapter={showStoryLink ? 2 : undefined}
      alt="Bar chart of net profit from FY17 to FY23 with a loss in FY21"
      skeletonBars={[10, 25, 30, 35, 8, 40, 55]}
    >
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
            <YAxis tick={axisTick} axisLine={false} tickLine={false} width={48} />
            <ReferenceLine y={0} stroke={chartTheme.axis} />
            <Tooltip
              cursor={{ fill: "rgba(201,168,76,0.08)" }}
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")} Cr`, "Net Profit"]}
            />
            <Bar dataKey="netProfit" radius={[2, 2, 0, 0]}>
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
