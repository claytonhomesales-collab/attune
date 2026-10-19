import { generateText } from "ai";
import { studioRewrite } from "@/lib/studio/rewrite";
import { analyzeHeuristic, softenSuggestion } from "@/lib/tone/heuristic";

export async function POST(req: Request) {
  const body = (await req.json()) as { text?: string };
  const text = (body.text || "").trim();
  const tone = analyzeHeuristic(text);
  const tip = softenSuggestion(text, tone);
  const fallback = studioRewrite("pause", text);

  if (!text || tone.label === "positive" || tone.label === "neutral") {
    return Response.json({ tip: null, rewrite: null, tone });
  }

  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ tip, rewrite: fallback.rewrite, tone });
  }

  try {
    const result = await generateText({
      model: "openai/gpt-4.1-mini",
      system:
        "You help people rephrase tense texts without losing honesty or specificity. Return only the rewritten message, concise and natural.",
      prompt: `Original:\n${text}\n\nRewrite to keep the concrete need and remove blame or contempt.`,
    });
    return Response.json({ tip, rewrite: result.text.trim() || fallback.rewrite, tone });
  } catch {
    return Response.json({ tip, rewrite: fallback.rewrite, tone });
  }
}
