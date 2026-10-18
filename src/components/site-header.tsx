"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const links = [
  { href: "/app", label: "Inbox" },
  { href: "/app/insights", label: "Your tone" },
  { href: "/pricing", label: "Pricing" },
];

function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 text-sm md:gap-2">
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              active
                ? "bg-sea/10 text-sea-deep"
                : "text-ink-soft hover:bg-mist hover:text-ink"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="relative z-20 flex items-center justify-between gap-4 px-5 py-4 md:px-8">
      <Link href="/" className="group flex items-baseline gap-2">
        <span className="font-display text-2xl tracking-tight text-sea-deep md:text-[1.7rem]">
          Attune
        </span>
        {!compact && (
          <span className="hidden text-sm text-ink-soft/70 sm:inline">
            See how you sound
          </span>
        )}
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
    </header>
  );
}
