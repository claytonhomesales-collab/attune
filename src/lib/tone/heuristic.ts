import type { ToneLabel, ToneResult } from "./types";

const POSITIVE = [
  "thank",
  "thanks",
  "appreciate",
  "love",
  "glad",
  "proud",
  "happy",
  "excited",
  "grateful",
  "sorry",
  "i hear",
  "that makes sense",
  "i understand",
  "well done",
  "proud of you",
  "miss you",
  "care about",
  "here for you",
  "congrats",
  "congratulations",
  "beautiful",
  "wonderful",
  "awesome",
  "great job",
  "look forward",
  "happy to",
  "admired",
  "completely right",
  "100% fair",
  "let's lock",
  "my decision",
  "respect my",
  "works for me",
  "not comfortable",
  "talk this through",
  "on the same page",
  "when you're ready",
  "fair to you",
];

const NEGATIVE = [
  "annoyed",
  "frustrated",
  "upset",
  "disappointed",
  "whatever",
  "fine.",
  "i guess",
  "not my problem",
  "not my fault",
  "your fault",
  "you always",
  "you never",
  "seriously?",
  "unbelievable",
  "don't care",
  "tired of",
  "waste of time",
  "ridiculous",
  "over this",
  "ignore",
  "bailing",
  "are you kidding",
  "moving on to other",
  "bumping this again",
  "circling back again",
  "sloppy",
  "is a mess",
  "done being polite",
  "sick of",
  "fed up",
  "deal with it",
  "or don't bother",
  "pulling the offer",
  "haven't heard back",
  "never listen",
  "don't listen",
  "guilt me",
  "guilt trip",
  "guilting",
  "force me",
  "forcing me",
  "pressure me",
  "pressuring me",
  "make me feel bad",
  "doing what you want",
  "control me",
  "controlling",
  "stop pushing",
  "back off",
  "leave me alone",
  "stop trying to",
  "you can't make me",
  "you cant make me",
  "manipulat",
  "gaslight",
  "bullshit",
  "hypocrite",
  "selfish",
  "talk to me like that",
  "watch your tone",
  "who do you think you are",
  "already told you",
  "how many times",
  "unreasonable",
  "unfair",
  "disrespect",
  "inconsiderate",
  "don't blame me",
  "stop blaming",
];

const DESTRUCTIVE = [
  "idiot",
  "stupid",
  "shut up",
  "hate you",
  "worthless",
  "pathetic",
  "loser",
  "dumb",
  "kill yourself",
  "nobody likes",
  "you're crazy",
  "you are crazy",
  "disgusting",
  "trash",
  "useless",
  "moron",
  "incompetent",
  "asshole",
  "fuck you",
  "screw you",
];

const REPAIR = [
  "i'm sorry",
  "i apologize",
  "can we talk",
  "i was wrong",
  "let's reset",
  "i care",
  "help me understand",
  "what do you need",
  "owe you an apology",
  "personal ownership",
];

function countMatches(text: string, phrases: string[]): { count: number; hits: string[] } {
  const hits: string[] = [];
  for (const phrase of phrases) {
    if (text.includes(phrase)) hits.push(phrase);
  }
  return { count: hits.length, hits };
}

function labelFromScore(score: number, destructiveHits: number): ToneLabel {
  if (destructiveHits > 0 || score <= -0.65) return "destructive";
  if (score <= -0.2) return "negative";
  if (score >= 0.25) return "positive";
  return "neutral";
}

export function analyzeHeuristic(text: string): ToneResult {
  const normalized = text.trim().toLowerCase().replace(/’/g, "'");
  if (!normalized) {
    return {
      label: "neutral",
      score: 0,
      confidence: 0.4,
      signals: ["empty"],
      summary: "Nothing to score yet.",
      source: "heuristic",
    };
  }

  const pos = countMatches(normalized, POSITIVE);
  const neg = countMatches(normalized, NEGATIVE);
  const des = countMatches(normalized, DESTRUCTIVE);
  const repair = countMatches(normalized, REPAIR);

  const exclamations = (text.match(/!/g) || []).length;
  const allCaps =
    text.length > 8 && text === text.toUpperCase() && /[A-Z]/.test(text);
  const questionMarks = (text.match(/\?/g) || []).length;
  const shortCold =
    /^(k|ok|fine|sure|whatever|idc|k\.|nope|nah)$/i.test(text.trim()) ||
    normalized === "fine.";

  // Accusatory "you don't / you can't" addressed at the reader.
  // Ignore the same words inside a parenthetical definition ("believing you don't possess it").
  const spoken = normalized.replace(/\([^)]*\)/g, " ");
  const accusatory =
    /\b(you can't|you cant|you won't|you wont|you only|why do you|why can't you|stop\s+\w+ing)\b/i.test(
      spoken,
    ) ||
    /\byou (?:don't|dont) (?!possess|have|believe|think|know|see|want|need|mean)\b/i.test(spoken);

  let score =
    pos.count * 0.28 +
    repair.count * 0.35 -
    neg.count * 0.34 -
    des.count * 0.75;

  if (shortCold) score -= 0.35;
  if (accusatory && pos.count === 0) score -= 0.28;
  if (allCaps) score -= 0.25;
  if (exclamations >= 3) score -= 0.1;
  if (questionMarks >= 1 && pos.count === 0 && neg.count === 0 && !accusatory) score += 0.05;

  const minFloor = des.count > 0 ? -1 : -0.56;
  score = Math.max(minFloor, Math.min(1, score));
  const label = labelFromScore(score, des.count);

  const signals = [
    ...pos.hits.map((h) => `warm: ${h}`),
    ...repair.hits.map((h) => `repair: ${h}`),
    ...neg.hits.map((h) => `tense: ${h}`),
    ...des.hits.map((h) => `harm: ${h}`),
  ];
  if (accusatory && neg.hits.length === 0) signals.push("defensive pushback");
  if (shortCold) signals.push("curt reply");
  if (allCaps) signals.push("shouting");
  if (signals.length === 0) signals.push("plain wording");

  const summaries: Record<ToneLabel, string> = {
    positive: "Reads warm, grounded, and constructive.",
    neutral: "Even and factual — low emotional charge.",
    negative: "Carries friction, pressure, or defensiveness.",
    destructive: "Contains escalatory language that can damage trust.",
  };

  const confidence = Math.min(
    0.95,
    0.5 + (pos.count + neg.count + des.count + repair.count + (accusatory ? 1 : 0)) * 0.12,
  );

  return {
    label,
    score,
    confidence,
    signals: signals.slice(0, 5),
    summary: summaries[label],
    source: "heuristic",
  };
}

export function softenSuggestion(text: string, tone: ToneResult): string | null {
  if (tone.label === "positive" || tone.label === "neutral") return null;
  if (tone.label === "destructive") {
    return "Strip personal attacks and name the exact boundary + next step instead.";
  }
  if (/guilt|pressure|force|manipulat|doing what you want/i.test(text)) {
    return "Instead of accusing them of guilting you, state your decision calmly as a settled boundary.";
  }
  if (/you always|you never/i.test(text)) {
    return "Replace “you always / you never” with today’s specific moment and the time you need an answer.";
  }
  if (/^(fine|whatever|k|ok)\.?$/i.test(text.trim())) {
    return "A one-word shutdown reads as stonewalling. State that you need a breather and when you’ll revisit.";
  }
  return "Lead with your clear boundary or request instead of pushing back on their motives.";
}
