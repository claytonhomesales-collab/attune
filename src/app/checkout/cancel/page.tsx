import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function CancelPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader compact />
        <main className="mx-auto w-full max-w-xl flex-1 px-6 pb-16 pt-8">
          <h1 className="font-display text-4xl text-sea-deep">Checkout canceled</h1>
          <p className="mt-4 text-ink-soft">Your cart is still here if you want to try again.</p>
          <div className="mt-8 flex gap-4">
            <Link href="/cart" className="rounded-full bg-sea-deep px-5 py-2.5 text-sm font-semibold text-foam">
              Back to cart
            </Link>
            <Link href="/" className="rounded-full px-5 py-2.5 text-sm font-semibold text-sea">
              Store
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
