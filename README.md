# Attune

**Software for the words that matter.** A store of twelve tone apps, sold à la carte or in bundles.

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

https://attune-livid.vercel.app

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional AI and billing:

```bash
cp .env.example .env.local
# AI_GATEWAY_API_KEY — richer rewrites
# STRIPE_SECRET_KEY — live Checkout subscriptions
# STRIPE_WEBHOOK_SECRET — optional Stripe webhook at /api/webhook
```

Every app opens as a working trial. Checkout charges when `STRIPE_SECRET_KEY` is set. Library restore uses the Stripe customer email.

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
