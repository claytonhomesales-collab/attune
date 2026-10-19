import { generateText } from "ai";
import { getProduct } from "@/lib/catalog";
import { studioRewrite } from "@/lib/studio/rewrite";

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
Principles:\n${product.principles.map((p) => `- ${p}`).join("\n")}
Return only the rewritten message. Keep the user's real need. Remove blame, contempt, and fake urgency.`,
      prompt: text,
    });
    return Response.json({
      ...local,
      rewrite: result.text.trim(),
      source: "ai",
      notes: [...local.notes, "Polished with the Attune model."],
    });
  } catch {
    return Response.json(local);
  }
}
