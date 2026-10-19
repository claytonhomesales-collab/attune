import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { Storefront } from "@/components/store/storefront";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-50" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Suspense fallback={<div className="px-6 py-16 text-ink-soft">Loading the store…</div>}>
            <Storefront />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
