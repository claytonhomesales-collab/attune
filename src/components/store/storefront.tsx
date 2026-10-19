"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  bundleList,
  bundleSavings,
  bundles,
  formatMoney,
  products,
  type ProductCategory,
} from "@/lib/catalog";
import { studioRewrite, type VoiceCalibration } from "@/lib/studio/rewrite";
import { scoreToPercent } from "@/lib/tone/climate";
import { ProductEmblem } from "@/components/product-emblem";
import { ProductActions } from "./product-actions";

const categories: { id: ProductCategory | "all"; label: string; count: number }[] = [
  { id: "all", label: "All Instruments", count: products.length },
  {
    id: "personal",
    label: "Personal & Relationships",
    count: products.filter((p) => p.category === "personal").length,
  },
  {
    id: "work",
    label: "Executive & Work",
    count: products.filter((p) => p.category === "work").length,
  },
  {
    id: "home",
    label: "Home & Co-Parenting",
    count: products.filter((p) => p.category === "home").length,
  },
  {
    id: "team",
    label: "Team Calibration",
    count: products.filter((p) => p.category === "team").length,
  },
];

const heroShowcases = [
  { slug: "pause", label: "02 · Pause", tag: "Unanswered texts" },
  { slug: "deal", label: "06 · Deal", tag: "Sales follow-up" },
  { slug: "desk", label: "07 · Desk", tag: "Angry ticket" },
  { slug: "lead", label: "08 · Lead", tag: "Manager feedback" },
  { slug: "steady", label: "11 · Steady", tag: "Co-parent handoff" },
];

export function Storefront() {
  const params = useSearchParams();
  const requested = params.get("shelf");
  const filter: ProductCategory | "all" =
    requested === "personal" || requested === "work" || requested === "home" || requested === "team"
      ? requested
      : "all";
  const visible = products.filter((product) => filter === "all" || product.category === filter);

  const [activeShowcaseSlug, setActiveShowcaseSlug] = useState<string>("pause");
  const activeProduct = useMemo(
    () => products.find((p) => p.slug === activeShowcaseSlug) ?? products[1],
    [activeShowcaseSlug],
  );
  const [liveDraft, setLiveDraft] = useState<string>(
    products.find((p) => p.slug === "pause")?.samples[0]?.text ?? "",
  );
  const [voice, setVoice] = useState<keyof VoiceCalibration>("direct");
  const [copiedHero, setCopiedHero] = useState(false);

  function selectShowcase(slug: string) {
    setActiveShowcaseSlug(slug);
    const prod = products.find((p) => p.slug === slug);
    if (prod?.samples[0]?.text) {
      setLiveDraft(prod.samples[0].text);
    }
  }

  const liveResult = useMemo(
    () => studioRewrite(activeShowcaseSlug, liveDraft),
    [activeShowcaseSlug, liveDraft],
  );

  const displayedRewrite = liveResult.calibrations[voice] || liveResult.rewrite;

  async function copyHeroRewrite() {
    if (!displayedRewrite) return;
    await navigator.clipboard.writeText(displayedRewrite);
    setCopiedHero(true);
    window.setTimeout(() => setCopiedHero(false), 1500);
  }

  return (
    <div>
      {/* HERO SECTION WITH LIVE INTERACTIVE CONSOLE */}
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-8 md:px-10 md:pb-20 md:pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/90 px-3.5 py-1.5 shadow-[inset_0_0_0_1px_var(--line-strong)]">
              <span className="size-2 rounded-full bg-sea animate-pulse" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
                Attune Atelier · 12 Live Instruments
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.65rem,5.4vw,4.65rem)] leading-[1.02] tracking-tight text-ink">
              Software for the words you cannot afford to get wrong.
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Every message carries a temperature. Attune is a suite of twelve precision instruments that catch heat before you send, strip blame without losing your point, and give you the exact sentence that lands.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#instruments"
                className="rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-foam shadow-sm transition hover:bg-sea-deep"
              >
                Explore All 12 Apps
              </a>
              <a
                href="#bundles"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] transition hover:bg-mist/60"
              >
                View Curated Suites
              </a>
              <Link
                href="/app"
                className="rounded-full px-4 py-3 text-sm font-semibold text-sea-deep transition hover:bg-sea/10"
              >
                Open Mirror Inbox →
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[var(--line-strong)] pt-7 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft/65">
                  Catalog
                </p>
                <p className="mt-1 font-display text-2xl text-ink md:text-3xl">12 Apps</p>
                <p className="mt-0.5 text-xs text-ink-soft">À la carte or bundled</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft/65">
                  Calibration
                </p>
                <p className="mt-1 font-display text-2xl text-ink md:text-3xl">3 Voices</p>
                <p className="mt-0.5 text-xs text-ink-soft">Direct, Warm, or Short</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft/65">
                  Architecture
                </p>
                <p className="mt-1 font-display text-2xl text-ink md:text-3xl">Private</p>
                <p className="mt-0.5 text-xs text-ink-soft">Zero phone surveillance</p>
              </div>
            </div>
          </div>

          {/* LIVE INTERACTIVE CALIBRATION DECK */}
          <div className="obsidian-surface rounded-[1.75rem] p-5 text-foam md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-gold/20 text-gold ring-1 ring-gold/30">
                  <ProductEmblem slug={activeShowcaseSlug} className="size-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    Live Calibration Console
                  </p>
                  <p className="text-xs text-foam/70">
                    Click a scenario or type any heated draft below
                  </p>
                </div>
              </div>
              <Link
                href={activeProduct.href}
                className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-foam/90 ring-1 ring-white/15 transition hover:bg-white/20"
              >
                Open {activeProduct.name} Studio ↗
              </Link>
            </div>

            {/* Scenario selector pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {heroShowcases.map((item) => {
                const active = item.slug === activeShowcaseSlug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => selectShowcase(item.slug)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      active
                        ? "bg-gold text-obsidian font-semibold shadow-sm"
                        : "bg-white/8 text-foam/75 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    {item.label} · <span className="opacity-80">{item.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Draft Input */}
            <div className="mt-4 rounded-2xl bg-black/35 p-4 ring-1 ring-white/12">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="hero-live-draft"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-foam/55"
                >
                  Raw Outbound Draft (Before)
                </label>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/25 px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#ff9c93] ring-1 ring-destructive/40">
                  <span className="size-1.5 rounded-full bg-[#ff8075]" />
                  {liveResult.tone.label === "destructive"
                    ? "Escalatory"
                    : liveResult.tone.label === "negative"
                      ? "Tense"
                      : "Draft"}{" "}
                  · {scoreToPercent(liveResult.tone.score)}/100
                </span>
              </div>
              <textarea
                id="hero-live-draft"
                value={liveDraft}
                onChange={(e) => setLiveDraft(e.target.value)}
                rows={3}
                className="mt-2.5 w-full resize-none bg-transparent text-[14.5px] leading-relaxed text-foam/95 outline-none placeholder:text-foam/35"
                placeholder="Type or paste a tense message to test..."
              />
            </div>

            {/* Calibrated Output */}
            <div className="mt-3.5 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-gold/30">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 rounded-full bg-black/35 p-1 ring-1 ring-white/10">
                  {(
                    [
                      { id: "direct", label: "Direct & Clear" },
                      { id: "warm", label: "Warm" },
                      { id: "concise", label: "Short" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setVoice(tab.id)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                        voice === tab.id
                          ? "bg-gold text-obsidian font-semibold"
                          : "text-foam/70 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-positive/25 px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#7fe3b4] ring-1 ring-positive/40">
                  <span className="size-1.5 rounded-full bg-[#5ce0a3]" />
                  Calibrated · {scoreToPercent(liveResult.afterTone.score)}/100
                </span>
              </div>

              <p className="mt-3.5 min-h-[4.25rem] text-[15px] leading-relaxed text-white">
                “{displayedRewrite}”
              </p>

              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
                <p className="text-xs text-foam/70">
                  {liveResult.notes[0]}
                </p>
                <button
                  type="button"
                  onClick={() => void copyHeroRewrite()}
                  className="shrink-0 rounded-full bg-white/12 px-3.5 py-1.5 text-xs font-semibold text-gold ring-1 ring-gold/30 transition hover:bg-gold hover:text-obsidian"
                >
                  {copiedHero ? "✓ Copied" : "Copy Rewrite"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUMENT CATALOG */}
      <section id="instruments" className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="flex flex-col justify-between gap-6 border-t border-[var(--line-strong)] pt-12 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-sea">
              The Instrument Catalog
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-tight text-ink md:text-5xl">
              Twelve specialized studios.
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink-soft">
              Each instrument is tuned for a distinct high-stakes setting. Subscribe to a single studio à la carte, or unlock a curated suite below.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => {
              const href = category.id === "all" ? "/" : `/?shelf=${category.id}`;
              const active = filter === category.id;
              return (
                <Link
                  key={category.id}
                  href={href}
                  scroll={false}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-obsidian text-foam shadow-sm"
                      : "bg-white/85 text-ink-soft shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-white hover:text-ink"
                  }`}
                >
                  <span>{category.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                      active ? "bg-gold/25 text-gold" : "bg-ink/5 text-ink-soft"
                    }`}
                  >
                    {category.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <article
              key={product.slug}
              className="card-surface card-surface-hover flex flex-col justify-between rounded-[1.6rem] p-6"
            >
              <div>
                {/* Top instrument bar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-sea/10 text-sea-deep ring-1 ring-sea/20">
                      <ProductEmblem slug={product.slug} className="size-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[11px] font-semibold text-ink-soft/65">
                        INSTRUMENT {product.number}
                      </span>
                      <p className="text-xs font-medium text-sea">{product.eyebrow}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-mist/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                    {product.category}
                  </span>
                </div>

                {/* Title & Summary */}
                <div className="mt-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-3xl tracking-tight text-ink">
                      <Link href={`/products/${product.slug}`} className="hover:text-sea">
                        {product.name}
                      </Link>
                    </h3>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-mono text-xs text-ink-soft/70 hover:text-ink"
                    >
                      Spec →
                    </Link>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {product.summary}
                  </p>
                </div>

                {/* Embedded Before -> After Specimen */}
                <div className="mt-5 rounded-2xl bg-foam/95 p-3.5 shadow-[inset_0_0_0_1px_var(--line)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/65">
                      Specimen Shift
                    </span>
                    <span className="rounded-full bg-sea/12 px-2 py-0.5 font-mono text-[10px] font-semibold text-sea-deep">
                      {product.preview.shift}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-soft/75 line-through decoration-destructive/40">
                    “{product.preview.before}”
                  </p>
                  <p className="mt-2 line-clamp-3 text-xs font-medium leading-relaxed text-ink">
                    “{product.preview.after}”
                  </p>
                </div>

                {/* Capabilities */}
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {product.includes.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg bg-white px-2.5 py-1 text-[11px] text-ink-soft shadow-[inset_0_0_0_1px_var(--line)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Actions */}
              <div className="mt-6 border-t border-[var(--line)] pt-4">
                <div className="mb-3.5 flex items-baseline justify-between">
                  <div>
                    <span className="font-display text-2xl text-ink">
                      {formatMoney(product.priceMonthly)}
                    </span>
                    <span className="text-xs text-ink-soft"> / month · à la carte</span>
                  </div>
                  <span className="font-mono text-[11px] text-positive">Live Trial Ready</span>
                </div>
                <ProductActions
                  line={{ kind: "product", slug: product.slug }}
                  openHref={product.href}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CURATED SUITES / BUNDLES */}
      <section
        id="bundles"
        className="border-t border-[var(--line-strong)] bg-mist/45 px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-sea">
                Curated Suites & All-Access
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-ink md:text-5xl">
                Collected editions.
              </h2>
              <p className="mt-3 max-w-xl text-base text-ink-soft">
                Combine the instruments you use every day and save up to 45% over individual studio subscriptions.
              </p>
            </div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-foam"
            >
              Review Your Cart →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {bundles.map((bundle) => {
              const save = bundleSavings(bundle);
              const includedProducts = bundleList(bundle);
              const isObsidian = bundle.highlight || bundle.slug === "house";

              return (
                <article
                  key={bundle.slug}
                  className={`flex flex-col justify-between rounded-[1.75rem] p-7 md:p-8 ${
                    isObsidian ? "obsidian-surface text-foam" : "card-surface text-ink"
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                          isObsidian ? "text-gold" : "text-sea"
                        }`}
                      >
                        {bundle.eyebrow}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                          isObsidian
                            ? "bg-gold/20 text-gold ring-1 ring-gold/35"
                            : "bg-sea/12 text-sea-deep"
                        }`}
                      >
                        Save {formatMoney(save)}/mo
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3
                        className={`font-display text-3xl md:text-4xl ${
                          isObsidian ? "text-white" : "text-ink"
                        }`}
                      >
                        {bundle.name}
                      </h3>
                      <div className="text-right">
                        <span
                          className={`font-display text-3xl md:text-4xl ${
                            isObsidian ? "text-gold" : "text-ink"
                          }`}
                        >
                          {formatMoney(bundle.priceMonthly)}
                        </span>
                        <span
                          className={`block text-xs ${
                            isObsidian ? "text-foam/60" : "text-ink-soft"
                          }`}
                        >
                          per month
                        </span>
                      </div>
                    </div>

                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isObsidian ? "text-foam/80" : "text-ink-soft"
                      }`}
                    >
                      {bundle.summary}
                    </p>

                    <div className="mt-6">
                      <p
                        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                          isObsidian ? "text-foam/50" : "text-ink-soft/65"
                        }`}
                      >
                        Included Instruments ({includedProducts.length})
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {includedProducts.map((prod) => (
                          <Link
                            key={prod.slug}
                            href={`/products/${prod.slug}`}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                              isObsidian
                                ? "bg-white/10 text-foam hover:bg-white/20"
                                : "bg-foam text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-white"
                            }`}
                          >
                            <span className="font-mono text-[10px] opacity-60">
                              {prod.number}
                            </span>
                            <span>{prod.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-8 border-t pt-5 ${
                      isObsidian ? "border-white/12" : "border-[var(--line)]"
                    }`}
                  >
                    <ProductActions
                      line={{ kind: "bundle", slug: bundle.slug }}
                      emphasis
                      dark={isObsidian}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
