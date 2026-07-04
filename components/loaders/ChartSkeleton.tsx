"use client";

import { motion } from "framer-motion";

const BAR_HEIGHTS = [40, 55, 62, 58, 28, 52, 78];

export function ChartSkeleton({ bars = BAR_HEIGHTS }: { bars?: number[] }) {
  return (
    <div
      className="flex h-64 w-full items-end gap-2 px-2 sm:h-72"
      aria-hidden="true"
      role="presentation"
    >
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm bg-navy-200/80"
          style={{ height: `${h}%` }}
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
