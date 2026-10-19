"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { formatMoney, getBundle, getProduct } from "@/lib/catalog";
import { lineName, useCart } from "@/lib/store/cart";

export default function CartPage() {
  const cart = useCart();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function checkout() {
    setPending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart.lines }),
      });
      const data = (await res.json()) as { url?: string; message?: string; configured?: boolean };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setMessage(
        data.configured === false
          ? "The cart is built. Checkout starts charging when STRIPE_SECRET_KEY is set on Vercel."
          : data.message || "Checkout could not start.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-16 pt-4">
          <h1 className="font-display text-4xl text-sea-deep">Cart</h1>
          {cart.lines.length === 0 ? (
            <p className="mt-4 text-ink-soft">
              Nothing here yet.{" "}
              <Link href="/" className="text-sea">
                Browse the store
              </Link>
              .
            </p>
          ) : (
            <>
              <ul className="mt-6 divide-y divide-[var(--line)]">
                {cart.lines.map((line) => {
                  const price =
                    line.kind === "bundle"
                      ? getBundle(line.slug)?.priceMonthly
                      : getProduct(line.slug)?.priceMonthly;
                  return (
                    <li key={`${line.kind}-${line.slug}`} className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium text-ink">{lineName(line)}</p>
                        <p className="text-xs uppercase tracking-[0.12em] text-ink-soft/60">
                          {line.kind}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-ink">{formatMoney(price || 0)}/mo</p>
                        <button
                          type="button"
                          onClick={() => cart.remove(line)}
                          className="text-sm text-sea"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex items-center justify-between">
                <p className="font-display text-3xl text-sea-deep">
                  {formatMoney(cart.monthlyCents)}
                  <span className="font-sans text-base text-ink-soft"> /mo</span>
                </p>
                <button
                  type="button"
                  onClick={() => void checkout()}
                  disabled={pending}
                  className="rounded-full bg-sea-deep px-5 py-2.5 text-sm font-semibold text-foam disabled:opacity-50"
                >
                  {pending ? "Opening…" : "Checkout"}
                </button>
              </div>
              {message && <p className="mt-4 text-sm text-ink-soft">{message}</p>}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
