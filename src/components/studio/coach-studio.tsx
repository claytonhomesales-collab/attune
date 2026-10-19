"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import {
  studioRewrite,
  type StudioResult,
  type VoiceCalibration,
} from "@/lib/studio/rewrite";
import { scoreToPercent } from "@/lib/tone/climate";
import { analyzeHeuristic } from "@/lib/tone/heuristic";
import { ToneBadge } from "@/components/tone-badge";

const voiceTabs: { id: keyof VoiceCalibration; label: string; desc: string }[] = [
  { id: "direct", label: "Direct & Clear", desc: "Firm boundary, concrete ask" },
  { id: "warm", label: "Warm & Collaborative", desc: "Softens landing, keeps point" },
  { id: "concise", label: "Short & Crisp", desc: "One-breath SMS / Slack length" },
];

export function CoachStudio({ product }: { product: Product }) {
  const initialText = product.samples[0]?.text ?? "";
  const [text, setText] = useState(initialText);
  const [result, setResult] = useState<StudioResult>(() =>
    studioRewrite(product.slug, initialText),
  );
  const [voice, setVoice] = useState<keyof VoiceCalibration>("direct");
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);

  const liveDraftTone = useMemo(() => analyzeHeuristic(text), [text]);

  async function runCalibration(nextText?: string) {
    const target = typeof nextText === "string" ? nextText : text;
    const local = studioRewrite(product.slug, target);
    setResult(local);
    setPending(true);
    try {
      const res = await fetch("/api/studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, text: target }),
      });
      if (res.ok) {
        const remote = (await res.json()) as StudioResult;
        setResult(remote);
      }
    } finally {
      setPending(false);
    }
  }

  function selectSample(sampleText: string) {
    setText(sampleText);
    setResult(studioRewrite(product.slug, sampleText));
  }

  const activeRewrite =
    result.calibrations?.[voice] || result.rewrite || "";

  async function copy() {
    if (!activeRewrite) return;
    await navigator.clipboard.writeText(activeRewrite);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  const beforeScore = scoreToPercent(liveDraftTone.score);
  const afterScore = scoreToPercent(result.afterTone?.score ?? 0.75);

  return (
    <div className="space-y-6">
      {/* Scenario Selector Bar */}
      {product.samples.length > 0 && (
        <div className="card-surface rounded-2xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/75">
              Real-World Scenarios · Click to Load
            </span>
            <span className="font-mono text-[11px] text-sea">
              {product.samples.length} Presets Ready
            </span>
          </div>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {product.samples.map((sample) => {
              const isSelected = text.trim() === sample.text.trim();
              return (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => selectSample(sample.text)}
                  className={`flex flex-col items-start rounded-xl p-3 text-left transition ${
                    isSelected
                      ? "bg-obsidian text-foam shadow-sm ring-1 ring-obsidian"
                      : "bg-foam/90 text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-white"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? "text-gold" : "text-ink"
                    }`}
                  >
                    {sample.label}
                  </span>
                  {sample.context && (
                    <span
                      className={`mt-1 line-clamp-1 text-[11px] ${
                        isSelected ? "text-foam/70" : "text-ink-soft"
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

      {/* Main Split Studio */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.08fr]">
        {/* Left: Raw Draft & Telemetry */}
        <div className="card-surface flex flex-col justify-between rounded-[1.6rem] p-6">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <label
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70"
                  htmlFor="draft"
                >
                  01 · Outbound Draft (Before)
                </label>
                <p className="mt-0.5 text-xs text-ink-soft">
                  Paste the raw message you are tempted to send
                </p>
              </div>
              <ToneBadge label={liveDraftTone.label} score={liveDraftTone.score} />
            </div>

            <textarea
              id="draft"
              value={text}
              onChange={(event) => {
                const next = event.target.value;
                setText(next);
                setResult(studioRewrite(product.slug, next));
              }}
              rows={7}
              className="mt-4 w-full resize-y rounded-2xl bg-white px-4 py-3.5 text-[15px] leading-relaxed text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] outline-none ring-sea/30 focus:ring-2"
              placeholder="Paste the message you almost sent…"
            />

            {/* Live Signal Diagnostics */}
            <div className="mt-4 rounded-2xl bg-foam p-4 shadow-[inset_0_0_0_1px_var(--line)]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft/70">
                  Draft Diagnostics
                </span>
                <span className="font-mono font-semibold text-ink">
                  Clarity Index: {beforeScore}/100
                </span>
              </div>
              <p className="mt-1.5 text-xs text-ink-soft">{liveDraftTone.summary}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {liveDraftTone.signals.map((sig) => (
                  <span
                    key={sig}
                    className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-ink-soft shadow-[inset_0_0_0_1px_var(--line)]"
                  >
                    {sig}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
            <button
              type="button"
              onClick={() => void runCalibration()}
              className="rounded-full bg-obsidian px-6 py-2.5 text-xs font-semibold tracking-wide text-foam transition hover:bg-sea-deep"
            >
              {pending ? "Calibrating…" : `Calibrate in ${product.name} →`}
            </button>
            <button
              type="button"
              onClick={() => {
                setText("");
                setResult(studioRewrite(product.slug, ""));
              }}
              className="text-xs font-medium text-ink-soft hover:text-ink"
            >
              Clear draft
            </button>
          </div>
        </div>

        {/* Right: Calibrated Output Deck */}
        <div className="obsidian-surface flex flex-col justify-between rounded-[1.6rem] p-6 text-foam">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                  02 · Calibrated Ready-to-Send
                </p>
                <p className="mt-0.5 text-xs text-foam/70">
                  Select the voice that matches the relationship
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs ring-1 ring-white/15">
                <span className="text-[#ff9c93]">{beforeScore}</span>
                <span className="text-foam/40">→</span>
                <span className="font-semibold text-[#7fe3b4]">{afterScore}/100</span>
              </div>
            </div>

            {/* 3 Voice Calibration Tabs */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {voiceTabs.map((tab) => {
                const active = voice === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setVoice(tab.id)}
                    className={`rounded-xl p-2.5 text-left transition ${
                      active
                        ? "bg-gold text-obsidian shadow-sm"
                        : "bg-white/8 text-foam/80 ring-1 ring-white/10 hover:bg-white/14"
                    }`}
                  >
                    <span className="block text-xs font-semibold">{tab.label}</span>
                    <span
                      className={`mt-0.5 block text-[10px] ${
                        active ? "text-obsidian/75" : "text-foam/55"
                      }`}
                    >
                      {tab.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Rewritten Message Box */}
            <div className="mt-4 rounded-2xl bg-black/35 p-5 ring-1 ring-gold/30">
              <p className="min-h-28 whitespace-pre-wrap text-[16px] leading-relaxed text-white">
                {activeRewrite || "Paste a draft on the left to generate calibrated options."}
              </p>
            </div>

            {/* Editorial Notes: Why this works */}
            {result.notes.length > 0 && (
              <div className="mt-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  What Shifted & Why
                </p>
                <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-foam/80">
                  {result.notes.map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void copy()}
                disabled={!activeRewrite}
                className="rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-obsidian transition hover:bg-gold/90 disabled:opacity-40"
              >
                {copied ? "✓ Copied to Clipboard" : "Copy Calibrated Message"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (activeRewrite) setText(activeRewrite);
                }}
                disabled={!activeRewrite}
                className="rounded-full bg-white/10 px-4 py-2.5 text-xs font-medium text-foam ring-1 ring-white/15 transition hover:bg-white/20 disabled:opacity-40"
              >
                Replace Draft
              </button>
            </div>
            <span className="font-mono text-[11px] text-foam/50">
              {activeRewrite.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
