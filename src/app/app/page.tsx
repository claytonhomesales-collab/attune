"use client";

import { ConversationRow } from "@/components/conversation-row";
import { useAttune } from "@/lib/store/attune-store";
import { computeClimate, computeSelfReport } from "@/lib/tone/climate";
import Link from "next/link";

export default function InboxPage() {
  const { conversations, plan, clarityStreak } = useAttune();
  const allMessages = conversations.flatMap((c) => c.messages);
  const self = computeSelfReport(allMessages);
  const tense = conversations.filter((c) => {
    const climate = computeClimate(c.messages);
    return climate.label === "cooling" || climate.label === "escalating";
  }).length;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-3 pb-10 md:px-6">
      <div className="px-2 pb-6 pt-2 md:px-0">
        <h1 className="font-display text-3xl text-sea-deep md:text-4xl">Inbox</h1>
        <p className="mt-2 text-ink-soft">
          Climate at a glance. Open a thread to see tone on every message — and yours.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2 px-1 md:gap-3">
        <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-[inset_0_0_0_1px_var(--line)] md:px-4">
          <p className="text-[10px] uppercase tracking-[0.12em] text-ink-soft/60">
            Clarity
          </p>
          <p className="font-display text-2xl text-sea-deep">{self.clarityDays}d</p>
        </div>
        <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-[inset_0_0_0_1px_var(--line)] md:px-4">
          <p className="text-[10px] uppercase tracking-[0.12em] text-ink-soft/60">
            Needs care
          </p>
          <p className="font-display text-2xl text-sea-deep">{tense}</p>
        </div>
        <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-[inset_0_0_0_1px_var(--line)] md:px-4">
          <p className="text-[10px] uppercase tracking-[0.12em] text-ink-soft/60">
            Plan
          </p>
          <p className="font-display text-2xl capitalize text-sea-deep">{plan}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.35rem] bg-white/80 shadow-[inset_0_0_0_1px_var(--line)]">
        {conversations.map((c, i) => (
          <div
            key={c.id}
            className={i > 0 ? "border-t border-[var(--line)]" : undefined}
          >
            <ConversationRow conversation={c} />
          </div>
        ))}
      </div>

      <p className="mt-6 px-2 text-center text-sm text-ink-soft">
        Streak pulse: {clarityStreak} recent steady days.{" "}
        <Link href="/app/insights" className="font-medium text-sea underline-offset-2 hover:underline">
          See your tone report
        </Link>
      </p>
    </main>
  );
}
