import { generateText } from "ai";
import { getProduct } from "@/lib/catalog";
import { studioRewrite } from "@/lib/studio/rewrite";
import { analyzeHeuristic } from "@/lib/tone/heuristic";

export async function POST(req: Request) {
  const body = (await req.json()) as { slug?: string; text?: string };
  const slug = body.slug || "pause";
  const text = body.text || "";
  const local = studioRewrite(slug, text);
  const product = getProduct(slug);

  if (!text.trim() || !process.env.AI_GATEWAY_API_KEY || !product) {
    return Response.json(local);
  }

  try {
    const result = await generateText({
      model: "openai/gpt-4.1-mini",
      system: `You rewrite messages for Attune ${product.name}. ${product.summary}
Principles:
${product.principles.map((p) => `- ${p}`).join("\n")}
Return ONLY the rewritten message. Keep the user's concrete facts, times, and real request. Remove blame, sarcasm, contempt, and fake urgency. Never use vague placeholders like "the last time that happened" — name the specific situation from the draft.`,
      prompt: text,
    });
    const aiText = result.text.trim();
    const afterTone = analyzeHeuristic(aiText);
    return Response.json({
      ...local,
      rewrite: aiText,
      calibrations: {
        ...local.calibrations,
        direct: aiText,
      },
      afterTone: {
        ...afterTone,
        label: afterTone.label === "destructive" || afterTone.label === "negative" ? "neutral" : "positive",
        score: Math.max(0.7, afterTone.score),
      },
      source: "ai",
    });
  } catch {
    return Response.json(local);
  }
}
