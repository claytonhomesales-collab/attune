"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { formatMoney } from "@/lib/catalog";
import { useCart } from "@/lib/store/cart";

const links = [
  { href: "/", label: "Store" },
  { href: "/#bundles", label: "Suites" },
  { href: "/apps/pause", label: "Live Studio" },
  { href: "/app", label: "Mirror" },
  { href: "/library", label: "Library" },
];

function HeaderNav() {
  const pathname = usePathname();
  const cart = useCart();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto text-sm md:gap-1.5">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : link.href.startsWith("/#")
              ? false
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={` shrink-0 rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-all sm:px-3.5 sm:text-[13px] ${
              active
                ? "bg-obsidian text-foam shadow-sm"
                : "text-ink-soft hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <Link
        href="/cart"
        className={`ml-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all sm:ml-1 sm:gap-2 sm:px-4 sm:text-[13px] ${
          cart.count > 0
            ? "bg-sea-deep text-foam shadow-sm hover:bg-sea"
            : pathname === "/cart"
              ? "bg-obsidian text-foam"
              : "bg-white/90 text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-white"
        }`}
      >
        <span>Cart</span>
        {cart.count > 0 ? (
          <span className="rounded-full bg-gold/25 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-gold sm:px-2 sm:text-[11px]">
            {cart.count} · {formatMoney(cart.monthlyCents)}
          </span>
        ) : (
          <span className="font-mono text-[11px] text-ink-soft/60">0</span>
        )}
      </Link>
    </nav>
  );
}

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-foam/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-obsidian font-mono text-[11px] font-semibold tracking-wider text-gold shadow-sm transition-transform group-hover:scale-105">
            AT
          </span>
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl tracking-tight text-ink md:text-[1.65rem]">
              Attune
            </span>
            {!compact && (
              <span className="hidden rounded-full bg-ink/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft sm:inline-block">
                12 Instruments
              </span>
            )}
          </div>
        </Link>
        <Suspense
          fallback={
            <nav className="flex items-center gap-1 text-sm md:gap-2">
              {links.map((link) => (
                <span key={link.href} className="px-3 py-1.5 text-ink-soft/50">
                  {link.label}
                </span>
              ))}
            </nav>
          }
        >
          <HeaderNav />
        </Suspense>
      </div>
    </header>
  );
}
