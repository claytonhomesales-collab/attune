import type { Metadata } from "next";
import { Figtree, Fraunces, JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Attune — The Communication Atelier & Software Store",
  description:
    "Twelve precision instruments for high-stakes human communication. Available à la carte or in curated suites: Mirror, Pause, Thread, Repair, Brief, Deal, Desk, Lead, Hire, Keep, Steady, and Bench.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink selection:bg-sea/20">
        <AttuneProvider>
          <CartProvider>{children}</CartProvider>
        </AttuneProvider>
      </body>
    </html>
  );
}
