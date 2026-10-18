import { generateText, Output } from "ai";
import { z } from "zod";
import { analyzeHeuristic } from "@/lib/tone/heuristic";
import type { ToneResult } from "@/lib/tone/types";

const schema = z.object({
  label: z.enum(["positive", "neutral", "negative", "destructive"]),
  score: z.number().min(-1).max(1),
  confidence: z.number().min(0).max(1),
  signals: z.array(z.string()).max(5),
  summary: z.string(),
});

export async function POST(req: Request) {
  const body = (await req.json()) as { text?: string };
  const text = (body.text || "").trim();

  if (!text) {
    return Response.json(analyzeHeuristic("") satisfies ToneResult);
  }

  // Without a gateway key, keep the demo strong offline via heuristics.
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ ...analyzeHeuristic(text), source: "heuristic" });
  }

  try {
    const result = await generateText({
      model: "openai/gpt-4.1-mini",
      output: Output.object({ schema }),
      system: `You score messaging tone for a wellbeing product called Attune.
Be precise, non-moralizing, and context-aware (sarcasm, curt replies, repair language).
Destructive means insults, contempt, threats, or language that degrades the person.
score: -1 (harmful) to +1 (warm/constructive).`,
      prompt: `Classify this message:\n"""${text}"""`,
    });

    const object = result.output;
    if (!object) {
      return Response.json({ ...analyzeHeuristic(text), source: "heuristic" });
    }

    const payload: ToneResult = {
      ...object,
      source: "ai",
    };
    return Response.json(payload);
  } catch {
    return Response.json({ ...analyzeHeuristic(text), source: "heuristic" });
  }
}
