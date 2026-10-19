"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  bundleList,
  bundleSavings,
  bundles,
  formatMoney,
  products,
  type ProductCategory,
} from "@/lib/catalog";
import { ProductActions } from "./product-actions";

const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All apps" },
  { id: "personal", label: "Personal" },
  { id: "work", label: "Work" },
  { id: "home", label: "Home" },
  { id: "team", label: "Team" },
];

export function Storefront() {
  const params = useSearchParams();
  const requested = params.get("shelf");
  const filter: ProductCategory | "all" =
    requested === "personal" || requested === "work" || requested === "home" || requested === "team"
      ? requested
      : "all";
  const visible = products.filter((product) => filter === "all" || product.category === filter);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6 md:px-10 md:pt-10">
        <p className="text-xs uppercase tracking-[0.16em] text-sea">Attune store</p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.7rem,6vw,4.8rem)] leading-[1.02] tracking-tight text-sea-deep">
          Software for the words that matter.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          Twelve apps. Buy one, or take a bundle. Each one coaches a different kind of
          message — and shows you how you sound.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const href = category.id === "all" ? "/" : `/?shelf=${category.id}`;
            const active = filter === category.id;
            return (
              <Link
                key={category.id}
                href={href}
                className={`rounded-full px-4 py-1.5 text-sm ${
                  active
                    ? "bg-sea-deep text-foam"
                    : "bg-white/70 text-ink-soft shadow-[inset_0_0_0_1px_var(--line)] hover:text-ink"
                }`}
              >
                {category.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 md:px-10">
        {visible.map((product) => (
          <article
            key={product.slug}
            className="flex flex-col rounded-[1.4rem] bg-white/80 p-5 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft/60">
              {product.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl text-sea-deep">
              <Link href={`/products/${product.slug}`} className="hover:text-sea">
                {product.name}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{product.summary}</p>
            <p className="mt-4 font-display text-2xl text-ink">
              {formatMoney(product.priceMonthly)}
              <span className="font-sans text-sm text-ink-soft"> /mo</span>
            </p>
            <div className="mt-4">
              <ProductActions
                line={{ kind: "product", slug: product.slug }}
                openHref={product.href}
              />
            </div>
          </article>
        ))}
      </section>

      <section id="bundles" className="border-t border-[var(--line)] bg-mist/50 px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl text-sea-deep">Bundles</h2>
          <p className="mt-3 max-w-lg text-ink-soft">
            The same apps, priced as a set. House is the whole store.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {bundles.map((bundle) => {
              const save = bundleSavings(bundle);
              const names = bundleList(bundle).map((product) => product.name);
              return (
                <article
                  key={bundle.slug}
                  className={`rounded-[1.4rem] bg-white/85 p-6 shadow-[inset_0_0_0_1px_var(--line)] ${
                    bundle.highlight ? "lg:shadow-[inset_0_0_0_2px_var(--sea)]" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl text-sea-deep">{bundle.name}</h3>
                    <p className="font-display text-2xl text-ink">
                      {formatMoney(bundle.priceMonthly)}
                      <span className="font-sans text-sm text-ink-soft"> /mo</span>
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{bundle.summary}</p>
                  <p className="mt-3 text-sm text-sea">Save {formatMoney(save)} a month</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{names.join(" · ")}</p>
                  <div className="mt-5">
                    <ProductActions
                      line={{ kind: "bundle", slug: bundle.slug }}
                      emphasis={bundle.highlight}
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
