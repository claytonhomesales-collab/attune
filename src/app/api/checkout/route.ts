import { bundleList, getBundle, getProduct } from "@/lib/catalog";
import { getStripe } from "@/lib/billing/stripe";

type Line = { kind: "product" | "bundle"; slug: string };

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      {
        configured: false,
        message: "Add STRIPE_SECRET_KEY to turn on checkout.",
      },
      { status: 503 },
    );
  }

  const body = (await req.json()) as { lines?: Line[] };
  const lines = (body.lines || []).filter(
    (line) =>
      (line.kind === "product" && getProduct(line.slug)) ||
      (line.kind === "bundle" && getBundle(line.slug)),
  );

  if (!lines.length) {
    return Response.json({ message: "Your cart is empty." }, { status: 400 });
  }

  const slugs = [
    ...new Set(
      lines.flatMap((line) => {
        if (line.kind === "product") return [line.slug];
        return getBundle(line.slug)?.productSlugs ?? [];
      }),
    ),
  ];

  const origin = new URL(req.url).origin;
  let session: { url: string | null };
  try {
    session = await stripe.checkout.sessions.create({
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    metadata: { slugs: slugs.join(",") },
    subscription_data: { metadata: { slugs: slugs.join(",") } },
    line_items: lines.map((line) => {
      if (line.kind === "bundle") {
        const bundle = getBundle(line.slug)!;
        const names = bundleList(bundle)
          .map((product) => product.name)
          .join(", ");
        return {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: bundle.priceMonthly,
            recurring: { interval: "month" as const },
            product_data: {
              name: `Attune ${bundle.name}`,
              description: names,
              metadata: { slugs: bundle.productSlugs.join(",") },
            },
          },
        };
      }
      const product = getProduct(line.slug)!;
      return {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: product.priceMonthly,
          recurring: { interval: "month" as const },
          product_data: {
            name: `Attune ${product.name}`,
            description: product.summary,
            metadata: { slugs: product.slug },
          },
        },
      };
    }),
  });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe could not start checkout.";
    return Response.json({ configured: true, message }, { status: 502 });
  }

  return Response.json({ configured: true, url: session.url });
}
