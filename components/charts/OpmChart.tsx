"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { raymond } from "@/lib/data";
import { axisTick, chartTheme, tooltipStyle } from "./ChartTheme";
import { ChartFrame } from "./ChartFrame";

export function OpmChart({ showStoryLink = true }: { showStoryLink?: boolean }) {
  const data = raymond.years.map((y) => ({ year: y.year, opm: y.opm }));

  return (
    <ChartFrame
      label="Operating Profit Margin (%) — Raymond Limited"
      storyChapter={showStoryLink ? 2 : undefined}
      alt="Line chart of operating profit margin from FY17 to FY23"
      skeletonBars={[30, 40, 48, 45, 10, 55, 70]}
    >
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
            <YAxis tick={axisTick} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} width={48} />
            <ReferenceLine y={0} stroke={chartTheme.axis} strokeDasharray="4 4" />
            <Tooltip
              cursor={{ stroke: chartTheme.gold, strokeWidth: 1 }}
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`${value.toFixed(1)}%`, "OPM"]}
            />
            <Line
              type="monotone"
              dataKey="opm"
              stroke={chartTheme.gold}
              strokeWidth={2}
              dot={{ fill: chartTheme.gold, r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartFrame>
  );
}
