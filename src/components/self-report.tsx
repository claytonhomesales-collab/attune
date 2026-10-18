"use client";

import { motion } from "framer-motion";
import type { SelfReport } from "@/lib/tone/types";
import { scoreToPercent } from "@/lib/tone/climate";

const bars: { key: keyof Pick<SelfReport, "positive" | "neutral" | "negative" | "destructive">; color: string; label: string }[] = [
  { key: "positive", color: "var(--positive)", label: "Warm" },
  { key: "neutral", color: "var(--neutral)", label: "Even" },
  { key: "negative", color: "var(--negative)", label: "Tense" },
  { key: "destructive", color: "var(--destructive)", label: "Harmful" },
];

export function SelfReportPanel({ report }: { report: SelfReport }) {
  const total = Math.max(1, report.messageCount);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-ink-soft/70">
          Your tone
        </p>
        <h2 className="mt-1 font-display text-3xl text-sea-deep md:text-4xl">
          {scoreToPercent(report.avgScore)} clarity
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          {report.insight}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium text-ink">How you sound lately</p>
          <div className="space-y-3">
            {bars.map((bar) => {
              const value = report[bar.key];
              const pct = Math.round((value / total) * 100);
              return (
                <div key={bar.key}>
                  <div className="mb-1 flex justify-between text-xs text-ink-soft">
                    <span>{bar.label}</span>
                    <span>
                      {value} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-mist">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: bar.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ type: "spring", stiffness: 80, damping: 16 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/80 px-5 py-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="text-xs uppercase tracking-[0.12em] text-ink-soft/65">
              Clarity streak
            </p>
            <p className="mt-1 font-display text-3xl text-sea-deep">
              {report.clarityDays} days
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Days where your sends stayed mostly warm or even — not fake-positive, just clear.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 px-5 py-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="text-xs uppercase tracking-[0.12em] text-ink-soft/65">
              Recurring signals
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
              {report.topSignals.length === 0 && <li>Not enough data yet</li>}
              {report.topSignals.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
