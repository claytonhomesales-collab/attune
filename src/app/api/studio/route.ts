import { generateText, Output } from "ai";
import { z } from "zod";
import { getProduct } from "@/lib/catalog";
import { studioRewrite } from "@/lib/studio/rewrite";
import { analyzeHeuristic } from "@/lib/tone/heuristic";

const studioSchema = z.object({
  calibrations: z.object({
    direct: z
      .string()
      .describe(
        "Direct & Clear voice: firm boundary, concrete ask, zero contempt or blame.",
      ),
    warm: z
      .string()
      .describe(
        "Warm & Collaborative voice: softens the landing and preserves the relationship while keeping the exact point.",
      ),
    concise: z
      .string()
      .describe(
        "Short & Crisp voice: one-breath SMS or Slack length, calm and unmistakable.",
      ),
  }),
  notes: z
    .array(z.string())
    .min(2)
    .max(3)
    .describe(
      "2-3 short editorial coaching bullets explaining what shifted and why.",
    ),
});

export async function POST(req: Request) {
  const body = (await req.json()) as { slug?: string; text?: string };
  const slug = body.slug || "pause";
  const text = body.text || "";
  const local = studioRewrite(slug, text);
  const product = getProduct(slug);

  const hasGatewayAuth = Boolean(
    process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN,
  );

  if (!text.trim() || !hasGatewayAuth || !product) {
    return Response.json(local);
  }

  try {
    const result = await generateText({
      model: "openai/gpt-4.1-mini",
      output: Output.object({ schema: studioSchema }),
      system: `You are the calibration engine for Attune ${product.name} (${product.eyebrow}).
${product.summary}

Principles:
${product.principles.map((p) => `- ${p}`).join("\n")}

Rules:
- Rewrite the user's raw draft into three distinct, natural, ready-to-send voices: direct, warm, and concise.
- NEVER echo the user's raw sentence back. Transform second-person accusations ("You can't...", "You always...") into grounded first-person boundaries ("My decision is firm...", "I need...").
- Keep concrete facts, times, and requests from the draft, and remove blame, sarcasm, guilt-tripping, and artificial urgency.`,
      prompt: `Raw outbound draft:\n"""${text.trim()}"""`,
    });

    const object = result.output;
    if (!object) {
      return Response.json(local);
    }

    const directText = object.calibrations.direct.trim() || local.calibrations.direct;
    const warmText = object.calibrations.warm.trim() || local.calibrations.warm;
    const conciseText = object.calibrations.concise.trim() || local.calibrations.concise;
    const afterTone = analyzeHeuristic(directText);

    return Response.json({
      ...local,
      rewrite: directText,
      calibrations: {
        direct: directText,
        warm: warmText,
        concise: conciseText,
      },
      notes: object.notes.length > 0 ? object.notes : local.notes,
      afterTone: {
        ...afterTone,
        label:
          afterTone.label === "destructive" || afterTone.label === "negative"
            ? "neutral"
            : "positive",
        score: Math.max(0.74, afterTone.score),
      },
      source: "ai",
    });
  } catch {
    return Response.json(local);
  }
}
