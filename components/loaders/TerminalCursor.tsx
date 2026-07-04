"use client";

import { motion } from "framer-motion";

export function TerminalCursor() {
  return (
    <motion.span
      className="inline-block font-mono text-gold"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      ▮
    </motion.span>
  );
}
