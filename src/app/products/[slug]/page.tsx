import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProductActions } from "@/components/store/product-actions";
import { formatMoney, getProduct, products } from "@/lib/catalog";

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

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20 pt-4 md:px-10">
          <Link href="/" className="text-sm font-medium text-sea">
            ← Store
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-ink-soft/70">
            {product.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-5xl text-sea-deep md:text-6xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{product.description}</p>
          <p className="mt-6 font-display text-4xl text-ink">
            {formatMoney(product.priceMonthly)}
            <span className="font-sans text-base text-ink-soft"> / month</span>
          </p>
          <div className="mt-6">
            <ProductActions
              line={{ kind: "product", slug: product.slug }}
              openHref={product.href}
              emphasis
            />
          </div>
          <p className="mt-8 text-sm text-ink-soft">For {product.audience}</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-sea-deep">Included</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {product.includes.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-sea-deep">How it behaves</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {product.principles.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
