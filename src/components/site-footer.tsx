import Link from "next/link";
import { bundles, formatMoney, products } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--line-strong)] bg-obsidian text-foam">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gold/20 font-mono text-xs font-semibold text-gold ring-1 ring-gold/40">
                AT
              </span>
              <span className="font-display text-2xl tracking-tight text-foam">
                Attune Atelier
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foam/70">
              Twelve specialized communication instruments for the messages that shape relationships, careers, and teams. Every studio works live in your browser.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-foam/55">
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                12 Live Instruments
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                Stripe Verified Billing
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                Private by Design
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              Personal & Home
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-foam/75">
              {products
                .filter((p) => p.category === "personal" || p.category === "home")
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="flex items-center justify-between gap-2 transition hover:text-white"
                    >
                      <span>
                        <span className="mr-2 font-mono text-[11px] text-foam/40">{p.number}</span>
                        {p.name}
                      </span>
                      <span className="font-mono text-xs text-foam/45">
                        {formatMoney(p.priceMonthly)}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              Executive & Team
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-foam/75">
              {products
                .filter((p) => p.category === "work" || p.category === "team")
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="flex items-center justify-between gap-2 transition hover:text-white"
                    >
                      <span>
                        <span className="mr-2 font-mono text-[11px] text-foam/40">{p.number}</span>
                        {p.name}
                      </span>
                      <span className="font-mono text-xs text-foam/45">
                        {formatMoney(p.priceMonthly)}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              Curated Suites
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-foam/75">
              {bundles.map((b) => (
                <li key={b.slug}>
                  <Link
                    href="/#bundles"
                    className="flex items-center justify-between gap-2 transition hover:text-white"
                  >
                    <span>{b.name}</span>
                    <span className="font-mono text-xs text-gold">
                      {formatMoney(b.priceMonthly)}/mo
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-foam/60">
              <div className="flex gap-4">
                <Link href="/library" className="hover:text-white">
                  Restore Library
                </Link>
                <Link href="/cart" className="hover:text-white">
                  Cart
                </Link>
                <Link href="/app" className="hover:text-white">
                  Open Mirror
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-foam/45 sm:flex-row">
          <p>© 2026 Attune Atelier. Precision software for the words that matter.</p>
          <p className="font-mono">EDITION 2.4 · ALL 12 STUDIOS ACTIVE</p>
        </div>
      </div>
    </footer>
  );
}
