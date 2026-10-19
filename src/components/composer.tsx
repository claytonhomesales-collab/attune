"use client";

import { useMemo, useState } from "react";
import { useAttune } from "@/lib/store/attune-store";
import { studioRewrite } from "@/lib/studio/rewrite";
import { analyzeHeuristic, softenSuggestion } from "@/lib/tone/heuristic";
import { ToneBadge } from "./tone-badge";

export function Composer({ conversationId }: { conversationId: string }) {
  const { sendMessage } = useAttune();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const analysis = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    const tone = analyzeHeuristic(trimmed);
    const tip = softenSuggestion(trimmed, tone);
    const rewrite =
      tone.label === "negative" || tone.label === "destructive"
        ? studioRewrite("pause", trimmed).rewrite
        : null;
    return { tone, tip, rewrite };
  }, [text]);

  async function onSend() {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    try {
      await sendMessage(conversationId, value);
      setText("");
    } finally {
      setSending(false);
    }
  }

  const tone = analysis?.tone ?? null;
  const tip = analysis?.tip ?? null;
  const rewrite = analysis?.rewrite ?? null;
  const warn =
    tone && (tone.label === "negative" || tone.label === "destructive");

  return (
    <div className="border-t border-[var(--line)] bg-foam/95 p-4 backdrop-blur md:p-5">
      {warn && tip && (
        <div
          className={`tone-${tone.label} mb-3.5 animate-rise rounded-2xl px-4 py-3.5 text-sm`}
          style={{
            background: "color-mix(in oklab, var(--tone) 9%, white)",
            boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--tone) 28%, transparent)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
              Pause Intercept · Before You Send
            </p>
            <ToneBadge label={tone.label} score={tone.score} />
          </div>
          <p className="mt-1 text-xs text-ink-soft">{tip}</p>
          {rewrite && (
            <button
              type="button"
              onClick={() => setText(rewrite)}
              className="mt-2.5 block w-full rounded-xl bg-white px-3.5 py-2.5 text-left text-xs font-medium text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] transition hover:bg-sea/8"
            >
              <span className="block font-mono text-[10px] uppercase tracking-wider text-sea">
                Click to apply calibrated rewrite:
              </span>
              <span className="mt-0.5 block text-sm text-ink">“{rewrite}”</span>
            </button>
          )}
        </div>
      )}

      <div className="flex items-end gap-3">
        <div className="relative min-w-0 flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="Write a message… (try typing “You always ignore me” to test live intercept)"
            className="w-full resize-none rounded-2xl border-0 bg-white px-4 py-3 text-[15px] text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] outline-none ring-sea/30 placeholder:text-ink-soft/45 focus:ring-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void onSend();
              }
            }}
          />
          <div className="pointer-events-none absolute bottom-2.5 right-3 flex items-center gap-2">
            {tone && <ToneBadge label={tone.label} score={tone.score} />}
          </div>
        </div>
        <button
          type="button"
          onClick={() => void onSend()}
          disabled={!text.trim() || sending}
          className="rounded-2xl bg-obsidian px-5 py-3 text-sm font-semibold text-foam transition hover:bg-sea-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
