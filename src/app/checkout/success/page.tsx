"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/store/cart";

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { clear } = useCart();
  const [slugs, setSlugs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    void (async () => {
      const res = await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = (await res.json()) as { slugs?: string[]; message?: string };
      if (cancelled) return;
      if (!res.ok) {
        setError(data.message || "Could not confirm checkout.");
        return;
      }
      setSlugs(data.slugs || []);
      clear();
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId, clear]);

  const names = slugs
    .map((slug) => getProduct(slug)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 pb-16 pt-8">
      <h1 className="font-display text-4xl text-sea-deep">You are in.</h1>
      {error && <p className="mt-4 text-ink-soft">{error}</p>}
      {!error && (
        <p className="mt-4 text-ink-soft">
          {names.length
            ? `${names.join(", ")} ${names.length === 1 ? "is" : "are"} in your library on this browser.`
            : "Confirming your subscription…"}
        </p>
      )}
      <Link
        href="/library"
        className="mt-8 inline-flex rounded-full bg-sea-deep px-5 py-2.5 text-sm font-semibold text-foam"
      >
        Open library
      </Link>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <Suspense fallback={<main className="px-6 py-16 text-ink-soft">Confirming…</main>}>
          <SuccessInner />
        </Suspense>
      </div>
    </div>
  );
}
