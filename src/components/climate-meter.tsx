"use client";

import { motion } from "framer-motion";
import type { Climate } from "@/lib/tone/types";
import { scoreToPercent } from "@/lib/tone/climate";

const labelCopy: Record<Climate["label"], string> = {
  warming: "Warming & Constructive",
  steady: "Steady & Grounded",
  cooling: "Cooling · Friction Detected",
  escalating: "Escalating · High Heat",
};

export function ClimateMeter({ climate }: { climate: Climate }) {
  const pct = scoreToPercent(climate.overall);

  return (
    <div className="w-full">
      <div className="mb-2.5 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/70">
            Conversation Climate Telemetry
          </p>
          <p className="mt-0.5 font-display text-xl text-ink">
            {labelCopy[climate.label]}
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-lg font-semibold text-ink">{pct}</span>
          <span className="font-mono text-xs text-ink-soft/60">/100</span>
        </div>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-mist shadow-inner">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              climate.label === "escalating"
                ? "linear-gradient(90deg, var(--negative), var(--destructive))"
                : climate.label === "cooling"
                  ? "linear-gradient(90deg, var(--neutral), var(--negative))"
                  : "linear-gradient(90deg, var(--sage), var(--sea))",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        {climate.trendNote}
      </p>
      <div className="mt-3.5 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-3 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-foam/80 px-3 py-2">
          <span className="text-ink-soft/75">Your sends</span>
          <span className="font-mono font-semibold text-ink">{scoreToPercent(climate.youScore)}/100</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-foam/80 px-3 py-2">
          <span className="text-ink-soft/75">Their sends</span>
          <span className="font-mono font-semibold text-ink">{scoreToPercent(climate.themScore)}/100</span>
        </div>
      </div>
    </div>
  );
}
