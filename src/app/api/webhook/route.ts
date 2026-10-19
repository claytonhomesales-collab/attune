import { getStripe } from "@/lib/billing/stripe";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return Response.json({ received: false, configured: false }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return Response.json({ message: "Missing signature." }, { status: 400 });

  const payload = await req.text();
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, secret);
    return Response.json({ received: true, type: event.type });
  } catch {
    return Response.json({ message: "Invalid webhook signature." }, { status: 400 });
  }
}
