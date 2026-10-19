import { cookies } from "next/headers";
import { getStripe } from "@/lib/billing/stripe";
import { ENTITLEMENT_COOKIE, decodeLibrary } from "@/lib/billing/entitlements";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ configured: false }, { status: 503 });
  }

  const jar = await cookies();
  const library = decodeLibrary(jar.get(ENTITLEMENT_COOKIE)?.value);
  if (!library.customerId) {
    return Response.json({ message: "Restore your library before managing billing." }, { status: 400 });
  }

  const origin = new URL(req.url).origin;
  const portal = await stripe.billingPortal.sessions.create({
    customer: library.customerId,
    return_url: `${origin}/library`,
  });

  return Response.json({ url: portal.url });
}
