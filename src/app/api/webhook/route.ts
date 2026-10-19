import Stripe from "stripe";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe =
    key && (key.startsWith("sk_") || key.startsWith("rk_")) ? new Stripe(key) : null;
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
