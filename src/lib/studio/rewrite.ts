import { analyzeHeuristic } from "@/lib/tone/heuristic";
import type { ToneResult } from "@/lib/tone/types";

export type StudioResult = {
  rewrite: string;
  notes: string[];
  tone: ToneResult;
  source: "heuristic" | "ai";
};

function tidy(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function soften(text: string): string {
  let next = text;
  const swaps: [RegExp, string][] = [
    [/you always/gi, "this time"],
    [/you never/gi, "I haven't seen"],
    [/just circling back again|just checking in again|bumping this again/gi, "Checking in"],
    [/asap/gi, "when you can"],
    [/this is ridiculous/gi, "this is hard to follow"],
    [/i don't care/gi, "I need a clearer plan"],
    [/whatever\.?/gi, ""],
    [/!{2,}/g, "."],
  ];
  for (const [pattern, replacement] of swaps) next = next.replace(pattern, replacement);
  next = next.replace(/\b(idiot|stupid|worthless|pathetic|loser|useless|trash)\b/gi, "");
  return tidy(next).replace(/\s+([,.])/g, "$1");
}

function ensurePeriod(text: string): string {
  const value = tidy(text);
  if (!value) return value;
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

export function studioRewrite(slug: string, raw: string): StudioResult {
  const text = raw.trim();
  const tone = analyzeHeuristic(text);
  const notes: string[] = [];

  if (!text) {
    return {
      rewrite: "",
      notes: ["Add a draft to rewrite."],
      tone,
      source: "heuristic",
    };
  }

  if (tone.label === "destructive") {
    notes.push("Removed language that attacks the person.");
  } else if (tone.label === "negative") {
    notes.push("Lowered the heat and kept the request.");
  } else {
    notes.push("Tightened a draft that was already mostly clear.");
  }

  const base = soften(text);
  let rewrite = base;

  switch (slug) {
    case "repair":
      notes.push("Owned the impact without reopening the argument.");
      rewrite = ensurePeriod(
        `I was sharp earlier, and that landed harder than I meant. ${base || "I want to reset."} I can talk tonight if you want to.`,
      );
      break;
    case "brief":
      notes.push("Cut filler down to one point and one ask.");
      rewrite = ensurePeriod(
        base
          .replace(/\b(um|uh|like|basically|sorry this is long|no pressure though)\b/gi, "")
          .replace(/\s+/g, " "),
      );
      if (rewrite.length > 220) rewrite = `${rewrite.slice(0, 210).replace(/\s+\S*$/, "")}.`;
      break;
    case "deal":
      notes.push("Replaced invented urgency with a dated, small next step.");
      rewrite =
        "Checking in on the proposal. If a decision this week would help, I can hold the start date through Friday and send a one-page summary today. Want that?";
      break;
    case "desk":
      notes.push("Led with the impact, then a specific fix and a time.");
      rewrite =
        "You are right to be frustrated — three tries with no clear owner is too many. I am taking this from here and will write you by 3pm with the fix or the exact next step. Thank you for staying with it.";
      break;
    case "lead":
      notes.push("Named the standard and left room for a reply.");
      rewrite =
        "The story in the deck is hard to follow before review, and I need the metrics slide clear by tomorrow at 10. I can mark the two spots that are slipping if that helps. What do you need from me?";
      break;
    case "hire":
      notes.push("Made the reason specific and the no easy.");
      rewrite =
        "I read your note on the migration work and it matches a role we are opening. If a 20-minute conversation is useful, I can send times. If the timing is wrong, no reply needed.";
      break;
    case "keep":
      notes.push("Reminded them of a result and asked one easy question.");
      rewrite =
        "The onboarding change in March cut your team's setup time, and the renewal window opens next month. Would a 15-minute look at what to keep be useful, or should we leave the plan as it is?";
      break;
    case "steady":
      notes.push("Kept time, place, and the child's need. Dropped the history.");
      rewrite =
        "Please bring the backpack at pickup. I will be at the usual spot at 5:00. Text me if the time needs to move.";
      break;
    case "pause":
    default:
      if (tone.label === "destructive" || /you always|you never/i.test(text)) {
        notes.push("Swapped a global blame for one moment and a need.");
        rewrite = ensurePeriod(
          `I am frustrated about what just happened. ${base || "I want to tell you what I need."} Can we talk about that specific moment?`,
        );
      } else if (/^(fine|whatever|k)\.?$/i.test(text)) {
        notes.push("Replaced a curt reply with one honest sentence.");
        rewrite = "I am still upset, and I do want to sort this out. I need a little time, then I can talk.";
      } else {
        rewrite = ensurePeriod(base);
      }
      break;
  }

  return { rewrite: tidy(rewrite), notes, tone, source: "heuristic" };
}

export type ThreadLine = {
  speaker: string;
  text: string;
  tone: ToneResult;
  mine: boolean;
};

export function parseThread(raw: string): ThreadLine[] {
  return raw
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([^:]{1,32}):\s*(.+)$/);
      const speaker = match?.[1]?.trim() || "Note";
      const text = match?.[2]?.trim() || line;
      const mine = /^(you|me|i)$/i.test(speaker);
      return { speaker, text, tone: analyzeHeuristic(text), mine };
    });
}

export function suggestNextLine(lines: ThreadLine[]): string {
  const last = lines[lines.length - 1];
  if (!last) return "Paste a thread to get a next line.";
  if (last.tone.label === "destructive" || last.tone.label === "negative") {
    return "I hear that this landed badly. I want to understand the part that hurt, and I can talk when you are ready.";
  }
  if (last.tone.label === "positive") {
    return "Thank you. That helps. I am glad we are on the same side of this.";
  }
  return "I want to make sure I understand. Can you tell me the part that matters most?";
}
