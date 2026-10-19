import { cookies } from "next/headers";
import { getStripe } from "@/lib/billing/stripe";
import {
  ENTITLEMENT_COOKIE,
  decodeLibrary,
  encodeLibrary,
  libraryCookie,
  mergeLibrary,
} from "@/lib/billing/entitlements";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ configured: false, slugs: [] }, { status: 503 });
  }

  const body = (await req.json()) as { sessionId?: string };
  if (!body.sessionId) {
    return Response.json({ message: "Missing session." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(body.sessionId);
  if (session.status !== "complete") {
    return Response.json({ message: "Checkout is not complete yet." }, { status: 409 });
  }

  const slugs = (session.metadata?.slugs || "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);

  const jar = await cookies();
  const current = decodeLibrary(jar.get(ENTITLEMENT_COOKIE)?.value);
  const next = mergeLibrary(current, {
    slugs,
    customerId: typeof session.customer === "string" ? session.customer : undefined,
    email: session.customer_details?.email ?? session.customer_email ?? undefined,
  });
  const token = encodeLibrary(next);

  return new Response(JSON.stringify({ slugs: next.slugs, email: next.email }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": libraryCookie(token),
    },
  });
}
