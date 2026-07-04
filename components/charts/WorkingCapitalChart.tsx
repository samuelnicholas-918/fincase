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
import { chartTheme, tooltipStyle } from "./ChartTheme";

export function WorkingCapitalChart() {
  const data = lifestyle.years.map((y) => ({
    year: y.year,
    debtorDays: y.debtorDays,
    inventoryTurnover: y.inventoryTurnover,
    opm: y.opm,
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
            width={40}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            wrapperStyle={{ fontFamily: chartTheme.font, fontSize: 11, color: chartTheme.axis }}
          />
          <Bar dataKey="debtorDays" name="Debtor Days" fill={chartTheme.gold} radius={[2, 2, 0, 0]} />
          <Bar
            dataKey="inventoryTurnover"
            name="Inv. Turnover (x)"
            fill={chartTheme.goldDim}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
