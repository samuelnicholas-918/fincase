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
import { debtTrajectory } from "@/lib/data";
import { axisTick, chartTheme, tooltipStyle } from "./ChartTheme";
import { ChartFrame } from "./ChartFrame";

export function DebtChart({ showStoryLink = true }: { showStoryLink?: boolean }) {
  return (
    <ChartFrame
      label="Consolidated Debt (₹ Cr) — demerger transition"
      storyChapter={showStoryLink ? 4 : undefined}
      alt="Line chart of debt peaking in FY24 then falling in FY25"
      skeletonBars={[40, 80, 20, 25]}
    >
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={debtTrajectory} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
            <YAxis tick={axisTick} axisLine={false} tickLine={false} width={48} />
            <ReferenceLine
              x="FY24"
              stroke={chartTheme.down}
              strokeDasharray="4 4"
              label={{ value: "Demerger", fill: chartTheme.down, fontSize: 10, position: "insideTopLeft" }}
            />
            <Tooltip
              cursor={{ stroke: chartTheme.gold, strokeWidth: 1 }}
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")} Cr`, "Debt"]}
              labelFormatter={(label, payload) => {
                const item = payload?.[0]?.payload as (typeof debtTrajectory)[number] | undefined;
                return item ? `${label} — ${item.label}` : String(label);
              }}
            />
            <Line
              type="monotone"
              dataKey="debt"
              stroke={chartTheme.gold}
              strokeWidth={2}
              dot={{ fill: chartTheme.gold, r: 4 }}
              activeDot={{ r: 6 }}
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
