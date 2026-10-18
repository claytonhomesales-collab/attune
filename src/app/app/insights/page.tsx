"use client";

import Link from "next/link";
import { SelfReportPanel } from "@/components/self-report";
import { useAttune } from "@/lib/store/attune-store";
import { computeClimate, computeSelfReport } from "@/lib/tone/climate";

export default function InsightsPage() {
  const { conversations, plan } = useAttune();
  const allMessages = conversations.flatMap((c) => c.messages);
  const report = computeSelfReport(allMessages);

  const perThread = conversations.map((c) => {
    const climate = computeClimate(c.messages);
    const self = computeSelfReport(c.messages);
    return { conversation: c, climate, self };
  });

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-2 md:px-6">
      <SelfReportPanel report={report} />

      <section className="mt-14">
        <h2 className="font-display text-2xl text-sea-deep">By conversation</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Compare how you show up with each person — the mirror that makes Attune sticky.
        </p>
        <ul className="mt-6 space-y-3">
          {perThread.map(({ conversation, climate, self }) => (
            <li key={conversation.id}>
              <Link
                href={`/app/thread/${conversation.id}`}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 px-4 py-4 shadow-[inset_0_0_0_1px_var(--line)] transition hover:bg-white"
              >
                <div>
                  <p className="font-medium text-ink">{conversation.name}</p>
                  <p className="text-sm capitalize text-ink-soft">
                    Climate {climate.label} · your average{" "}
                    {Math.round(((self.avgScore + 1) / 2) * 100)}
                  </p>
                </div>
                <span className="text-sm text-sea">Open →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {plan === "free" && (
        <section className="mt-12 rounded-[1.35rem] bg-sea-deep px-6 py-8 text-foam">
          <h3 className="font-display text-2xl">Go deeper with Plus</h3>
          <p className="mt-2 max-w-md text-foam/80">
            AI-grade tone scoring, rewrite coach, and longer history — built for people
            who want the habit to stick.
          </p>
          <Link
            href="/pricing"
            className="mt-5 inline-flex rounded-full bg-foam px-5 py-2.5 text-sm font-semibold text-sea-deep"
          >
            View pricing
          </Link>
        </section>
      )}
    </main>
  );
}
