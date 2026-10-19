import { cookies } from "next/headers";
import { ENTITLEMENT_COOKIE, decodeLibrary } from "@/lib/billing/entitlements";
import { stripeReady } from "@/lib/billing/stripe";

export async function GET() {
  const jar = await cookies();
  const library = decodeLibrary(jar.get(ENTITLEMENT_COOKIE)?.value);
  return Response.json({ ...library, billing: stripeReady() });
}
