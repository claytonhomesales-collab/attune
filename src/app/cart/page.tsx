"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
          ? "The cart is ready. Checkout processes live payments once STRIPE_SECRET_KEY is configured."
          : data.message || "Checkout could not start.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave atelier-grid pointer-events-none fixed inset-0 opacity-75" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-sea">
            Stripe Verified Checkout
          </p>
          <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Your Cart</h1>

          {cart.lines.length === 0 ? (
            <div className="card-surface mt-8 rounded-[1.6rem] p-8 text-center">
              <p className="font-display text-2xl text-ink">Your cart is currently empty.</p>
              <p className="mt-2 text-sm text-ink-soft">
                Add any individual communication instrument or save up to 45% with a curated suite.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-obsidian px-5 py-2.5 text-xs font-semibold text-foam hover:bg-sea-deep"
                >
                  Browse All 12 Instruments
                </Link>
                <Link
                  href="/#bundles"
                  className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-ink shadow-[inset_0_0_0_1px_var(--line-strong)]"
                >
                  View Suites
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <ul className="card-surface divide-y divide-[var(--line)] rounded-[1.6rem] px-6">
                {cart.lines.map((line) => {
                  const item =
                    line.kind === "bundle" ? getBundle(line.slug) : getProduct(line.slug);
                  const price = item?.priceMonthly;
                  return (
                    <li
                      key={`${line.kind}-${line.slug}`}
                      className="flex items-center justify-between gap-4 py-5"
                    >
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-sea">
                          {line.kind === "bundle" ? "Curated Suite" : "Individual Instrument"}
                        </span>
                        <p className="font-display text-2xl text-ink">{lineName(line)}</p>
                        {item?.summary && (
                          <p className="mt-0.5 text-xs text-ink-soft">{item.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-mono text-sm font-semibold text-ink">
                          {formatMoney(price || 0)}/mo
                        </p>
                        <button
                          type="button"
                          onClick={() => cart.remove(line)}
                          className="rounded-full bg-foam px-3 py-1 text-xs font-medium text-ink-soft hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="obsidian-surface flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] p-6 text-foam">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                    Monthly Total · Cancel Anytime
                  </span>
                  <p className="mt-1 font-display text-4xl text-white">
                    {formatMoney(cart.monthlyCents)}
                    <span className="font-sans text-sm text-foam/65"> / month</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void checkout()}
                  disabled={pending}
                  className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-obsidian transition hover:bg-gold/90 disabled:opacity-50"
                >
                  {pending ? "Opening Stripe Checkout…" : "Proceed to Stripe Checkout →"}
                </button>
              </div>
              {message && <p className="text-sm text-ink-soft">{message}</p>}
            </div>
          )}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
