"use client";

import { useMemo, useState } from "react";
import { getProduct } from "@/lib/catalog";
import { parseThread, suggestThreadNextOptions } from "@/lib/studio/rewrite";
import { computeClimate } from "@/lib/tone/climate";
import type { Message } from "@/lib/tone/types";
import { ClimateMeter } from "@/components/climate-meter";
import { ToneBadge } from "@/components/tone-badge";

const threadProduct = getProduct("thread");
const samples = threadProduct?.samples ?? [];
const starter = samples[0]?.text ?? "";

export function ThreadStudio() {
  const [text, setText] = useState(starter);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);
  const [copied, setCopied] = useState(false);

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
  const nextOptions = useMemo(() => suggestThreadNextOptions(lines), [lines]);
  const activeOption = nextOptions[selectedOptionIdx] ?? nextOptions[0];

  function appendReplyToThread() {
    if (!activeOption) return;
    setText((prev) => `${prev.trim()}\nYou: ${activeOption.text}`);
  }

  async function copyNext() {
    if (!activeOption?.text) return;
    await navigator.clipboard.writeText(activeOption.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      {samples.length > 0 && (
        <div className="card-surface rounded-2xl p-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/75">
            Sample Exchange Transcripts · Click to Inspect
          </span>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {samples.map((sample) => {
              const active = text.trim().startsWith(sample.text.trim());
              return (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => {
                    setText(sample.text);
                    setSelectedOptionIdx(0);
                  }}
                  className={`flex flex-col items-start rounded-xl p-3 text-left transition ${
                    active
                      ? "bg-obsidian text-foam shadow-sm"
                      : "bg-foam/90 text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-white"
                  }`}
                >
                  <span className={`text-xs font-semibold ${active ? "text-gold" : "text-ink"}`}>
                    {sample.label}
                  </span>
                  {sample.context && (
                    <span
                      className={`mt-1 line-clamp-1 text-[11px] ${
                        active ? "text-foam/70" : "text-ink-soft"
                      }`}
                    >
                      {sample.context}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card-surface flex flex-col justify-between rounded-[1.6rem] p-6">
          <div>
            <label
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70"
              htmlFor="thread"
            >
              Conversation Transcript
            </label>
            <p className="mt-1 text-xs text-ink-soft">
              One line per message. Prefix with speaker name and colon (use “You:” for your own sends).
            </p>
            <textarea
              id="thread"
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={11}
              className="mt-4 w-full resize-y rounded-2xl bg-white px-4 py-3.5 font-mono text-xs leading-relaxed text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] outline-none ring-sea/30 focus:ring-2"
            />
          </div>

          <div className="mt-5 rounded-2xl bg-foam p-5 shadow-[inset_0_0_0_1px_var(--line)]">
            <ClimateMeter climate={climate} />
          </div>
        </div>

        <div className="space-y-5">
          {/* Parsed Message Timeline */}
          <div className="card-surface rounded-[1.6rem] p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
                Line-by-Line Tone Arc ({lines.length} messages)
              </p>
              <span className="font-mono text-xs text-sea">Speaker Telemetry</span>
            </div>
            <div className="mt-4 space-y-3">
              {lines.map((line, index) => (
                <div
                  key={`${line.speaker}-${index}`}
                  className={`rounded-2xl px-4 py-3 shadow-[inset_0_0_0_1px_var(--line)] ${
                    line.mine ? "bg-sea/8 ml-4" : "bg-white mr-4"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold text-ink">
                      {line.speaker} {line.mine ? "(You)" : ""}
                    </span>
                    <ToneBadge label={line.tone.label} score={line.tone.score} />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink">{line.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calibrated Next Send Deck */}
          <div className="obsidian-surface rounded-[1.6rem] p-6 text-foam">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                Calibrated Next Reply
              </p>
              <span className="font-mono text-[11px] text-foam/60">
                Select strategy
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {nextOptions.map((opt, idx) => {
                const active = idx === selectedOptionIdx;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedOptionIdx(idx)}
                    className={`rounded-xl p-2.5 text-left transition ${
                      active
                        ? "bg-gold text-obsidian"
                        : "bg-white/8 text-foam/80 ring-1 ring-white/10 hover:bg-white/15"
                    }`}
                  >
                    <span className="block text-xs font-semibold">{opt.label}</span>
                    <span
                      className={`mt-0.5 block line-clamp-1 text-[10px] ${
                        active ? "text-obsidian/75" : "text-foam/55"
                      }`}
                    >
                      {opt.intent}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl bg-black/35 p-4 ring-1 ring-gold/30">
              <p className="text-[15px] leading-relaxed text-white">
                “{activeOption?.text}”
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={appendReplyToThread}
                className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-obsidian transition hover:bg-gold/90"
              >
                + Append to Thread & Watch Climate Warm
              </button>
              <button
                type="button"
                onClick={() => void copyNext()}
                className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-foam ring-1 ring-white/15 transition hover:bg-white/20"
              >
                {copied ? "✓ Copied" : "Copy Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
