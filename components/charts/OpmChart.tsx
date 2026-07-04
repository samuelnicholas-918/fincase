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
import { chartTheme, tooltipStyle } from "./ChartTheme";

export function OpmChart() {
  const data = raymond.years.map((y) => ({
    year: y.year,
    opm: y.opm,
    netProfit: y.netProfit,
  }));

  return (
    <div className="h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
            tickFormatter={(v: number) => `${v}%`}
            width={48}
          />
          <ReferenceLine y={0} stroke={chartTheme.axis} strokeDasharray="4 4" />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value: number, name: string) =>
              name === "opm"
                ? [`${value.toFixed(1)}%`, "OPM"]
                : [`₹${value.toLocaleString("en-IN")} Cr`, "Net Profit"]
            }
          />
          <Line
            type="monotone"
            dataKey="opm"
            stroke={chartTheme.gold}
            strokeWidth={2}
            dot={{ fill: chartTheme.gold, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
