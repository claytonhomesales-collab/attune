"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { bundles, getBundle, getProduct, products } from "@/lib/catalog";

export type CartLine = {
  kind: "product" | "bundle";
  slug: string;
};

type CartState = {
  lines: CartLine[];
  ready: boolean;
  add: (line: CartLine) => void;
  remove: (line: CartLine) => void;
  clear: () => void;
  has: (line: CartLine) => boolean;
  count: number;
  monthlyCents: number;
};

const KEY = "attune.cart.v1";
const CartContext = createContext<CartState | null>(null);

function same(a: CartLine, b: CartLine) {
  return a.kind === b.kind && a.slug === b.slug;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        setLines(
          parsed.filter(
            (line) =>
              (line.kind === "product" && getProduct(line.slug)) ||
              (line.kind === "bundle" && getBundle(line.slug)),
          ),
        );
      }
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      if (prev.some((item) => same(item, line))) return prev;
      if (line.kind === "bundle" && line.slug === "house") {
        return [line];
      }
      const bundle = line.kind === "bundle" ? getBundle(line.slug) : undefined;
      const next = prev.filter((item) => {
        if (!bundle || item.kind !== "product") return true;
        return !bundle.productSlugs.includes(item.slug);
      });
      return [...next, line];
    });
  }, []);

  const remove = useCallback((line: CartLine) => {
    setLines((prev) => prev.filter((item) => !same(item, line)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const has = useCallback(
    (line: CartLine) => lines.some((item) => same(item, line)),
    [lines],
  );

  const monthlyCents = lines.reduce((sum, line) => {
    if (line.kind === "product") return sum + (getProduct(line.slug)?.priceMonthly ?? 0);
    return sum + (getBundle(line.slug)?.priceMonthly ?? 0);
  }, 0);

  const value = useMemo(
    () => ({
      lines,
      ready,
      add,
      remove,
      clear,
      has,
      count: lines.length,
      monthlyCents,
    }),
    [lines, ready, add, remove, clear, has, monthlyCents],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function lineName(line: CartLine): string {
  if (line.kind === "bundle") return getBundle(line.slug)?.name ?? line.slug;
  return getProduct(line.slug)?.name ?? line.slug;
}

export function knownProductCount() {
  return products.length + bundles.length;
}
