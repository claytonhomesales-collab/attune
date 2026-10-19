"use client";

import { useMemo, useState } from "react";
import { getProduct } from "@/lib/catalog";
import { parseThread, suggestNextLine } from "@/lib/studio/rewrite";
import { computeClimate } from "@/lib/tone/climate";
import type { Message } from "@/lib/tone/types";
import { ClimateMeter } from "@/components/climate-meter";
import { ToneBadge } from "@/components/tone-badge";

const starter = getProduct("thread")?.samples[0]?.text ?? "";

export function ThreadStudio() {
  const [text, setText] = useState(starter);
  const lines = useMemo(() => parseThread(text), [text]);
  const messages: Message[] = lines.map((line, index) => ({
    id: String(index),
    conversationId: "thread",
    sender: line.mine ? "you" : "them",
    name: line.speaker,
    text: line.text,
    sentAt: "2026-10-19T00:00:00.000Z",
    tone: line.tone,
  }));
  const climate = computeClimate(messages);
  const next = suggestNextLine(lines);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <label className="text-xs uppercase tracking-[0.14em] text-ink-soft/70" htmlFor="thread">
          Transcript
        </label>
        <textarea
          id="thread"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={12}
          className="mt-2 w-full resize-y rounded-2xl bg-white px-4 py-3 font-mono text-sm leading-relaxed text-ink shadow-[inset_0_0_0_1px_var(--line)] outline-none ring-sea/30 focus:ring-2"
        />
        <p className="mt-2 text-xs text-ink-soft">One line per message. Start with a name and a colon.</p>
      </div>
      <div className="space-y-4">
        <div className="rounded-[1.35rem] bg-white/85 p-5 shadow-[inset_0_0_0_1px_var(--line)]">
          <ClimateMeter climate={climate} />
        </div>
        <div className="space-y-3">
          {lines.map((line, index) => (
            <div key={`${line.speaker}-${index}`} className="rounded-2xl bg-white/80 px-4 py-3 shadow-[inset_0_0_0_1px_var(--line)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink">{line.speaker}</p>
                <ToneBadge label={line.tone.label} />
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{line.text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[1.35rem] bg-sea-deep p-5 text-foam">
          <p className="text-xs uppercase tracking-[0.14em] text-foam/70">Next line</p>
          <p className="mt-2 text-[15px] leading-relaxed">{next}</p>
        </div>
      </div>
    </div>
  );
}
