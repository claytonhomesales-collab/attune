"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductEmblem } from "@/components/product-emblem";
import { getProduct, products } from "@/lib/catalog";

type Library = { slugs: string[]; email?: string; billing: boolean };

export default function LibraryPage() {
  const [library, setLibrary] = useState<Library | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/library");
    if (res.ok) setLibrary((await res.json()) as Library);
  }

  useEffect(() => {
    let active = true;
    void fetch("/api/library").then(async (res) => {
      if (active && res.ok) setLibrary((await res.json()) as Library);
    });
    return () => {
      active = false;
    };
  }, []);

  async function restore() {
    setMessage(null);
    const res = await fetch("/api/library/restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await res.json()) as { message?: string; slugs?: string[] };
    if (!res.ok) {
      setMessage(data.message || "Could not restore.");
      return;
    }
    setMessage("Library restored.");
    await refresh();
  }

  async function portal() {
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = (await res.json()) as { url?: string; message?: string };
    if (data.url) window.location.href = data.url;
    else setMessage(data.message || "Billing portal is not available yet.");
  }

  const owned = (library?.slugs || [])
    .map((slug) => getProduct(slug))
    .filter((product) => Boolean(product));

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave atelier-grid pointer-events-none fixed inset-0 opacity-75" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-8 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line-strong)] pb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-sea">
                Entitlements & Studios
              </p>
              <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Your Library</h1>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">
                Instruments unlocked on this browser via Stripe Checkout, plus instant access to all twelve interactive studios.
              </p>
            </div>
            {library?.email && (
              <span className="rounded-full bg-sea/12 px-4 py-1.5 font-mono text-xs font-medium text-sea-deep">
                Active Account: {library.email}
              </span>
            )}
          </div>

          {owned.length > 0 && (
            <section className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-sea">
                Subscribed Instruments ({owned.length})
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {owned.map((product) =>
                  product ? (
                    <Link
                      key={product.slug}
                      href={product.href}
                      className="card-surface card-surface-hover flex items-center justify-between rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-obsidian text-gold">
                          <ProductEmblem slug={product.slug} className="size-5" />
                        </span>
                        <div>
                          <span className="block font-display text-2xl text-ink">
                            {product.name}
                          </span>
                          <span className="text-xs text-ink-soft">{product.summary}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-obsidian px-3.5 py-1.5 text-xs font-semibold text-foam">
                        Launch →
                      </span>
                    </Link>
                  ) : null,
                )}
              </div>
            </section>
          )}

          <section className="mt-10">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft/75">
                All 12 Interactive Studios (Quick Launch)
              </p>
              <Link href="/#bundles" className="text-xs font-semibold text-sea hover:underline">
                View Full-Access Suites →
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={product.href}
                  className="card-surface card-surface-hover flex items-center justify-between gap-3 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-sea/10 text-sea-deep">
                      <ProductEmblem slug={product.slug} className="size-4" />
                    </span>
                    <div>
                      <p className="font-display text-lg text-ink">{product.name}</p>
                      <p className="text-[11px] text-ink-soft">{product.eyebrow}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-sea-deep">Open →</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="obsidian-surface mt-12 rounded-[1.6rem] p-6 text-foam md:p-8">
            <h2 className="font-display text-2xl text-white">Restore or Manage Stripe Subscription</h2>
            <p className="mt-2 max-w-xl text-sm text-foam/75">
              Enter the email address used during Stripe Checkout to sync your active entitlements onto this browser, or open the Stripe customer billing portal.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@company.com"
                className="min-w-64 flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-foam/45 outline-none ring-1 ring-white/20 focus:ring-gold"
              />
              <button
                type="button"
                onClick={() => void restore()}
                className="rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-obsidian transition hover:bg-gold/90"
              >
                Restore Purchases
              </button>
              <button
                type="button"
                onClick={() => void portal()}
                className="rounded-full bg-white/10 px-5 py-2.5 text-xs font-semibold text-foam ring-1 ring-white/15 transition hover:bg-white/20"
              >
                Stripe Billing Portal
              </button>
            </div>
            {message && <p className="mt-3 text-xs text-gold">{message}</p>}
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
