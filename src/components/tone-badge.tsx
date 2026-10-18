import type { ToneLabel } from "@/lib/tone/types";

const copy: Record<ToneLabel, string> = {
  positive: "Warm",
  neutral: "Even",
  negative: "Tense",
  destructive: "Harmful",
};

export function ToneBadge({
  label,
  compact = false,
}: {
  label: ToneLabel;
  compact?: boolean;
}) {
  return (
    <span
      className={`tone-${label} inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide`}
      style={{
        color: "var(--tone)",
        background: "color-mix(in oklab, var(--tone) 12%, transparent)",
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: "var(--tone)" }}
        aria-hidden
      />
      {compact ? label[0]?.toUpperCase() : copy[label]}
    </span>
  );
}
