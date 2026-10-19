import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductEmblem } from "@/components/product-emblem";
import { ProductActions } from "@/components/store/product-actions";
import {
  bundleSavings,
  bundles,
  formatMoney,
  getProduct,
  products,
} from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const matchingBundles = bundles.filter((b) =>
    b.productSlugs.includes(product.slug),
  );

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave atelier-grid pointer-events-none fixed inset-0 opacity-75" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-6 md:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-white"
            >
              ← Back to Store
            </Link>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft/70">
              Instrument {product.number} of 12 · {product.category}
            </span>
          </div>

          {/* Two-column Hero Spec */}
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-obsidian text-gold shadow-sm">
                  <ProductEmblem slug={product.slug} className="size-6" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-sea">
                    {product.eyebrow}
                  </p>
                  <p className="text-xs text-ink-soft">
                    Precision Communication Instrument
                  </p>
                </div>
              </div>

              <h1 className="mt-5 font-display text-5xl tracking-tight text-ink md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-4 text-xl font-medium leading-snug text-sea-deep">
                {product.summary}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {product.description}
              </p>

              <div className="mt-6 rounded-2xl bg-white/85 p-4 shadow-[inset_0_0_0_1px_var(--line-strong)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/65">
                  Built For
                </p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {product.audience}
                </p>
              </div>

              {/* Specimen Box */}
              <div className="mt-6 rounded-[1.5rem] bg-white p-6 shadow-[inset_0_0_0_1px_var(--line-strong)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-sea">
                    Calibration Specimen
                  </span>
                  <span className="rounded-full bg-sea/12 px-3 py-0.5 font-mono text-xs font-semibold text-sea-deep">
                    {product.preview.shift}
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-foam p-4 shadow-[inset_0_0_0_1px_var(--line)]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-destructive">
                      Raw Draft (Before)
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      “{product.preview.before}”
                    </p>
                  </div>
                  <div className="rounded-xl bg-sea/8 p-4 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--sea)_25%,transparent)]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-sea-deep">
                      Calibrated in {product.name} (After)
                    </span>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-ink">
                      “{product.preview.after}”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Acquisition & Suite Card */}
            <div className="obsidian-surface rounded-[1.75rem] p-7 text-foam">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-5">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                    À La Carte License
                  </span>
                  <h2 className="mt-1 font-display text-3xl text-white">
                    {product.name}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-display text-4xl text-gold">
                    {formatMoney(product.priceMonthly)}
                  </span>
                  <span className="block text-xs text-foam/60">per month</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foam/55">
                  Included Capabilities
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-foam/85">
                  {product.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="flex size-5 items-center justify-center rounded-full bg-gold/20 text-xs text-gold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foam/55">
                  Operating Principles
                </p>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-foam/75">
                  {product.principles.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 border-t border-white/12 pt-6">
                <ProductActions
                  line={{ kind: "product", slug: product.slug }}
                  openHref={product.href}
                  emphasis
                  dark
                />
              </div>

              {matchingBundles.length > 0 && (
                <div className="mt-6 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                    Also Included In Curated Suites
                  </p>
                  <div className="mt-2.5 space-y-2">
                    {matchingBundles.map((b) => (
                      <Link
                        key={b.slug}
                        href="/#bundles"
                        className="flex items-center justify-between rounded-xl bg-black/30 px-3 py-2 text-xs transition hover:bg-black/50"
                      >
                        <span className="font-medium text-foam">{b.name}</span>
                        <span className="font-mono text-gold">
                          {formatMoney(b.priceMonthly)}/mo · Save {formatMoney(bundleSavings(b))}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sample Library Preview if Coach App */}
          {product.samples.length > 0 && (
            <section className="mt-14 border-t border-[var(--line-strong)] pt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-sea">
                    Scenario Benchmarks
                  </p>
                  <h2 className="mt-1 font-display text-3xl text-ink">
                    See how {product.name} handles real tension.
                  </h2>
                </div>
                <Link
                  href={product.href}
                  className="rounded-full bg-obsidian px-5 py-2.5 text-xs font-semibold text-foam hover:bg-sea-deep"
                >
                  Test Your Own Draft in {product.name} →
                </Link>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {product.samples.map((s) => (
                  <div key={s.label} className="card-surface flex flex-col justify-between rounded-2xl p-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-sea">
                        {s.label}
                      </span>
                      {s.context && (
                        <p className="mt-0.5 text-xs text-ink-soft">{s.context}</p>
                      )}
                      <div className="mt-3 rounded-xl bg-foam p-3">
                        <span className="font-mono text-[10px] uppercase text-destructive">
                          Before
                        </span>
                        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                          “{s.text}”
                        </p>
                      </div>
                      {s.rewrites?.direct && (
                        <div className="mt-3 rounded-xl bg-sea/8 p-3">
                          <span className="font-mono text-[10px] uppercase text-sea-deep">
                            Direct Calibration
                          </span>
                          <p className="mt-1 text-xs font-medium leading-relaxed text-ink">
                            “{s.rewrites.direct}”
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
