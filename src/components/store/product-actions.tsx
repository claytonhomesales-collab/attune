"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CartLine } from "@/lib/store/cart";
import { useCart } from "@/lib/store/cart";

export function ProductActions({
  line,
  openHref,
  emphasis = false,
  dark = false,
}: {
  line: CartLine;
  openHref?: string;
  emphasis?: boolean;
  dark?: boolean;
}) {
  const cart = useCart();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const owned = cart.has(line);

  async function buyNow() {
    setPending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: [line] }),
      });
      const data = (await res.json()) as { url?: string; message?: string; configured?: boolean };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setMessage(
        data.configured === false
          ? "Checkout is ready. Add your Stripe secret key on Vercel to process live cards."
          : data.message || "Checkout could not start.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {openHref && (
        <button
          type="button"
          onClick={() => router.push(openHref)}
          className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
            dark
              ? "bg-gold text-obsidian hover:bg-gold/90"
              : emphasis
                ? "bg-obsidian text-foam hover:bg-sea-deep"
                : "bg-obsidian text-foam hover:bg-sea-deep"
          }`}
        >
          Open Studio →
        </button>
      )}
      <button
        type="button"
        onClick={() => cart.add(line)}
        className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
          dark
            ? owned
              ? "bg-white/20 text-white ring-1 ring-white/30"
              : "bg-white/10 text-foam ring-1 ring-white/20 hover:bg-white/20"
            : owned
              ? "bg-sea/15 text-sea-deep ring-1 ring-sea/30"
              : !openHref && emphasis
                ? "bg-obsidian text-foam hover:bg-sea-deep"
                : "bg-white text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-mist/70"
        }`}
      >
        {owned ? "✓ In Cart" : "Add to Cart"}
      </button>
      <button
        type="button"
        onClick={() => void buyNow()}
        disabled={pending}
        className={`rounded-full px-3.5 py-2 text-xs font-semibold transition disabled:opacity-50 ${
          dark
            ? "text-gold hover:bg-white/10"
            : "text-sea-deep hover:bg-sea/10"
        }`}
      >
        {pending ? "Opening Stripe…" : "Subscribe Now"}
      </button>
      {message && (
        <p className={`w-full text-xs leading-relaxed ${dark ? "text-foam/75" : "text-ink-soft"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
