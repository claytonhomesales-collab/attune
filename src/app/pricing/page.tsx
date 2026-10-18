"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useAttune } from "@/lib/store/attune-store";
import type { PlanId } from "@/lib/tone/types";

const plans: {
  id: PlanId;
  name: string;
  price: string;
  blurb: string;
  features: string[];
}[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    blurb: "On-device heuristics, demo inbox, weekly clarity snapshot.",
    features: [
      "Thread climate meter",
      "Your tone report (basic)",
      "Destructive language alerts",
      "Local-only message history",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    price: "$8",
    blurb: "AI depth, draft coach, and the habit loops that retain.",
    features: [
      "AI tone classification",
      "Pre-send rewrite coach",
      "Per-relationship trends",
      "Clarity streak insights",
      "Export weekly digest",
    ],
  },
  {
    id: "family",
    name: "Family",
    price: "$16",
    blurb: "Shared household plan for up to 5 people — opt-in only.",
    features: [
      "Everything in Plus",
      "5 member seats",
      "Optional mutual climate (both consent)",
      "Priority model routing",
    ],
  },
];

export default function PricingPage() {
  const { plan, setPlan } = useAttune();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="climate-wave pointer-events-none fixed inset-0 opacity-35" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-20 pt-6 md:px-10">
          <h1 className="font-display text-4xl text-sea-deep md:text-5xl">
            Pricing that funds privacy
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Free stays useful forever. Plus pays for better models and coach — not ads
            against your messages.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((p) => {
              const active = plan === p.id;
              return (
                <div
                  key={p.id}
                  className={`flex flex-col rounded-[1.35rem] bg-white/85 p-6 shadow-[inset_0_0_0_1px_var(--line)] ${
                    p.id === "plus" ? "md:-translate-y-2 md:shadow-[inset_0_0_0_2px_var(--sea)]" : ""
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-soft/65">
                    {p.name}
                  </p>
                  <p className="mt-2 font-display text-4xl text-sea-deep">
                    {p.price}
                    {p.id !== "free" && (
                      <span className="text-base font-sans text-ink-soft">/mo</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.blurb}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm text-ink-soft">
                    {p.features.map((f) => (
                      <li key={f}>· {f}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`mt-6 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "bg-mist text-sea-deep"
                        : "bg-sea-deep text-foam hover:bg-sea"
                    }`}
                  >
                    {active ? "Current plan" : `Use ${p.name} in demo`}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-sm text-ink-soft">
            Demo billing is simulated locally so you can feel Plus features.{" "}
            <Link href="/app" className="font-medium text-sea hover:underline">
              Back to inbox
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
