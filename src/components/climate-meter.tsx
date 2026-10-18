"use client";

import { motion } from "framer-motion";
import type { Climate } from "@/lib/tone/types";
import { scoreToPercent } from "@/lib/tone/climate";

const labelCopy: Record<Climate["label"], string> = {
  warming: "Warming",
  steady: "Steady",
  cooling: "Cooling",
  escalating: "Escalating",
};

export function ClimateMeter({ climate }: { climate: Climate }) {
  const pct = scoreToPercent(climate.overall);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-soft/70">
            Conversation climate
          </p>
          <p className="font-display text-xl text-sea-deep">
            {labelCopy[climate.label]}
          </p>
        </div>
        <p className="text-sm text-ink-soft">{pct}/100</p>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-mist">
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
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {climate.trendNote}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-ink-soft">
        <div>
          <span className="block text-ink-soft/60">You</span>
          <span className="font-medium text-ink">{scoreToPercent(climate.youScore)}</span>
        </div>
        <div>
          <span className="block text-ink-soft/60">Them</span>
          <span className="font-medium text-ink">{scoreToPercent(climate.themScore)}</span>
        </div>
      </div>
    </div>
  );
}
