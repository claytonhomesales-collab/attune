import Link from "next/link";
import { LandingHero } from "@/components/landing-hero";

export default function Home() {
  return (
    <main className="flex-1">
      <LandingHero />

      <section className="relative mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
        <h2 className="font-display text-3xl text-sea-deep md:text-4xl">
          One job: clearer conversations
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Attune sits beside your texts. It scores climate, catches sharp drafts
          before you send, and mirrors your own tone over time — so you improve
          without policing anyone else.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {[
            {
              title: "Thread climate",
              body: "See if a chat is warming, cooling, or escalating — with your score and theirs side by side.",
            },
            {
              title: "Your tone report",
              body: "Weekly clarity on how you show up: warm, even, tense, or harmful — plus the signals that repeat.",
            },
            {
              title: "Draft coach",
              body: "A quiet nudge before a sharp send. Keep the honesty; drop the jab.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-mist/60 px-6 py-20 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-3xl text-sea-deep">Built to retain by helping</p>
            <p className="mt-3 max-w-md text-ink-soft">
              Clarity streaks, climate shifts, and repair moments make progress
              visible — the habit forms because relationships feel better, not
              because of empty badges.
            </p>
          </div>
          <Link
            href="/app"
            className="rounded-full bg-sea-deep px-6 py-3 text-sm font-semibold text-foam transition hover:bg-sea"
          >
            Enter Attune
          </Link>
        </div>
      </section>
    </main>
  );
}
