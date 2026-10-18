import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
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
  title: "Attune — See how you sound",
  description:
    "Tone-aware messaging companion. Detect warm, tense, and harmful language — and understand your own patterns.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">
        <AttuneProvider>{children}</AttuneProvider>
      </body>
    </html>
  );
}
