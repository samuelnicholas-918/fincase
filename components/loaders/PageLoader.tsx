"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "PARSING FY17–FY26 …",
  "RECONCILING SEGMENTS …",
  "READY.",
];

const MIN_MS = 1200;

export function PageLoader({ active }: { active: boolean }) {
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    setLineIdx(0);
    const timers = [
      window.setTimeout(() => setLineIdx(1), 400),
      window.setTimeout(() => setLineIdx(2), 800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="flex h-24 items-end gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 origin-bottom rounded-sm bg-gold"
                initial={{ scaleY: 0, height: 96 }}
                animate={{ scaleY: [0, 0.35 + i * 0.12, 0.55 + (i % 3) * 0.15] }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
          <p className="mt-8 font-mono text-xs tracking-widest text-gold/90">
            {LINES[lineIdx]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useAssemblyLoader(triggerKey: string) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const start = performance.now();
    const id = window.setTimeout(() => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => setLoading(false), wait);
    }, 0);
    return () => clearTimeout(id);
  }, [triggerKey]);

  return loading;
}
