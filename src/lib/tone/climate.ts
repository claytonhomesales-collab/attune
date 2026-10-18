import type { Climate, Message, SelfReport, ToneLabel, ToneResult } from "./types";
import { analyzeHeuristic } from "./heuristic";

export function ensureTone(message: Message): ToneResult {
  return message.tone ?? analyzeHeuristic(message.text);
}

export function withTones(messages: Message[]): Message[] {
  return messages.map((m) => ({ ...m, tone: ensureTone(m) }));
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function share(messages: Message[], label: ToneLabel): number {
  if (!messages.length) return 0;
  return messages.filter((m) => ensureTone(m).label === label).length / messages.length;
}

export function computeClimate(messages: Message[]): Climate {
  const scored = withTones(messages);
  const recent = scored.slice(-20);
  const you = recent.filter((m) => m.sender === "you");
  const them = recent.filter((m) => m.sender === "them");
  const overall = avg(recent.map((m) => ensureTone(m).score));
  const youScore = avg(you.map((m) => ensureTone(m).score));
  const themScore = avg(them.map((m) => ensureTone(m).score));

  const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
  const secondHalf = recent.slice(Math.floor(recent.length / 2));
  const early = avg(firstHalf.map((m) => ensureTone(m).score));
  const late = avg(secondHalf.map((m) => ensureTone(m).score));
  const delta = late - early;

  const destructiveShare = share(recent, "destructive");
  let label: Climate["label"] = "steady";
  if (destructiveShare >= 0.15 || delta <= -0.25) label = "escalating";
  else if (delta <= -0.1) label = "cooling";
  else if (delta >= 0.12 || overall >= 0.25) label = "warming";

  const repairMoments = recent.filter((m) =>
    ensureTone(m).signals.some((s) => s.startsWith("repair") || s.startsWith("warm")),
  ).length;

  const trendNotes: Record<Climate["label"], string> = {
    warming: "Recent messages are softening — keep the repair energy going.",
    steady: "The climate is even. Small appreciations keep it that way.",
    cooling: "Tone is drifting cooler. A clear, kind check-in can help.",
    escalating: "Language is getting sharper. Pause before the next send.",
  };

  return {
    label,
    youScore,
    themScore,
    overall,
    positiveShare: share(recent, "positive"),
    negativeShare: share(recent, "negative"),
    destructiveShare,
    repairMoments,
    trendNote: trendNotes[label],
  };
}

export function computeSelfReport(messages: Message[]): SelfReport {
  const yours = withTones(messages).filter((m) => m.sender === "you");
  const counts = { positive: 0, neutral: 0, negative: 0, destructive: 0 };
  const signalMap = new Map<string, number>();

  for (const m of yours) {
    const tone = ensureTone(m);
    counts[tone.label] += 1;
    for (const s of tone.signals) {
      signalMap.set(s, (signalMap.get(s) || 0) + 1);
    }
  }

  const avgScore = avg(yours.map((m) => ensureTone(m).score));
  const topSignals = [...signalMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([s]) => s);

  const clarityDays = Math.max(
    1,
    Math.round((counts.positive + counts.neutral * 0.5) / Math.max(1, yours.length / 3)),
  );

  let insight =
    "You sound mostly steady. Noticing one warm detail a day compounds fast.";
  if (avgScore >= 0.3) {
    insight = "You’re showing up warm. People feel safer posting hard truths to you.";
  } else if (counts.destructive > 0) {
    insight =
      "A few messages crossed into harm. Naming the need without the jab repairs trust faster.";
  } else if (avgScore < -0.15) {
    insight =
      "Your recent sends lean tense. One specific ask usually lands better than a broad complaint.";
  }

  return {
    messageCount: yours.length,
    ...counts,
    avgScore,
    topSignals,
    clarityDays,
    insight,
  };
}

export function scoreToPercent(score: number): number {
  return Math.round(((score + 1) / 2) * 100);
}

export function toneColor(label: ToneLabel): string {
  switch (label) {
    case "positive":
      return "var(--positive)";
    case "negative":
      return "var(--negative)";
    case "destructive":
      return "var(--destructive)";
    default:
      return "var(--neutral)";
  }
}
