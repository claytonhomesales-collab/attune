"use client";

import { useMemo, useState } from "react";
import { analyzeHeuristic } from "@/lib/tone/heuristic";
import { computeClimate } from "@/lib/tone/climate";
import type { Message } from "@/lib/tone/types";
import { ClimateMeter } from "@/components/climate-meter";
import { ToneBadge } from "@/components/tone-badge";

type Entry = { id: string; person: string; text: string };

const seed: Entry[] = [
  {
    id: "1",
    person: "Nora",
    text: "Checking in on the proposal. I can send a one-page summary if that helps you decide this week.",
  },
  {
    id: "2",
    person: "Chris",
    text: "This is the third email. You never respond and I am done being polite.",
  },
];

export function BenchStudio() {
  const [entries, setEntries] = useState<Entry[]>(seed);
  const [person, setPerson] = useState("");
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
      { id: `${Date.now()}`, person: person.trim(), text: text.trim() },
      ...prev,
    ]);
    setText("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm leading-relaxed text-ink-soft">
          People add their own outbound drafts. Bench never reads a private phone.
        </p>
        <div className="mt-4 space-y-3 rounded-[1.35rem] bg-white/85 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
          <input
            value={person}
            onChange={(event) => setPerson(event.target.value)}
            placeholder="Name"
            className="w-full rounded-xl bg-foam px-3 py-2 text-sm outline-none ring-sea/30 focus:ring-2"
          />
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={4}
            placeholder="The line they are about to send"
            className="w-full resize-y rounded-xl bg-foam px-3 py-2 text-sm outline-none ring-sea/30 focus:ring-2"
          />
          <button
            type="button"
            onClick={add}
            className="rounded-full bg-sea-deep px-4 py-2 text-sm font-semibold text-foam"
          >
            Add to the board
          </button>
        </div>
        <div className="mt-4 rounded-[1.35rem] bg-white/85 p-5 shadow-[inset_0_0_0_1px_var(--line)]">
          <ClimateMeter climate={climate} />
        </div>
      </div>
      <ul className="space-y-3">
        {messages.map((message) => (
          <li
            key={message.id}
            className="rounded-2xl bg-white/85 px-4 py-3 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-ink">{message.name}</p>
              <ToneBadge label={message.tone?.label || "neutral"} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{message.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
