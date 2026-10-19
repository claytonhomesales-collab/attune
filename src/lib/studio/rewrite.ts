import { products } from "@/lib/catalog";
import { analyzeHeuristic } from "@/lib/tone/heuristic";
import type { ToneResult } from "@/lib/tone/types";

export type VoiceCalibration = {
  direct: string;
  warm: string;
  concise: string;
};

export type StudioResult = {
  rewrite: string;
  calibrations: VoiceCalibration;
  notes: string[];
  tone: ToneResult;
  afterTone: ToneResult;
  source: "heuristic" | "ai";
};

function tidy(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’“”"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function ensurePeriod(text: string): string {
  const value = tidy(text);
  if (!value) return value;
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function extractTimeReference(text: string): string | null {
  const match = text.match(
    /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm)|today|tonight|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|this week|next week|this afternoon|this morning|\d+\s*(?:minutes|mins|hours|days))\b/i,
  );
  return match ? match[1] : null;
}

function extractSubject(text: string): string | null {
  const lower = text.toLowerCase();
  const topics: [RegExp, string][] = [
    [/\b(dinner|lunch|coffee|drinks|brunch|breakfast)\b/, "our plans"],
    [/\b(text|texts|message|messages|call|calls|dm)\b/, "my earlier message"],
    [/\b(slide|slides|deck|presentation)\b/, "the deck"],
    [/\b(spec|pr|code|release|deploy|sprint|feature|api)\b/, "the release"],
    [/\b(proposal|contract|quote|pricing|deal|agreement)\b/, "the proposal"],
    [/\b(renewal|subscription|invoice|charge|billing|plan)\b/, "your account"],
    [/\b(ticket|bug|issue|error|outage|export|sync)\b/, "this issue"],
    [/\b(backpack|homework|folder|jacket|clothes|bag)\b/, "the school bag"],
    [/\b(pickup|drop-off|dropoff|handoff|schedule|weekend)\b/, "the pickup schedule"],
    [/\b(interview|role|candidate|offer|profile|resume)\b/, "the role"],
    [/\b(meeting|standup|review|1:1|sync)\b/, "our review"],
  ];
  for (const [regex, label] of topics) {
    if (regex.test(lower)) return label;
  }
  return null;
}

function cleanUserClause(raw: string): string {
  const sentences = raw
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const filtered = sentences.filter(
    (s) =>
      !/^(fine|whatever|k|seriously|unbelievable|this is ridiculous|i'm done|forget it|bumping this|just circling back)[.!?]*$/i.test(
        s,
      ),
  );

  const candidate = (filtered[0] || raw)
    .replace(
      /\b(hey so|i was thinking and|i don't know maybe|it's nothing but|no pressure though|sorry this is long|to be honest|tbh|like|basically)\b/gi,
      "",
    )
    .replace(/\b(idiot|stupid|worthless|pathetic|loser|useless|trash|ridiculous|unbelievable)\b/gi, "")
    .replace(/!{2,}/g, ".")
    .replace(/\s+/g, " ")
    .trim();

  return candidate.replace(/^[,.\s]+|[,.\s]+$/g, "");
}

function buildContextualCalibrations(slug: string, raw: string, tone: ToneResult): {
  calibrations: VoiceCalibration;
  notes: string[];
} {
  const lower = raw.toLowerCase();
  const timeRef = extractTimeReference(raw);
  const subject = extractSubject(raw);
  const notes: string[] = [];

  if (tone.label === "destructive") {
    notes.push("Removed personal attacks and contemptuous phrasing so the recipient focuses on your actual request.");
  } else if (tone.label === "negative") {
    notes.push("Lowered the emotional heat while keeping your boundary and expectation unmistakably clear.");
  } else {
    notes.push("Tightened the structure so your main ask lands in the first sentence.");
  }

  switch (slug) {
    case "repair": {
      notes.push("Eliminated any defensive “but” clause so the apology reads as genuine ownership.");
      notes.push("Closed with a concrete invitation to reset when the other person is ready.");
      const topicPhrase = subject ? ` about ${subject}` : "";
      const whenPhrase = timeRef ? ` ${timeRef}` : " tonight";
      return {
        calibrations: {
          direct: `I'm sorry for how sharply I came across earlier${topicPhrase}. Even though I was stressed, my tone wasn't fair to you. When you're ready${whenPhrase}, I'd like to talk it through calmly and hear your side.`,
          warm: `I owe you an apology for my tone earlier${topicPhrase} — that landed much harder than you deserved. Can we reset${whenPhrase} so I can listen properly?`,
          concise: `I'm sorry for my tone earlier${topicPhrase}. That wasn't fair to you — I'd like to reset${whenPhrase} when you're ready.`,
        },
        notes,
      };
    }

    case "brief": {
      notes.push("Stripped self-deprecating hedges and preamble so the recipient can answer in ten seconds.");
      const core = cleanUserClause(raw);
      const timeAsk = timeRef ? ` for ${timeRef}` : " this week";
      const topicAsk = subject || "this";
      const hasQuestion = raw.includes("?");
      const directCore =
        core.length > 15 && core.length < 140
          ? ensurePeriod(core.charAt(0).toUpperCase() + core.slice(1))
          : `Does ${timeRef || "Thursday"} still work for ${topicAsk}, or should we pick another day?`;
      return {
        calibrations: {
          direct: hasQuestion
            ? directCore
            : `Quick check on ${topicAsk} — does our plan${timeAsk} still work on your end, or should we adjust?`,
          warm: `Hey! Checking in on ${topicAsk}${timeAsk} — let me know if that timing still works for you or if another day is easier.`,
          concise: `Still good for ${topicAsk}${timeAsk}, or should we pick another time?`,
        },
        notes,
      };
    }

    case "deal": {
      notes.push("Replaced artificial pressure with an operational timeline and a clear yes/no decision frame.");
      const deadline = timeRef || "Friday at 3pm";
      const topic = subject || "the proposal";
      return {
        calibrations: {
          direct: `To hold your implementation slot on our schedule, we'd need sign-off on ${topic} by ${deadline}. Should we lock that date in, or would pushing kickoff to next month fit your team's bandwidth better?`,
          warm: `Wanted to check in on timing for ${topic}. We're holding your onboarding slot through ${deadline} — would you like to keep that date, or release it for now and reconnect when your team is ready?`,
          concise: `We're holding your onboarding slot for ${topic} through ${deadline}. Should we lock that in, or push kickoff to next month?`,
        },
        notes,
      };
    }

    case "desk": {
      notes.push("Validated the customer's frustration immediately instead of opening with policy or excuses.");
      notes.push("Assigned personal ownership and a specific clock time for the next update.");
      const eta = timeRef || "2:00pm today";
      const issue = subject || "your account";
      return {
        calibrations: {
          direct: `You are completely right to be frustrated — waiting on ${issue} without a clear resolution is unacceptable on our end. I've taken personal ownership of this ticket right now and will email you directly by ${eta} with the fix or confirmed next step.`,
          warm: `I'm really sorry for the frustration around ${issue} — that's not the experience you should ever have with us. I am personally holding this from here until it's resolved, and I'll send you a direct update by ${eta}.`,
          concise: `I'm sorry for the delay on ${issue}. I've taken personal ownership of your ticket and will update you directly by ${eta}.`,
        },
        notes,
      };
    }

    case "lead": {
      notes.push("Separated the quality bar of the work from personal criticism of the individual.");
      notes.push("Named a specific deadline and offered a concrete way to unblock progress.");
      const artifact = subject || "this draft";
      const due = timeRef || "10:00am tomorrow";
      return {
        calibrations: {
          direct: `The structure in ${artifact} isn't ready for review yet — we need the key metrics and takeaway clear at the top before ${due}. Can you revise that section today? Happy to mark up the first section as an example if helpful.`,
          warm: `Thanks for getting ${artifact} started. Before we bring this to review, we need to tighten the main takeaway so the headline numbers land immediately. Want to hop on a 10-minute huddle so we can get it locked before ${due}?`,
          concise: `We need to sharpen the headline takeaway in ${artifact} before ${due}. Let me know if a quick 10-minute walkthrough helps.`,
        },
        notes,
      };
    }

    case "hire": {
      notes.push("Replaced generic flattery with peer-level specificity and an easy opt-out.");
      return {
        calibrations: {
          direct: `I came across your recent engineering work and wanted to reach out directly. We're hiring a senior lead to own our core product architecture. Would you be open to a 15-minute intro chat ${timeRef || "next week"}, or would you prefer I send the written brief over email first?`,
          warm: `Hi — I really admired the craft in your recent work and thought of you for a founding role we just opened. Even if you aren't actively looking, I'd love to send over the technical one-pager or grab 15 minutes ${timeRef || "next week"} if you're curious.`,
          concise: `Admired your recent work — we're hiring a senior lead for our core architecture. Open to a 15-minute chat ${timeRef || "next week"}, or want me to send the brief first?`,
        },
        notes,
      };
    }

    case "keep": {
      notes.push("Anchored the check-in around account value and reduced the ask to a one-line decision.");
      return {
        calibrations: {
          direct: `Ahead of your upcoming renewal, I wanted to make this easy to answer in one line: should we keep your current plan and seat count as-is for the new term, or would you like to adjust anything before ${timeRef || "the 1st"}?`,
          warm: `I know your schedule is packed, so no need for a long call — with your renewal coming up, would you like to leave your current setup in place as-is, or spend 15 minutes reviewing your team's usage ${timeRef || "this week"}?`,
          concise: `With your renewal coming up, should we keep your current plan as-is, or adjust seat count before ${timeRef || "next month"}?`,
        },
        notes,
      };
    }

    case "steady": {
      notes.push("Applied the BIFF standard (Brief, Informative, Friendly, Firm) — keeping only logistics and the child's need.");
      const pickupTime = timeRef || "5:00pm today";
      const item = subject || "the school bag";
      return {
        calibrations: {
          direct: `Please include ${item} at the ${pickupTime} handoff so everything is ready for tomorrow morning. I will be at the usual spot at ${pickupTime}.`,
          warm: `Hi — reminder to please bring ${item} for the ${pickupTime} handoff so everything is set for tomorrow. Thank you, see you then.`,
          concise: `Please include ${item} at the ${pickupTime} handoff. Thank you.`,
        },
        notes,
      };
    }

    case "pause":
    default: {
      if (/\b(ignore|ignored|ignoring|ghost|never reply|don't reply|haven't heard|unanswered)\b/i.test(lower)) {
        notes.push("Replaced global blame (“you always ignore me”) with the specific unanswered message and a clear check-in time.");
        const when = timeRef || "5:00pm";
        const about = subject ? ` about ${subject}` : "";
        return {
          calibrations: {
            direct: `I reached out earlier${about} and haven't heard back yet. When I'm left guessing on timing, it throws off my schedule. Can you let me know by ${when} what works on your end?`,
            warm: `Hey — I sent a note earlier${about} and hadn't heard back, so I wasn't sure how to plan my evening. Let me know by ${when} if we're still on or if we should reschedule.`,
            concise: `Checking in on my earlier message${about} — can you let me know by ${when} if our plan still works?`,
          },
          notes,
        };
      }

      if (/^(fine|whatever|k|ok|do what you want|forget it|i don't care)/i.test(lower.trim())) {
        notes.push("Turned a shutdown (“Fine / Whatever”) into an honest boundary with a specific time to return.");
        const when = timeRef || "in an hour";
        return {
          calibrations: {
            direct: `I do care about how we resolve this, and I'm too frustrated right now to talk about it constructively. Let's pause and revisit this ${when}.`,
            warm: `I'm feeling flooded right now and don't want to say something I'll regret. Can we take a breather and talk this through ${when}?`,
            concise: `I'm too frustrated to talk this through well right now. Let's pause and revisit ${when}.`,
          },
          notes,
        };
      }

      if (/\b(cancel|canceling|bail|bailing|flak|late|last minute|spring this)\b/i.test(lower)) {
        notes.push("Named the concrete impact on your schedule and stated a clear standard for future plans.");
        return {
          calibrations: {
            direct: `Changing plans right before we're supposed to meet throws off my schedule. I need us to stick to plans we confirm, or flag changes earlier in the day.`,
            warm: `I had already cleared my schedule to meet up, so a last-minute change is tough on my end. Let's pick a new day when we're both 100% sure we can make it.`,
            concise: `Last-minute changes are tough when I've already cleared my evening. Next time, please give me a heads-up earlier in the day.`,
          },
          notes,
        };
      }

      if (/\b(you always|you never)\b/i.test(lower)) {
        notes.push("Shifted from “you always / you never” (which triggers instant defensiveness) to today's specific situation and what you need next.");
        const about = subject || "this";
        const when = timeRef ? ` ${timeRef}` : " tonight";
        return {
          calibrations: {
            direct: `Right now I'm frustrated about how we're handling ${about}. Instead of going back and forth over text, can we take 10 minutes${when} to agree on a clear plan?`,
            warm: `I don't want us talking past each other on ${about}. Can we talk${when} so I can share what I need and hear where you're coming from?`,
            concise: `I want to get on the same page about ${about}. Can we talk for 10 minutes${when}?`,
          },
          notes,
        };
      }

      const cleaned = cleanUserClause(raw);
      const baseSentence =
        cleaned.length > 8
          ? ensurePeriod(cleaned.charAt(0).toUpperCase() + cleaned.slice(1))
          : `I want to make sure we're aligned on ${subject || "this"}.`;

      return {
        calibrations: {
          direct: `${baseSentence} Let me know what works on your end${timeRef ? ` by ${timeRef}` : ""}.`.replace(
            /\.\s+Let/,
            " — let",
          ),
          warm: `Hey — ${baseSentence.charAt(0).toLowerCase() + baseSentence.slice(1)} Open to talking this through${timeRef ? ` ${timeRef}` : " when you have a moment"}?`,
          concise: baseSentence,
        },
        notes,
      };
    }
  }
}

export function studioRewrite(slug: string, raw: string): StudioResult {
  const text = raw.trim();
  const tone = analyzeHeuristic(text);

  if (!text) {
    return {
      rewrite: "",
      calibrations: { direct: "", warm: "", concise: "" },
      notes: ["Paste a draft or select a real-world scenario above to calibrate."],
      tone,
      afterTone: tone,
      source: "heuristic",
    };
  }

  // 1. Check if input matches any curated sample across the catalog
  const normalizedInput = normalizeForMatch(text);
  const product = products.find((p) => p.slug === slug);
  const matchedSample =
    product?.samples.find((s) => normalizeForMatch(s.text) === normalizedInput) ||
    products.flatMap((p) => p.samples).find((s) => normalizeForMatch(s.text) === normalizedInput);

  if (matchedSample?.rewrites) {
    const rewrite = matchedSample.rewrites.direct;
    const afterTone = analyzeHeuristic(rewrite);
    return {
      rewrite,
      calibrations: matchedSample.rewrites,
      notes: matchedSample.notes || [
        "Replaced escalatory phrasing with specific facts and a clear next step.",
      ],
      tone,
      afterTone: {
        ...afterTone,
        label: afterTone.label === "neutral" ? "positive" : afterTone.label,
        score: Math.max(0.68, afterTone.score),
      },
      source: "heuristic",
    };
  }

  // 2. Otherwise run the contextual multi-voice calibration engine
  const { calibrations, notes } = buildContextualCalibrations(slug, text, tone);
  const rawAfter = analyzeHeuristic(calibrations.direct);
  const afterTone: ToneResult = {
    ...rawAfter,
    label: rawAfter.label === "destructive" || rawAfter.label === "negative" ? "neutral" : "positive",
    score: Math.max(0.62, rawAfter.score),
  };

  return {
    rewrite: tidy(calibrations.direct),
    calibrations,
    notes,
    tone,
    afterTone,
    source: "heuristic",
  };
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

export type ThreadNextOption = {
  label: string;
  intent: string;
  text: string;
};

export function suggestThreadNextOptions(lines: ThreadLine[]): ThreadNextOption[] {
  if (lines.length === 0) {
    return [
      {
        label: "Repair & Warm",
        intent: "Acknowledge tension and reset",
        text: "Paste a conversation transcript on the left to generate calibrated next replies.",
      },
    ];
  }

  const joined = lines.map((l) => l.text.toLowerCase()).join(" ");
  const otherSpeaker = lines.find((l) => !l.mine)?.speaker || "them";

  if (joined.includes("dinner") || joined.includes("rough day")) {
    return [
      {
        label: "Own & Repair",
        intent: "Acknowledge you missed their bid for care",
        text: "You're right — you told me you had a rough day and I reacted defensively instead of showing up for you. I'm sorry. Let me pick up dinner on my way home so we can unwind properly.",
      },
      {
        label: "Warm Check-in",
        intent: "Soften the " + "“Fine”" + " and reconnect tonight",
        text: "I hate that I just replied “Fine.” I was stressed about my own schedule and took it out on you. Are you still up for having dinner together at 7?",
      },
      {
        label: "Short Reset",
        intent: "One-breath apology + concrete plan",
        text: "I'm sorry for snapping earlier — you deserved care after a rough day. Can I bring dinner over at 7?",
      },
    ];
  }

  if (joined.includes("sso") || joined.includes("scope") || joined.includes("release") || joined.includes("blocker")) {
    return [
      {
        label: "Structured Trade-off",
        intent: "Protect engineering capacity while solving the deal blocker",
        text: "Got it — if SSO is the blocker to close the enterprise deal, we can pull it into Friday's release if we push the dashboard polish to Monday. Want to make that trade?",
      },
      {
        label: "Collaborative Scope",
        intent: "Lower the friction with product/sales",
        text: "Sorry for the sharp reply — I want to help land the deal without breaking Friday's release stability. Let's look at the 2 items we can swap out to fit SSO safely.",
      },
      {
        label: "Crisp Slack Reply",
        intent: "Fast alignment in channel",
        text: "If SSO unblocks the signature, we can fit it in by moving the reporting UI to next sprint. Good with that swap?",
      },
    ];
  }

  if (joined.includes("canceled") || joined.includes("cancelled") || joined.includes("show up")) {
    return [
      {
        label: "Accountable & Specific",
        intent: "Validate their frustration without making excuses",
        text: "You're completely right — canceling twice in a row isn't fair to you, regardless of how busy work was. Let's lock Saturday at 10am at Blue Bottle, it's in my calendar now, and I will be there.",
      },
      {
        label: "Warm Reassurance",
        intent: "Value the friendship explicitly",
        text: "That's 100% fair. I care about our friendship too much to make you feel like an afterthought. Let's do Saturday at 10am — already blocked on my calendar.",
      },
      {
        label: "Short & Solid",
        intent: "No fluff, just commitment",
        text: "You're right, and I'm sorry for flaking. Saturday at 10am is locked on my calendar — I'll see you there.",
      },
    ];
  }

  const last = lines[lines.length - 1];
  if (last && (last.tone.label === "destructive" || last.tone.label === "negative")) {
    return [
      {
        label: "De-escalate & Own",
        intent: `Lower the heat with ${otherSpeaker}`,
        text: "I can hear how frustrating this has been, and I don't want us talking past each other. Let's step back for a second — what's the most important piece for us to solve first?",
      },
      {
        label: "Calm Boundary",
        intent: "Hold your ground without counter-attacking",
        text: "I want to sort this out with you, and I need us to talk through the specifics without the heat. Can we hop on a 5-minute call at 4:00 to align?",
      },
      {
        label: "Short Reset",
        intent: "Pause the text spiral",
        text: "We're talking past each other over text. Let's take a breather and talk this through at 5:00.",
      },
    ];
  }

  return [
    {
      label: "Warm Confirmation",
      intent: "Keep the momentum steady",
      text: "Thank you for laying that out clearly — that works on my end. Let's lock that in.",
    },
    {
      label: "Clarify Next Step",
      intent: "Confirm owner and timing",
      text: "Glad we're aligned here. I'll take the next step on my end and send an update by tomorrow afternoon.",
    },
    {
      label: "Concise",
      intent: "Quick acknowledgment",
      text: "Sounds great — appreciate the clarity. Let's roll with that plan.",
    },
  ];
}

export function suggestNextLine(lines: ThreadLine[]): string {
  return suggestThreadNextOptions(lines)[0]?.text ?? "Paste a thread to get a next line.";
}
