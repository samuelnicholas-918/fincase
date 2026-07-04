"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { debtTrajectory } from "@/lib/data";
import { chartTheme, tooltipStyle } from "./ChartTheme";

export function DebtChart() {
  return (
    <div className="h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={debtTrajectory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: chartTheme.axis, fontSize: 11, fontFamily: chartTheme.font }}
            axisLine={{ stroke: chartTheme.grid }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: chartTheme.axis, fontSize: 11, fontFamily: chartTheme.font }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
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
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
