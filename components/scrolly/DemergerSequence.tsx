"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { debtTrajectory } from "@/lib/data";

function EntityColumn({
  name,
  color,
  target,
  progress,
}: {
  name: string;
  color: string;
  target: number;
  progress: MotionValue<number>;
}) {
  const height = useTransform(progress, (v) => `${v * target * 100}%`);

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-20 w-full items-center justify-center rounded-lg border px-2 text-center font-mono text-[11px] sm:text-xs"
        style={{ borderColor: color, color, background: `${color}18` }}
      >
        {name}
      </div>
      <div className="mt-3 flex h-32 w-10 items-end rounded-sm bg-navy-100">
        <motion.div className="w-full rounded-sm" style={{ backgroundColor: color, height }} />
      </div>
      <span className="mt-2 font-mono text-[10px] text-white/40">Revenue</span>
    </div>
  );
}

export function DemergerSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const blockScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92]);
  const blockOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const splitOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const barProgress = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const debtOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const pathLength = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const annotationOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);

  const points = debtTrajectory
    .map((d, i) => {
      const x = (i / (debtTrajectory.length - 1)) * 380 + 10;
      const y = 90 - (d.debt / 4181) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div ref={containerRef} className="relative h-[320vh]" aria-label="Demerger scroll sequence">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden px-4 py-8">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-widest text-gold">
          Scroll to watch the demerger
        </p>

        <div className="relative mx-auto min-h-[20rem] w-full max-w-2xl">
          <motion.div
            style={{ scale: blockScale, opacity: blockOpacity }}
            className="absolute inset-x-0 top-8 mx-auto flex h-28 max-w-md items-center justify-center rounded-lg border border-gold bg-gold/15"
          >
            <span className="font-serif text-2xl text-gold">Raymond Ltd</span>
          </motion.div>

          <motion.div
            style={{ opacity: splitOpacity }}
            className="relative z-10 grid grid-cols-3 gap-3 pt-4"
          >
            <EntityColumn name="Raymond Ltd" color="#C9A84C" target={0.35} progress={barProgress} />
            <EntityColumn name="Lifestyle" color="#E0C56A" target={0.85} progress={barProgress} />
            <EntityColumn name="Realty" color="#3D9B6E" target={1} progress={barProgress} />
          </motion.div>
        </div>

        <motion.div style={{ opacity: debtOpacity }} className="relative z-10 mx-auto mt-8 w-full max-w-2xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
            Consolidated debt (₹ Cr)
          </p>
          <svg
            viewBox="0 0 400 100"
            className="h-24 w-full"
            role="img"
            aria-label="Debt rises in FY24 then falls sharply in FY25"
          >
            <motion.polyline
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
              points={points}
              style={{ pathLength }}
            />
            {debtTrajectory.map((d, i) => {
              const x = (i / (debtTrajectory.length - 1)) * 380 + 10;
              const y = 90 - (d.debt / 4181) * 80;
              return (
                <g key={d.year}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={d.year === "FY24" ? "#C45C5C" : "#C9A84C"}
                  />
                  <text
                    x={x}
                    y="98"
                    textAnchor="middle"
                    fill="#6B7A94"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {d.year}
                  </text>
                </g>
              );
            })}
          </svg>
          <motion.div style={{ opacity: annotationOpacity }} className="mt-4 space-y-2">
            <p className="rounded border border-down/40 bg-down/10 px-3 py-2 font-mono text-xs text-down">
              FY24 — debt spikes to ₹4,181 Cr (restructuring liabilities)
            </p>
            <p className="rounded border border-up/40 bg-up/10 px-3 py-2 font-mono text-xs text-up">
              FY25 — collapses to ₹740 Cr (~82% cut)
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
