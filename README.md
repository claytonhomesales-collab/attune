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

## The store

Apps: Mirror, Pause, Thread, Repair, Brief, Deal, Desk, Lead, Hire, Keep, Steady, Bench.

Bundles: Personal, Home, Practice, House.

Subscriptions are created in Stripe Checkout with `price_data` (no pre-made Price IDs). After payment, `/checkout/success` writes a signed library cookie. Restore and the billing portal look up the Stripe customer.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve build
- `npm run lint` — ESLint
