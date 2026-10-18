"use client";

import { useEffect, useState, useTransition } from "react";
import { useAttune } from "@/lib/store/attune-store";
import { ToneBadge } from "./tone-badge";
import type { ToneResult } from "@/lib/tone/types";
import { analyzeHeuristic, softenSuggestion } from "@/lib/tone/heuristic";

export function Composer({ conversationId }: { conversationId: string }) {
  const { sendMessage, plan } = useAttune();
  const [text, setText] = useState("");
  const [tone, setTone] = useState<ToneResult | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [rewrite, setRewrite] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!text.trim()) {
      setTone(null);
      setTip(null);
      setRewrite(null);
      return;
    }

    const handle = window.setTimeout(() => {
      startTransition(() => {
        const local = analyzeHeuristic(text);
        setTone(local);
        setTip(softenSuggestion(text, local));
      });
    }, 220);

    return () => window.clearTimeout(handle);
  }, [text]);

  async function onSend() {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    try {
      await sendMessage(conversationId, value);
      setText("");
      setTone(null);
      setTip(null);
      setRewrite(null);
    } finally {
      setSending(false);
    }
  }

  async function askCoach() {
    if (plan === "free") return;
    const res = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return;
    const data = (await res.json()) as { tip: string | null; rewrite: string | null };
    if (data.tip) setTip(data.tip);
    if (data.rewrite) setRewrite(data.rewrite);
  }

  const warn =
    tone && (tone.label === "negative" || tone.label === "destructive");

  return (
    <div className="border-t border-[var(--line)] bg-foam/90 p-4 backdrop-blur md:p-5">
      {warn && tip && (
        <div
          className={`tone-${tone.label} mb-3 animate-rise rounded-xl px-3.5 py-3 text-sm`}
          style={{
            background: "color-mix(in oklab, var(--tone) 10%, white)",
            boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--tone) 25%, transparent)",
          }}
        >
          <p className="font-medium text-ink">Before you send</p>
          <p className="mt-1 text-ink-soft">{tip}</p>
          {plan !== "free" && (
            <button
              type="button"
              onClick={askCoach}
              className="mt-2 text-sm font-medium text-sea underline-offset-2 hover:underline"
            >
              Soften with coach
            </button>
          )}
          {rewrite && (
            <button
              type="button"
              onClick={() => setText(rewrite)}
              className="mt-2 block w-full rounded-lg bg-white px-3 py-2 text-left text-sm text-ink shadow-[inset_0_0_0_1px_var(--line)]"
            >
              Use rewrite: “{rewrite}”
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
            placeholder="Write a message…"
            className="w-full resize-none rounded-2xl border-0 bg-white px-4 py-3 text-[15px] text-ink shadow-[inset_0_0_0_1px_var(--line)] outline-none ring-sea/30 placeholder:text-ink-soft/45 focus:ring-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void onSend();
              }
            }}
          />
          <div className="pointer-events-none absolute bottom-2.5 right-3 flex items-center gap-2">
            {tone && !pending && <ToneBadge label={tone.label} />}
          </div>
        </div>
        <button
          type="button"
          onClick={() => void onSend()}
          disabled={!text.trim() || sending}
          className="rounded-2xl bg-sea-deep px-5 py-3 text-sm font-semibold text-foam transition hover:bg-sea disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </div>
      {plan === "free" && warn && (
        <p className="mt-2 text-xs text-ink-soft/70">
          Live draft coach unlocks on Plus — heuristics still catch sharp language.
        </p>
      )}
    </div>
  );
}
