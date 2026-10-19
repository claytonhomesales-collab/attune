import type { ToneLabel } from "@/lib/tone/types";

const copy: Record<ToneLabel, string> = {
  positive: "Warm & Clear",
  neutral: "Even",
  negative: "Tense",
  destructive: "Escalatory",
};

export function ToneBadge({
  label,
  score,
  compact = false,
}: {
  label: ToneLabel;
  score?: number;
  compact?: boolean;
}) {
  const pct = typeof score === "number" ? Math.round(((score + 1) / 2) * 100) : null;

  return (
    <span
      className={`tone-${label} inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide`}
      style={{
        color: "var(--tone)",
        background: "color-mix(in oklab, var(--tone) 13%, white)",
        boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--tone) 28%, transparent)",
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: "var(--tone)" }}
        aria-hidden
      />
      <span>{compact ? label[0]?.toUpperCase() : copy[label]}</span>
      {pct !== null && !compact && (
        <span className="font-mono text-[10px] opacity-75">· {pct}</span>
      )}
    </span>
  );
}
