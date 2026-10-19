"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { getProduct } from "@/lib/catalog";

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
    void refresh();
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
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-4">
          <h1 className="font-display text-4xl text-sea-deep">Library</h1>
          <p className="mt-3 max-w-lg text-ink-soft">
            Apps you have subscribed to on this browser. Every app also opens as a full working
            trial from the store.
          </p>
          {library?.email && (
            <p className="mt-2 text-sm text-ink-soft">Purchased as {library.email}</p>
          )}

          <ul className="mt-8 space-y-3">
            {owned.length === 0 && (
              <li className="text-ink-soft">
                No purchases on this browser yet.{" "}
                <Link href="/" className="text-sea">
                  Visit the store
                </Link>
                .
              </li>
            )}
            {owned.map((product) =>
              product ? (
                <li key={product.slug}>
                  <Link
                    href={product.href}
                    className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-4 shadow-[inset_0_0_0_1px_var(--line)]"
                  >
                    <span>
                      <span className="block font-display text-2xl text-sea-deep">{product.name}</span>
                      <span className="text-sm text-ink-soft">{product.summary}</span>
                    </span>
                    <span className="text-sm text-sea">Open</span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>

          <section className="mt-12 rounded-[1.35rem] bg-white/80 p-5 shadow-[inset_0_0_0_1px_var(--line)]">
            <h2 className="font-display text-2xl text-sea-deep">Restore purchases</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Use the email from Stripe checkout to bring an active plan onto this device.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@example.com"
                className="min-w-56 flex-1 rounded-full bg-foam px-4 py-2 text-sm outline-none ring-sea/30 focus:ring-2"
              />
              <button
                type="button"
                onClick={() => void restore()}
                className="rounded-full bg-sea-deep px-4 py-2 text-sm font-semibold text-foam"
              >
                Restore
              </button>
              <button
                type="button"
                onClick={() => void portal()}
                className="rounded-full px-4 py-2 text-sm font-semibold text-sea"
              >
                Manage billing
              </button>
            </div>
            {message && <p className="mt-3 text-sm text-ink-soft">{message}</p>}
          </section>
        </main>
      </div>
    </div>
  );
}
