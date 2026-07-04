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
import { chartTheme, tooltipStyle } from "./ChartTheme";

export function RealtyChart() {
  const data = realty.years.map((y) => ({
    year: y.year,
    revenue: y.revenue,
    netProfit: y.netProfit,
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
              <Cell
                key={entry.year}
                fill={entry.year === "FY26" ? chartTheme.up : chartTheme.gold}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
