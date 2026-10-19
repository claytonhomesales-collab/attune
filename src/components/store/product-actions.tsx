"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CartLine } from "@/lib/store/cart";
import { useCart } from "@/lib/store/cart";

export function ProductActions({
  line,
  openHref,
  emphasis = false,
}: {
  line: CartLine;
  openHref?: string;
  emphasis?: boolean;
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
          ? "Checkout is ready. Add your Stripe secret key and this button charges for real."
          : data.message || "Checkout could not start.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => cart.add(line)}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          emphasis
            ? "bg-sea-deep text-foam hover:bg-sea"
            : "bg-white text-sea-deep shadow-[inset_0_0_0_1px_var(--line)] hover:bg-mist"
        }`}
      >
        {owned ? "In cart" : "Add"}
      </button>
      <button
        type="button"
        onClick={() => void buyNow()}
        disabled={pending}
        className="rounded-full px-4 py-2 text-sm font-semibold text-sea-deep hover:bg-white/60 disabled:opacity-50"
      >
        {pending ? "Opening…" : "Buy now"}
      </button>
      {openHref && (
        <button
          type="button"
          onClick={() => router.push(openHref)}
          className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft hover:text-ink"
        >
          Open
        </button>
      )}
      {message && <p className="w-full text-xs leading-relaxed text-ink-soft">{message}</p>}
    </div>
  );
}
