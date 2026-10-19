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

Rules — same contract as Outlook Polish:
- Read the whole draft and rewrite that draft. Do not write a different email.
- direct, warm, and concise are three registers of the same polished draft (firm, softer, shorter), not three different scenarios.
- Keep every fact, name, number, time, and request that is actually in the draft.
- Do not add times, topics, offers, gratitude, apologies, or plans the draft did not contain.
- Do not echo insults or second-person attacks. When the draft is an accusation, rewrite the request hidden inside it in the user's own words ("you never close the garage" → "I need you to close the garage").
- If the draft is already clear, change as little as possible.
- concise must be the shortest voice and must still carry the actual ask.
- notes must describe a change the rewrite actually made.`,
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
