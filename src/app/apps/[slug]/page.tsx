import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { BenchStudio } from "@/components/studio/bench-studio";
import { CoachStudio } from "@/components/studio/coach-studio";
import { ThreadStudio } from "@/components/studio/thread-studio";
import { getProduct, products } from "@/lib/catalog";

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
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-35" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-2 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Link href={`/products/${product.slug}`} className="text-sm font-medium text-sea">
                {product.eyebrow}
              </Link>
              <h1 className="mt-1 font-display text-4xl text-sea-deep">{product.name}</h1>
              <p className="mt-2 max-w-xl text-ink-soft">{product.summary}</p>
            </div>
          </div>
          <div className="mt-8">
            {product.kind === "coach" && <CoachStudio product={product} />}
            {product.kind === "thread" && <ThreadStudio />}
            {product.kind === "bench" && <BenchStudio />}
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            {product.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
