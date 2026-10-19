import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { CartProvider } from "@/lib/store/cart";
import { AttuneProvider } from "@/lib/store/attune-store";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Attune Store — Software for the words that matter",
  description:
    "Twelve tone apps, sold à la carte or in bundles. Pause, Deal, Desk, Steady, Bench, and the rest of the Attune family.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">
        <AttuneProvider>
          <CartProvider>{children}</CartProvider>
        </AttuneProvider>
      </body>
    </html>
  );
}
