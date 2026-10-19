import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductEmblem } from "@/components/product-emblem";
import { BenchStudio } from "@/components/studio/bench-studio";
import { CoachStudio } from "@/components/studio/coach-studio";
import { ThreadStudio } from "@/components/studio/thread-studio";
import { formatMoney, getProduct, products } from "@/lib/catalog";

export function generateStaticParams() {
  return products
    .filter((product) => product.kind !== "mirror")
    .map((product) => ({ slug: product.slug }));
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.kind === "mirror") notFound();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave atelier-grid pointer-events-none fixed inset-0 opacity-75" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-6 md:px-10">
          {/* Instrument Switcher Strip */}
          <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-2">
            {products.map((item) => {
              const active = item.slug === product.slug;
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "bg-obsidian text-foam shadow-sm"
                      : "bg-white/80 text-ink-soft shadow-[inset_0_0_0_1px_var(--line)] hover:bg-white hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">{item.number}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Studio Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line-strong)] pb-6">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-obsidian text-gold shadow-sm">
                <ProductEmblem slug={product.slug} className="size-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sea">
                    Instrument {product.number} · {product.eyebrow}
                  </span>
                </div>
                <h1 className="mt-1 font-display text-4xl tracking-tight text-ink md:text-5xl">
                  {product.name} Studio
                </h1>
                <p className="mt-2 max-w-2xl text-base text-ink-soft">{product.summary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-mist/60"
              >
                Instrument Spec · {formatMoney(product.priceMonthly)}/mo
              </Link>
            </div>
          </div>

          <div className="mt-8">
            {product.kind === "coach" && <CoachStudio product={product} />}
            {product.kind === "thread" && <ThreadStudio />}
            {product.kind === "bench" && <BenchStudio />}
          </div>

          {/* Principles Footer Card */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {product.principles.map((item, idx) => (
              <div
                key={item}
                className="card-surface rounded-2xl p-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sea">
                  Principle 0{idx + 1}
                </span>
                <p className="mt-1.5 text-sm font-medium text-ink">{item}</p>
              </div>
            ))}
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
