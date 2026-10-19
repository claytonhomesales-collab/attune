# Attune

**See how you sound.** A tone-aware messaging companion that scores conversation climate (warm / even / tense / harmful) and mirrors *your* patterns so relationships get clearer.

## Why it retains

- **Thread climate** — warming, steady, cooling, escalating
- **Self tone report** — how *you* show up across chats
- **Draft coach** — quiet nudge before a sharp send
- **Clarity streaks** — progress you can feel in real conversations

## Stack

- Next.js (App Router) + Tailwind
- Heuristic tone engine (works offline)
- Optional AI classification via Vercel AI Gateway (`ai` SDK)
- Local-first demo state (localStorage) — ready to swap for a database later

## Public demo

Live URL (temporary Vercel deploy): https://temporary-fast-silicon-z0rff2c.vercel.app

Permanent production alias (after Vercel account link): https://attune-claytonhomesales-4166.vercel.app

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional AI features:

```bash
cp .env.example .env.local
# add AI_GATEWAY_API_KEY
```

On Pricing, switch the demo plan to **Plus** to exercise AI-path draft coaching (falls back to heuristics without a key).

## Product / revenue shape

| Plan   | Role                                      |
|--------|-------------------------------------------|
| Free   | Heuristics, climate, basic self report    |
| Plus   | AI scoring, rewrite coach, deeper trends  |
| Family | Shared seats + opt-in mutual climate      |

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve build
- `npm run lint` — ESLint
