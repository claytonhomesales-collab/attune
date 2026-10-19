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
  "i hear you",
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
  "deal with it",
  "or don't bother",
  "pulling the offer",
  "haven't heard back",
  "never listen",
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
  "gaslighting",
  "manipulat",
  "disgusting",
  "trash",
  "useless",
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
  const normalized = text.trim().toLowerCase();
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
    /^(k|ok|fine|sure|whatever|idc|k\.)$/i.test(text.trim()) ||
    normalized === "fine.";

  let score =
    pos.count * 0.28 +
    repair.count * 0.35 -
    neg.count * 0.32 -
    des.count * 0.75;

  if (shortCold) score -= 0.35;
  if (allCaps) score -= 0.25;
  if (exclamations >= 3) score -= 0.1;
  if (questionMarks >= 1 && pos.count === 0 && neg.count === 0) score += 0.05;

  score = Math.max(-1, Math.min(1, score));
  const label = labelFromScore(score, des.count);

  const signals = [
    ...pos.hits.map((h) => `warm: ${h}`),
    ...repair.hits.map((h) => `repair: ${h}`),
    ...neg.hits.map((h) => `tense: ${h}`),
    ...des.hits.map((h) => `harm: ${h}`),
  ];
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
    0.5 + (pos.count + neg.count + des.count + repair.count) * 0.12,
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
  if (/you always|you never/i.test(text)) {
    return "Replace “you always / you never” with today’s specific moment and the time you need an answer.";
  }
  if (/^(fine|whatever|k|ok)\.?$/i.test(text.trim())) {
    return "A one-word shutdown reads as stonewalling. State that you need a breather and when you’ll revisit.";
  }
  return "Lead with the concrete fact and the exact next action you need.";
}
