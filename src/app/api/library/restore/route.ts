import { getStripe } from "@/lib/billing/stripe";
import { encodeLibrary, libraryCookie } from "@/lib/billing/entitlements";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { configured: false, message: "Stripe is not connected yet." },
      { status: 503 },
    );
  }

  const body = (await req.json()) as { email?: string };
  const email = body.email?.trim().toLowerCase();
  if (!email) return Response.json({ message: "Enter the email you used at checkout." }, { status: 400 });

  const customers = await stripe.customers.list({ email, limit: 1 });
  const customer = customers.data[0];
  if (!customer) {
    return Response.json({ message: "No Attune purchases found for that email." }, { status: 404 });
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    status: "active",
    limit: 20,
  });

  const slugs = [
    ...new Set(
      subscriptions.data.flatMap((sub) =>
        (sub.metadata?.slugs || "")
          .split(",")
          .map((slug) => slug.trim())
          .filter(Boolean),
      ),
    ),
  ];

  if (!slugs.length) {
    return Response.json({ message: "That customer has no active Attune plan." }, { status: 404 });
  }

  const token = encodeLibrary({ slugs, customerId: customer.id, email });
  return new Response(JSON.stringify({ slugs, email }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": libraryCookie(token),
    },
  });
}
