import { generateText } from "ai";
import { softenSuggestion } from "@/lib/tone/heuristic";
import { analyzeHeuristic } from "@/lib/tone/heuristic";

export async function POST(req: Request) {
  const body = (await req.json()) as { text?: string };
  const text = (body.text || "").trim();
  const tone = analyzeHeuristic(text);
  const tip = softenSuggestion(text, tone);

  if (!text || tone.label === "positive" || tone.label === "neutral") {
    return Response.json({ tip: null, rewrite: null, tone });
  }

  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL) {
    return Response.json({ tip, rewrite: null, tone });
  }

  try {
    const result = await generateText({
      model: "openai/gpt-4.1-mini",
      system:
        "You help people rephrase tense texts without losing honesty. Return only the rewritten message, same language, concise.",
      prompt: `Original:\n${text}\n\nRewrite to keep the need and remove blame/contempt.`,
    });
    return Response.json({ tip, rewrite: result.text.trim(), tone });
  } catch {
    return Response.json({ tip, rewrite: null, tone });
  }
}
