"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { studioRewrite, type StudioResult } from "@/lib/studio/rewrite";
import { ToneBadge } from "@/components/tone-badge";

export function CoachStudio({ product }: { product: Product }) {
  const [text, setText] = useState(product.samples[0]?.text ?? "");
  const [result, setResult] = useState<StudioResult | null>(null);
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);

  async function rewrite() {
    const local = studioRewrite(product.slug, text);
    setResult(local);
    setPending(true);
    try {
      const res = await fetch("/api/studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, text }),
      });
      if (res.ok) setResult((await res.json()) as StudioResult);
    } finally {
      setPending(false);
    }
  }

  async function copy() {
    if (!result?.rewrite) return;
    await navigator.clipboard.writeText(result.rewrite);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <label className="text-xs uppercase tracking-[0.14em] text-ink-soft/70" htmlFor="draft">
          Draft
        </label>
        <textarea
          id="draft"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={8}
          className="mt-2 w-full resize-y rounded-2xl bg-white px-4 py-3 text-[15px] leading-relaxed text-ink shadow-[inset_0_0_0_1px_var(--line)] outline-none ring-sea/30 focus:ring-2"
          placeholder="Paste the message you almost sent…"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {product.samples.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => setText(sample.text)}
              className="rounded-full bg-white px-3 py-1 text-xs text-ink-soft shadow-[inset_0_0_0_1px_var(--line)] hover:text-ink"
            >
              {sample.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => void rewrite()}
          className="mt-4 rounded-full bg-sea-deep px-5 py-2.5 text-sm font-semibold text-foam hover:bg-sea"
        >
          {pending ? "Rewriting…" : `Rewrite in ${product.name}`}
        </button>
      </div>

      <div className="rounded-[1.35rem] bg-white/85 p-5 shadow-[inset_0_0_0_1px_var(--line)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-ink-soft/70">Ready to send</p>
          {result && <ToneBadge label={result.tone.label} />}
        </div>
        <p className="mt-4 min-h-28 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
          {result?.rewrite || "Your rewrite will land here."}
        </p>
        {result && (
          <ul className="mt-4 space-y-1 text-sm text-ink-soft">
            {result.notes.map((note) => (
              <li key={note}>· {note}</li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => void copy()}
          disabled={!result?.rewrite}
          className="mt-5 rounded-full px-4 py-2 text-sm font-semibold text-sea disabled:opacity-40"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
