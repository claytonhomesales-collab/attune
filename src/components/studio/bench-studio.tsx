"use client";

import { useMemo, useState } from "react";
import { studioRewrite } from "@/lib/studio/rewrite";
import { analyzeHeuristic } from "@/lib/tone/heuristic";
import { computeClimate } from "@/lib/tone/climate";
import type { Message } from "@/lib/tone/types";
import { ClimateMeter } from "@/components/climate-meter";
import { ToneBadge } from "@/components/tone-badge";

type Entry = {
  id: string;
  person: string;
  role: string;
  studioSlug: string;
  text: string;
};

const seed: Entry[] = [
  {
    id: "1",
    person: "Nora Vance",
    role: "Enterprise AE · Deal",
    studioSlug: "deal",
    text: "To hold your May 1 onboarding slot, we'd need sign-off by Friday at 3pm. Should we lock that in, or push kickoff to June?",
  },
  {
    id: "2",
    person: "Chris Mateo",
    role: "Support Lead · Desk",
    studioSlug: "desk",
    text: "This is the third time we've explained this. Your team didn't configure the webhook properly and we are done troubleshooting it.",
  },
  {
    id: "3",
    person: "Devon Brooks",
    role: "Eng Manager · Lead",
    studioSlug: "lead",
    text: "This deck is a mess. I don't know why I still have to fix your slides before every leadership review.",
  },
  {
    id: "4",
    person: "Priya Shah",
    role: "Customer Success · Keep",
    studioSlug: "keep",
    text: "Your team cut ticket triage time by 28% this quarter. Ahead of next month's renewal, should we keep your 25-seat plan as-is?",
  },
];

export function BenchStudio() {
  const [entries, setEntries] = useState<Entry[]>(seed);
  const [person, setPerson] = useState("");
  const [role, setRole] = useState("Account Executive");
  const [text, setText] = useState("");

  const messages: Message[] = useMemo(
    () =>
      entries.map((entry) => ({
        id: entry.id,
        conversationId: "bench",
        sender: "you" as const,
        name: entry.person,
        text: entry.text,
        sentAt: "2026-10-19T00:00:00.000Z",
        tone: analyzeHeuristic(entry.text),
      })),
    [entries],
  );
  const climate = computeClimate(messages);

  function add() {
    if (!person.trim() || !text.trim()) return;
    setEntries((prev) => [
      {
        id: `${Date.now()}`,
        person: person.trim(),
        role: role.trim() || "Team Member",
        studioSlug: "deal",
        text: text.trim(),
      },
      ...prev,
    ]);
    setText("");
  }

  function calibrateEntry(id: string) {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== id) return entry;
        const calibrated = studioRewrite(entry.studioSlug, entry.text);
        return {
          ...entry,
          text: calibrated.rewrite,
        };
      }),
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-5">
        <div className="obsidian-surface rounded-[1.6rem] p-6 text-foam">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
            Team Outbound Pulse
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foam/80">
            Team members volunteer high-stakes outbound drafts before sending. Calibrate any tense card on the right and watch the team clarity index rise.
          </p>
          <div className="mt-5 rounded-2xl bg-white/95 p-5 text-ink">
            <ClimateMeter climate={climate} />
          </div>
        </div>

        <div className="card-surface rounded-[1.6rem] p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
            Post a Volunteer Outbound Draft
          </p>
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <input
                value={person}
                onChange={(event) => setPerson(event.target.value)}
                placeholder="Your name (e.g. Alex)"
                className="w-full rounded-xl bg-white px-3.5 py-2.5 text-sm shadow-[inset_0_0_0_1px_var(--line-strong)] outline-none ring-sea/30 focus:ring-2"
              />
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Role (e.g. Support Lead)"
                className="w-full rounded-xl bg-white px-3.5 py-2.5 text-sm shadow-[inset_0_0_0_1px_var(--line-strong)] outline-none ring-sea/30 focus:ring-2"
              />
            </div>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={4}
              placeholder="Paste the customer or team message you want the bench to review…"
              className="w-full resize-y rounded-xl bg-white px-3.5 py-2.5 text-sm shadow-[inset_0_0_0_1px_var(--line-strong)] outline-none ring-sea/30 focus:ring-2"
            />
            <button
              type="button"
              onClick={add}
              className="rounded-full bg-obsidian px-5 py-2.5 text-xs font-semibold text-foam transition hover:bg-sea-deep"
            >
              Post to Calibration Board →
            </button>
          </div>
        </div>
      </div>

      <ul className="space-y-4">
        {entries.map((entry, idx) => {
          const msg = messages[idx];
          const toneLabel = msg?.tone?.label || "neutral";
          const needsCalibration = toneLabel === "negative" || toneLabel === "destructive";
          return (
            <li
              key={entry.id}
              className="card-surface rounded-[1.5rem] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{entry.person}</p>
                  <p className="font-mono text-[11px] text-ink-soft/70">{entry.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ToneBadge label={toneLabel} score={msg?.tone?.score} />
                  {needsCalibration && (
                    <button
                      type="button"
                      onClick={() => calibrateEntry(entry.id)}
                      className="rounded-full bg-obsidian px-3 py-1 text-[11px] font-semibold text-gold transition hover:bg-sea-deep"
                    >
                      ✦ Calibrate Draft
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">
                “{entry.text}”
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
