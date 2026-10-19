"use client";

import Link from "next/link";
import { ConversationRow } from "@/components/conversation-row";
import { ProductEmblem } from "@/components/product-emblem";
import { useAttune } from "@/lib/store/attune-store";
import { computeClimate, computeSelfReport, scoreToPercent } from "@/lib/tone/climate";

export default function InboxPage() {
  const { conversations, clarityStreak } = useAttune();
  const allMessages = conversations.flatMap((c) => c.messages);
  const self = computeSelfReport(allMessages);
  const tense = conversations.filter((c) => {
    const climate = computeClimate(c.messages);
    return climate.label === "cooling" || climate.label === "escalating";
  }).length;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 pb-14 pt-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line-strong)] pb-6">
        <div className="flex items-start gap-4">
          <span className="mt-1 flex size-12 items-center justify-center rounded-2xl bg-obsidian text-gold shadow-sm">
            <ProductEmblem slug="mirror" className="size-6" />
          </span>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-sea">
              Instrument 01 · Personal Telemetry
            </span>
            <h1 className="mt-1 font-display text-4xl tracking-tight text-ink md:text-5xl">
              Mirror Inbox
            </h1>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Climate at a glance across your relationships. Open any thread to see message-by-message tone telemetry and test the live Pause intercept.
            </p>
          </div>
        </div>
        <Link
          href="/app/insights"
          className="rounded-full bg-obsidian px-5 py-2.5 text-xs font-semibold text-gold transition hover:bg-sea-deep"
        >
          View Personal Tone Report →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
        <div className="card-surface rounded-2xl p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft/65">
            Your Clarity Score
          </p>
          <p className="mt-1 font-display text-3xl text-ink">
            {scoreToPercent(self.avgScore)}
            <span className="font-mono text-xs text-ink-soft/60">/100</span>
          </p>
        </div>
        <div className="card-surface rounded-2xl p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft/65">
            Clarity Streak
          </p>
          <p className="mt-1 font-display text-3xl text-ink">{clarityStreak} days</p>
        </div>
        <div className="card-surface rounded-2xl p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft/65">
            Threads Needing Care
          </p>
          <p className="mt-1 font-display text-3xl text-negative">{tense}</p>
        </div>
      </div>

      <div className="card-surface mt-6 overflow-hidden rounded-[1.6rem]">
        {conversations.map((c, i) => (
          <div
            key={c.id}
            className={i > 0 ? "border-t border-[var(--line)]" : undefined}
          >
            <ConversationRow conversation={c} />
          </div>
        ))}
      </div>
    </main>
  );
}
