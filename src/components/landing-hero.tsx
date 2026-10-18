"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="climate-wave absolute inset-0" aria-hidden />
      <div
        className="animate-drift absolute -left-1/4 top-[-10%] h-[70%] w-[70%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--sea) 35%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="animate-breathe absolute -right-1/5 bottom-[-5%] h-[55%] w-[55%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 30%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Full-bleed visual: living conversation climate waveform */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] w-full opacity-80"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M0,260 C120,220 180,300 300,250 C420,200 480,280 600,240 C720,200 780,270 900,230 C1020,190 1080,250 1200,210 L1200,420 L0,420 Z"
          fill="color-mix(in oklab, var(--sea) 18%, transparent)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <motion.path
          d="M0,300 C150,270 210,330 360,290 C510,250 570,320 720,280 C870,240 930,300 1080,270 C1140,258 1170,250 1200,245"
          fill="none"
          stroke="var(--sea-deep)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,320 C140,300 200,340 340,310 C480,280 560,340 700,305 C840,270 920,330 1060,300 C1120,288 1160,282 1200,278"
          fill="none"
          stroke="var(--sage)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.35, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col px-6 pb-24 pt-6 md:px-10">
        <div className="flex items-center justify-between">
          <p className="font-display text-3xl tracking-tight text-sea-deep md:text-4xl">
            Attune
          </p>
          <Link
            href="/app"
            className="rounded-full bg-sea-deep px-4 py-2 text-sm font-semibold text-foam transition hover:bg-sea"
          >
            Open inbox
          </Link>
        </div>

        <div className="mt-auto max-w-2xl pb-[18vh] pt-24 md:pb-[22vh]">
          <motion.h1
            className="font-display text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.05] tracking-tight text-sea-deep"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            See how you sound.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft md:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Attune reads the climate of your texts — warm, tense, or harmful —
            and shows you your own patterns so relationships get clearer, not colder.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
          >
            <Link
              href="/app"
              className="rounded-full bg-sea-deep px-6 py-3 text-sm font-semibold text-foam transition hover:bg-sea"
            >
              Try the demo inbox
            </Link>
            <Link
              href="/pricing"
              className="rounded-full px-5 py-3 text-sm font-semibold text-sea-deep transition hover:bg-white/50"
            >
              See plans
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
