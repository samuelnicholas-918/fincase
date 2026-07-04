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
import { raymond } from "@/lib/data";
import { chartTheme, tooltipStyle } from "./ChartTheme";

export function RevenueChart() {
  const data = raymond.years.map((y) => ({
    year: y.year,
    revenue: y.revenue,
    fill: y.year === "FY21" ? chartTheme.down : chartTheme.gold,
  }));

  return (
    <div className="h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
            formatter={(value: number) => [`₹${value.toLocaleString("en-IN")} Cr`, "Revenue"]}
          />
          <Bar dataKey="revenue" radius={[2, 2, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.year} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
