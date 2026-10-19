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

function extractTimeReference(text: string): string | null {
  const withoutNotice = text.replace(/\b\d+\s*(?:minutes|mins|hours)\s+before\b/gi, " ");
  const match = withoutNotice.match(
    /\b((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tonight|tomorrow|this afternoon|this morning)(?:\s+at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?|\d{1,2}(?::\d{2})?\s*(?:am|pm)|at\s+\d{1,2}(?::\d{2})?(?:\s*(?:am|pm))?|this week|next week)\b/i,
  );
  if (!match) return null;
  let value = match[1].replace(/^at\s+/i, "");
  if (/^\d{1,2}$/.test(value)) value = `${value}:00`;
  return value;
}

function extractNotice(text: string): string | null {
  const match = text.match(/\b(\d+\s*(?:minutes|mins|hours))\s+before\b/i);
  return match ? match[1] : null;
}

function extractAbout(text: string): string | null {
  const match = text.match(/\babout\s+([a-z0-9][a-z0-9\s'-]{1,40}?)(?=[?.!,]|$)/i);
  if (!match) return null;
  const phrase = match[1].replace(/\b(the|a|an)\b/gi, (word) => word.toLowerCase()).trim();
  if (!phrase || /\b(you|your|me|my|always|never)\b/i.test(phrase)) return null;
  return phrase;
}

function extractSubject(text: string): string | null {
  const lower = text.toLowerCase();
  const topics: [RegExp, string][] = [
    [/\b(dinner|lunch|coffee|drinks|brunch|breakfast)\b/, "our plans"],
    [/\b(slide|slides|deck|presentation)\b/, "the deck"],
    [/\b(spec|pr|code|release|deploy|sprint|feature|api)\b/, "the release"],
    [/\b(proposal|contract|quote|pricing|deal|agreement)\b/, "the proposal"],
    [/\b(renewal|subscription|invoice|charge|billing|plan)\b/, "your account"],
    [/\b(ticket|bug|issue|error|outage|export|sync)\b/, "this issue"],
    [/\bbackpack\b/, "the backpack"],
    [/\b(homework|folder)\b/, "the homework"],
    [/\bjacket\b/, "the jacket"],
    [/\bclothes\b/, "the clothes"],
    [/\bbag\b/, "the bag"],
    [/\b(pickup|drop-off|dropoff|handoff|schedule|weekend)\b/, "the pickup schedule"],
    [/\b(interview|role|candidate|offer|profile|resume)\b/, "the role"],
    [/\b(meeting|standup|review|1:1|sync)\b/, "our review"],
  ];
  for (const [regex, label] of topics) {
    if (regex.test(lower)) return label;
  }
  return null;
}

function extractSpecificActionAfterInto(text: string): string | null {
  const match = text.match(
    /\binto\s+([a-z0-9\s']+?)(?:[.!?,;]|$)/i,
  );
  if (!match) return null;
  const candidate = match[1].trim().toLowerCase();
  if (
    !candidate ||
    candidate.length < 4 ||
    candidate.length > 48 ||
    /^(doing what you want|doing that|doing this|doing it|what you want|it|this|that|anything|something|saying yes)$/i.test(
      candidate,
    ) ||
    /\b(you|your|yours|yourself)\b/i.test(candidate)
  ) {
    return null;
  }
  return candidate;
}

function fitsStudio(slug: string, lower: string): boolean {
  switch (slug) {
    case "repair":
      return /\b(sorry|apolog|my bad|i was wrong|snapped)\b/i.test(lower);
    case "deal":
      return /\b(proposal|contract|pricing|discount|sign|onboarding|demo|buyer|quote|deal|invoice)\b/i.test(lower);
    case "desk":
      return /\b(ticket|refund|bug|outage|charge|customer|product|account|fix|invoice)\b/i.test(lower);
    case "lead":
      return /\b(deck|slide|spec|sprint|review|deadline|feedback|sloppy|team)\b/i.test(lower);
    case "hire":
      return /\b(candidate|interview|offer|profile|recruit|role|resume|hiring)\b/i.test(lower);
    case "keep":
      return /\b(renewal|login|usage|seat|invoice|subscription)\b/i.test(lower);
    case "steady":
      return /\b(backpack|bag|kid|kids|pickup|drop-off|drop off|handoff|school|custody|homework)\b/i.test(lower);
    default:
      return true;
  }
}

function sentence(text: string): string {
  const value = text.replace(/\s+/g, " ").trim();
  if (!value) return value;
  const headed = value.charAt(0).toUpperCase() + value.slice(1);
  return /[.!?]$/.test(headed) ? headed : `${headed}.`;
}

function isCalmDraft(raw: string, lower: string, tone: ToneResult): boolean {
  if (tone.label === "negative" || tone.label === "destructive") return false;
  if (
    /\b(you always|you never|guilt|manipulat|ridiculous|unbelievable|whatever|hate|shut up|idiot|stupid|blame|fault|ignore|bailing|selfish)\b/i.test(
      lower,
    )
  ) {
    return false;
  }
  if (
    /\b(you can't|you cant|you don't|you dont|you won't|you wont|stop\s+\w+ing|don't talk|dont talk|don't tell|dont tell)\b/i.test(
      lower,
    )
  ) {
    return false;
  }
  if (/\b(asap|impressive profile|amazing opportunity|perfect for)\b/i.test(lower)) return false;
  return raw.includes("?") || /^(please|can you|could you|would you|checking|quick|just checking|let me know)\b/i.test(raw.trim());
}

function calmCalibrations(raw: string): { calibrations: VoiceCalibration; notes: string[] } {
  const trimmed = raw.replace(/\s+/g, " ").trim();
  const question = (trimmed.match(/[^.!?]*\?/)?.[0] || trimmed).trim();
  const asking = question.endsWith("?");
  const stillWorks = question.match(/^does (.+) still work for (.+)\?$/i);
  const direct = stillWorks
    ? `Is ${stillWorks[2]} still on for ${stillWorks[1]}?`
    : asking
      ? question.charAt(0).toUpperCase() + question.slice(1)
      : sentence(question);
  const warm = stillWorks
    ? `Are you still good for ${stillWorks[2]} ${stillWorks[1]}?`
    : `Hey — ${direct.charAt(0).toLowerCase()}${direct.slice(1)}`;
  const trimmedAsk = direct
    .replace(/^can we\s+/i, "")
    .replace(/^could we\s+/i, "")
    .replace(/^would you\s+/i, "")
    .replace(/^please\s+/i, "");
  const shortened = `${trimmedAsk.charAt(0).toUpperCase()}${trimmedAsk.slice(1)}`;
  const shortTopic = stillWorks ? stillWorks[2].replace(/^the\s+/i, "") : "";
  const concise = stillWorks
    ? `${shortTopic.charAt(0).toUpperCase()}${shortTopic.slice(1)} ${stillWorks[1]} still good?`
    : shortened.length < direct.length
      ? shortened
      : direct;
  return {
    calibrations: {
      direct,
      warm,
      concise: concise.charAt(0).toUpperCase() + concise.slice(1),
    },
    notes: [
      "Kept your question, including the time and the topic.",
      "Added a warmer greeting and a shorter version without changing the ask.",
    ],
  };
}

function detectInterpersonalArchetype(
  raw: string,
  lower: string,
  timeRef: string | null,
  subject: string | null,
): { calibrations: VoiceCalibration; notes: string[] } | null {
  // Refusing a forced apology. Checked before the general guilt pattern, which also matches "you can't make me".
  if (/\b(apologi[sz]e|apology|say sorry|i'm sorry|im sorry)\b/i.test(lower) && /\b(can't make me|cant make me|won't|wont|not going to|refuse|don't|dont|make me)\b/i.test(lower)) {
    return {
      calibrations: {
        direct: "I'm not going to apologize for this. I need you to stop pushing me to apologize.",
        warm: "I hear that you want an apology, and I'm not going to give one I don't mean. Please stop pressing me for it.",
        concise: "I won't apologize for this, so please let it go.",
      },
      notes: [
        "Kept the refusal, and took out the power struggle (“you can’t make me”).",
        "Did not promise a talk about what happened, because the draft didn't offer one.",
      ],
    };
  }

  if (/\b(unreasonable|unfair|not fair|overreact|blown this up|making a big deal|too much to ask)\b/i.test(lower)) {
    return {
      calibrations: {
        direct: "This doesn't feel fair to me. Before I agree, I need us to look at what you're actually asking.",
        warm: "I want this to be fair to both of us, and it doesn't feel that way yet. Can we slow down and look at the actual ask?",
        concise: "This doesn't feel fair. Can we look at the actual ask first?",
      },
      notes: [
        "Replaced the character judgment (“unreasonable”) with the real objection: the ask doesn't feel fair.",
        "Asked to look at the request itself, which is something the other person can answer.",
      ],
    };
  }

  // Guilt, emotional pressure, manipulation, coercion ("You can't guilt me into doing what you want")
  if (
    /\b(guilt|guilting|guilt-trip|pressure me|pressuring|pressured me|manipulat|coerce|twist my arm|make me feel bad|doing what you want|talk me into|push me into|force me|forcing me|you can't make me|you cant make me|stop pushing|take no for an answer|already said no)\b/i.test(
      lower,
    )
  ) {
    const specificAction = extractSpecificActionAfterInto(raw);
    return {
      calibrations: {
        direct: specificAction
          ? `I'm not going to be pushed into ${specificAction}. My answer is no, and I need that respected.`
          : "I'm not going to say yes because I feel pushed. My answer is no, and I need that respected.",
        warm: specificAction
          ? `I care about you, and I'm still saying no to ${specificAction}. If I agreed from guilt, I'd resent it later.`
          : "I care about you, and I'm still saying no. If I agreed out of guilt, I'd resent it, and I don't want that between us.",
        concise: specificAction
          ? `No on ${specificAction}. Pushing me won't change it.`
          : "My answer is no. Please don't push me to change it.",
      },
      notes: [
        "Turned the accusation (“you can’t guilt me”) into a settled answer: no.",
        "Took out the contest (“doing what you want”) so there is nothing to argue about except the decision.",
        specificAction
          ? `Kept the specific thing you are refusing: ${specificAction}.`
          : "Did not invent a reason, a time, or a compromise you didn't offer.",
      ],
    };
  }

  // 2. Control, autonomy, micromanagement ("Stop telling me what to do", "You can't control me")
  if (
    /\b(control me|controlling|boss me|stop telling me|don't tell me what to do|dont tell me what to do|run my life|my life|my choice|back off|mind your own|none of your business|butt out|stop micromanaging|let me do my job)\b/i.test(
      lower,
    )
  ) {
    const decision = subject ? `The call on ${subject} is mine.` : "This is my decision to make.";
    return {
      calibrations: {
        direct: `${decision} I need you to step back and let me make it.`,
        warm: subject
          ? `I don't want to fight about ${subject}. I need to make this call myself, and I'd like you to trust me with it.`
          : "I don't want to fight about this. I need to make this call myself, and I'd like you to trust me with it.",
        concise: subject ? `${subject.charAt(0).toUpperCase()}${subject.slice(1)} is my call. Please let me make it.` : "This one's my call. Please let me make it.",
      },
      notes: [
        "Said whose decision it is, without thanking them for trust they haven't shown.",
        "Asked them to step back, which is the actual request.",
      ],
    };
  }

  // 3. Feeling unheard, interrupted, dismissed, invalidated ("You never listen to me", "Stop talking over me")
  if (
    /\b(never listen|don't listen|dont listen|not listening|talking over me|talk over me|interrupt|dismiss|invalidat|hear a word|talking to a wall|talk to a wall|ignore what i say|don't care how i feel|my feelings don't matter)\b/i.test(
      lower,
    )
  ) {
    const interrupted = /\b(interrupt|talking over|talk over)\b/i.test(lower);
    return {
      calibrations: {
        direct: interrupted
          ? "I don't feel heard right now. I need to finish before you respond."
          : "I don't feel heard right now. I need you to listen to what I'm saying before you respond.",
        warm: "I want us to understand each other, and right now I don't feel heard. Can you hear me out before you answer?",
        concise: "I don't feel heard. Please just listen.",
      },
      notes: [
        "Replaced “you never listen” with what is true right now: you don't feel heard.",
        interrupted
          ? "Kept the interruption, because you named it, and asked to finish."
          : "Did not invent an interruption or a timer the draft never mentioned.",
      ],
    };
  }

  // 4. Disrespect, condescension, sharp tone ("Don't talk to me like that", "Watch your tone", "Who do you think you are")
  if (
    /\b(talk to me like that|speak to me like that|watch your tone|watch your mouth|who do you think you are|disrespect|condescend|patroniz|talk down to me|your attitude|being rude|so rude to me|treat me like)\b/i.test(
      lower,
    )
  ) {
    const later = timeRef ? ` If it stays like this, I'll come back to it ${timeRef}.` : "";
    return {
      calibrations: {
        direct: `I'm not okay with how you're speaking to me right now. I need you to talk to me respectfully.${later}`,
        warm: "I do want to hear what you have to say, and it's hard when you talk to me this way. Can you say it more kindly?",
        concise: "Please speak to me with respect.",
      },
      notes: [
        "Named the tone as the problem and asked for respect, without matching it.",
        timeRef
          ? `Kept ${timeRef}, because you named it.`
          : "Did not invent a time to resume.",
      ],
    };
  }

  // 5. Blame-shifting / "Not my fault" / "You messed up" / "Do your own work"
  if (
    /\b(not my fault|not my problem|your fault|you messed up|you screwed up|you broke|you ruined|clean up your mess|not my job|figure it out yourself|deal with it yourself|stop blaming me|don't blame me)\b/i.test(
      lower,
    )
  ) {
    const topic = subject && subject !== "this" ? ` ${subject}` : " this";
    return {
      calibrations: {
        direct: `I don't think${topic} is on me, and I'm not going to fix it. I need you to handle it.`,
        warm: "I don't want to argue about blame. I'm not the one to sort this out, so I need you to take it from here.",
        concise: "This one isn't mine to fix. Please handle it.",
      },
      notes: [
        "Kept the boundary — this isn't yours to fix — without “figure it out yourself.”",
        "Did not promise a piece of the work you never named.",
      ],
    };
  }

  // 6. Selfishness / One-sided effort / Lack of reciprocity
  if (
    /\b(selfish|only care about yourself|all about you|one-sided|i do everything|pull your weight|carry the load|never help|don't help|dont help|inconsiderate|take me for granted)\b/i.test(
      lower,
    )
  ) {
    return {
      calibrations: {
        direct: `Right now the effort between us feels uneven, and I'm starting to feel resentful. I need us to share the load more fairly going forward.`,
        warm: `I'm feeling stretched thin carrying this on my own, and I don't want that to turn into resentment between us. Can we talk about how to balance this more evenly?`,
        concise: `This feels one-sided right now — I need us to share the effort more evenly.`,
      },
      notes: [
        "Translated a character label (“selfish”) into the concrete impact on your energy and the relationship.",
        "Named the need for shared effort before resentment builds further.",
      ],
    };
  }

  // 7. Dishonesty / Broken promises / Trust / Excuses
  if (
    /\b(lying|lied to me|you lie|dishonest|bullshit|full of excuses|all excuses|can't trust|cant trust|don't trust|dont trust|broke your promise|promised me|story keeps changing)\b/i.test(
      lower,
    )
  ) {
    return {
      calibrations: {
        direct: `What you're sharing now doesn't match what we agreed on earlier, and that makes it hard for me to trust where things stand. I need a straightforward answer so I know how to proceed.`,
        warm: `Trust matters a lot to me, and right now the mixed signals are leaving me uneasy. Can we be completely transparent with each other about what's actually happening?`,
        concise: `The mixed signals are making it hard to trust where things stand — I need a straightforward answer here.`,
      },
      notes: [
        "Named the gap between prior commitments and current actions without using inflammatory labels.",
        "Anchored the request on clarity and rebuilding trust.",
      ],
    };
  }

  // 8. Overwhelm / Exhaustion / Need space ("I'm sick of this", "I'm done", "Leave me alone")
  if (
    /\b(sick of|tired of|fed up|over this|had enough|i'm done|im done|can't do this anymore|cant do this anymore|leave me alone|stop texting me|give me space|at my limit|exhausting)\b/i.test(
      lower,
    )
  ) {
    const until = timeRef ? ` I'll come back to it ${timeRef}.` : "";
    return {
      calibrations: {
        direct: `I've had enough of this for now. I need you to give me some space.${until}`,
        warm: timeRef
          ? `I'm really drained by this right now, and I need some time on my own until ${timeRef}. Please give me that space.`
          : "I'm really drained by this right now, and I need some time on my own. Please give me that space.",
        concise: "I need some space right now.",
      },
      notes: [
        "Turned “leave me alone” into a plain request for space.",
        timeRef ? `Kept ${timeRef}, because you named when you'd return.` : "Did not promise a return time you didn't give.",
      ],
    };
  }

  // 9. Saying No / Refusal / Declining ("I don't want to", "I'm not doing that", "No way")
  if (
    /\b(i don't want to|i dont want to|i'm not going to|im not going to|i'm not doing|im not doing|no way|i won't do|i wont do|i refuse|count me out|don't have time|not happening)\b/i.test(
      lower,
    )
  ) {
    const about = subject ? ` on ${subject}` : " on this";
    return {
      calibrations: {
        direct: `I won't be able to take this on right now. My bandwidth is spoken for, so I need to pass${about}.`,
        warm: `Thank you for thinking of me — I need to pass${about} right now so I can honor my current commitments, and I hope it goes smoothly.`,
        concise: `I don't have the bandwidth for this right now, so I'll need to pass.`,
      },
      notes: [
        "Delivered a clean, unambiguous “no” without defensiveness or over-justifying.",
      ],
    };
  }

  return null;
}

function buildContextualCalibrations(slug: string, raw: string, tone: ToneResult): {
  calibrations: VoiceCalibration;
  notes: string[];
} {
  const lower = raw.toLowerCase();
  const timeRef = extractTimeReference(raw);
  const subject = extractSubject(raw);
  const notes: string[] = [];

  if (isCalmDraft(raw, lower, tone)) return calmCalibrations(raw);

  const archetype = detectInterpersonalArchetype(raw, lower, timeRef, subject);
  if (archetype) return archetype;

  if (tone.label === "destructive") {
    notes.push("Removed personal attacks and contemptuous phrasing so the recipient focuses on your actual request.");
  } else if (tone.label === "negative") {
    notes.push("Lowered the emotional heat while keeping your boundary and expectation unmistakably clear.");
  } else {
    notes.push("Tightened the structure so your main ask lands in the first sentence.");
  }

  const route = fitsStudio(slug, lower) ? slug : "pause";

  switch (route) {
    case "repair": {
      notes.push("Eliminated any defensive “but” clause so the apology reads as genuine ownership.");
      notes.push("Closed with a concrete invitation to reset when the other person is ready.");
      const topicPhrase = subject ? ` about ${subject}` : "";
      const whenPhrase = timeRef ? ` ${timeRef}` : "";
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
      if (isCalmDraft(raw, lower, tone)) return calmCalibrations(raw);
      const archetype = detectInterpersonalArchetype(raw, lower, timeRef, subject);
      if (archetype) return archetype;

      notes.push("Stripped self-deprecating hedges and preamble so the recipient can answer in ten seconds.");
      const topicAsk = subject || "this";
      const timed = timeRef ? ` for ${timeRef}` : "";
      return {
        calibrations: {
          direct: timeRef
            ? `Quick check on ${topicAsk} — does ${timeRef} still work on your end, or should we adjust?`
            : `Quick check on ${topicAsk} — does the current plan still work, or should we adjust?`,
          warm: `Hey — checking in on ${topicAsk}${timed}. Let me know if that still works, or if another time is easier.`,
          concise: timeRef
            ? `Still good for ${topicAsk} ${timeRef}?`
            : `Still good for ${topicAsk}, or should we pick another time?`,
        },
        notes,
      };
    }

    case "deal": {
      notes.push("Replaced artificial pressure with an operational timeline and a clear yes/no decision frame.");
      const topic = subject || "this";
      return {
        calibrations: {
          direct: timeRef
            ? `To hold the date on ${topic}, we need a decision by ${timeRef}. Should we lock that in, or push it?`
            : `I need a clear decision on ${topic}: should we move ahead, pause, or pass?`,
          warm: timeRef
            ? `Checking on ${topic}. We can hold the date through ${timeRef} — want to keep it, or release it for now?`
            : `Checking on ${topic}. Do you want to move ahead, pause, or pass?`,
          concise: timeRef
            ? `Decision on ${topic} by ${timeRef}: lock it in, or push it?`
            : `On ${topic}: move ahead, pause, or pass?`,
        },
        notes,
      };
    }

    case "desk": {
      notes.push("Validated the customer's frustration immediately instead of opening with policy or excuses.");
      notes.push("Assigned personal ownership and a specific clock time for the next update.");
      const issue = subject || "this";
      const when = timeRef ? `by ${timeRef}` : "today";
      return {
        calibrations: {
          direct: `You're right to be frustrated about ${issue}. I've taken it on personally, and I'll update you ${when} with the fix or the next step.`,
          warm: `I'm sorry this has been frustrating. I'm holding ${issue} from here, and I'll write you ${when} with where it stands.`,
          concise: `I'm sorry about ${issue}. I own it from here and will update you ${when}.`,
        },
        notes,
      };
    }

    case "lead": {
      notes.push("Separated the quality bar of the work from personal criticism of the individual.");
      notes.push("Named a specific deadline and offered a concrete way to unblock progress.");
      const artifact = subject || "this draft";
      const label = artifact.charAt(0).toUpperCase() + artifact.slice(1);
      const due = timeRef ? ` before ${timeRef}` : "";
      return {
        calibrations: {
          direct: `${label} isn't ready for review yet. The main point needs to be unmistakable at the top${due}. I can mark up the first section if that helps.`,
          warm: `Thanks for the first pass on ${artifact}. The main point needs to lead${due}. Want to walk through it together?`,
          concise: `The main point in ${artifact} needs to lead${due}. I can mark up the first section.`,
        },
        notes,
      };
    }

    case "hire": {
      notes.push("Replaced generic flattery with a specific reason to write and an easy way to say no.");
      const minutes = raw.match(/\b(\d+\s*(?:min|mins|minutes))\b/i)?.[1];
      const intro = minutes || "a short intro";
      const when = timeRef ? ` ${timeRef}` : "";
      return {
        calibrations: {
          direct: `I wanted to reach out about a role that fits work you've already done. Open to ${intro}${when}, or I can send a short brief first.`,
          warm: `Hi — I had a specific reason for writing, and there's no pressure to be looking. I can send a one-page brief, or we can do ${intro}${when} if you're curious.`,
          concise: `Open to ${intro}${when}, or want the brief first?`,
        },
        notes,
      };
    }

    case "keep": {
      notes.push("Anchored the check-in around account value and reduced the ask to a one-line decision.");
      return {
        calibrations: {
          direct: `Ahead of your renewal, one question: keep the current plan as-is, or adjust it${timeRef ? ` before ${timeRef}` : " before it renews"}?`,
          warm: `I'll keep this to one line. With your renewal coming up, should the current plan stay as-is, or do you want to change it${timeRef ? ` before ${timeRef}` : ""}?`,
          concise: `Renewal question: keep the plan as-is, or adjust it${timeRef ? ` before ${timeRef}` : ""}?`,
        },
        notes,
      };
    }

    case "steady": {
      notes.push("Applied the BIFF standard (Brief, Informative, Friendly, Firm) — keeping only logistics and the child's need.");
      const item = subject;
      const when = timeRef;
      const direct = item && when
        ? `Please include ${item} at the ${when} handoff. Thank you.`
        : item
          ? `Please include ${item} at the handoff. Thank you.`
          : when
            ? `Please confirm the ${when} handoff and what should come with them. Thank you.`
            : "Please send the handoff time and what should come with them. Thank you.";
      return {
        calibrations: {
          direct,
          warm: item && when
            ? `Hi — please bring ${item} for the ${when} handoff. Thank you.`
            : item
              ? `Hi — please bring ${item} to the handoff. Thank you.`
              : when
                ? `Hi — please confirm ${when} and what should come with them. Thank you.`
                : "Hi — please send the handoff time and what they need to bring. Thank you.",
          concise: item && when
            ? `Please include ${item} at ${when}. Thank you.`
            : item
              ? `Please bring ${item}. Thank you.`
              : when
                ? `Please confirm ${when}. Thank you.`
                : "Please send the handoff time. Thank you.",
        },
        notes,
      };
    }

    case "pause":
    default: {
      if (isCalmDraft(raw, lower, tone)) {
        return calmCalibrations(raw);
      }

      if (/\b(ignore|ignored|ignoring|ghost|never reply|don't reply|haven't heard|unanswered)\b/i.test(lower)) {
        const about = extractAbout(raw);
        const allDay = /\ball day\b/i.test(lower);
        const replyBy = timeRef ? ` I need it by ${timeRef}.` : "";
        notes.push("Replaced the blame with the fact that you haven't heard back, and asked for a reply.");
        if (!about && !timeRef) {
          notes.push("Did not invent a plan, a count of texts, or a deadline you didn't name.");
        }
        return {
          calibrations: {
            direct: about
              ? `I haven't heard back about ${about}${allDay ? " all day" : ""}. I need a reply, even a short one.${replyBy}`
              : allDay
                ? `I get annoyed when my texts go unanswered all day, and I want to be clear about why I'm upset. I need a reply, even a short one.${replyBy}`
                : `I haven't heard back. I need a reply, even a short one.${replyBy}`,
            warm: about
              ? `I'm not trying to start a fight. It's hard for me when I don't hear back about ${about}. Even a quick reply would help.`
              : "I'm not trying to start a fight. It's hard for me when I don't hear back all day, and even a quick reply would help a lot.",
            concise: about
              ? `Haven't heard back about ${about}. Please reply when you can.`
              : "Not hearing back all day bothers me. Please reply when you can.",
          },
          notes,
        };
      }

      if (/^(fine|whatever|k|ok|do what you want|forget it|i don't care)/i.test(lower.trim())) {
        const until = timeRef ? ` I'll come back to it ${timeRef}.` : "";
        notes.push("Said that you're too frustrated to keep going, without pretending you don't care.");
        if (!timeRef) notes.push("Did not invent a clock time to restart.");
        return {
          calibrations: {
            direct: `I'm too frustrated to keep talking about this right now. I need a break before we go any further.${until}`,
            warm: timeRef
              ? `I'm worn out, and I don't want to say something I'll regret. I need to step away until ${timeRef}.`
              : "I'm worn out, and I don't want to say something I'll regret. I need to step away from this for a bit.",
            concise: "I need a break from this right now.",
          },
          notes,
        };
      }

      if (/\b(cancel|canceling|bail|bailing|flak|late|last minute|spring this)\b/i.test(lower)) {
        const notice = extractNotice(raw);
        const again = /\bagain\b/i.test(lower);
        const late = notice ? `${notice} before we meet` : "this late";
        notes.push(
          notice
            ? `Kept the ${notice} notice and asked for earlier warning.`
            : "Asked for earlier warning without inventing how late the cancellation was.",
        );
        if (again) notes.push("Kept that this has happened before, because you said again.");
        return {
          calibrations: {
            direct: `Canceling ${late}${again ? ", and not for the first time," : ""} is really frustrating. I need you to tell me earlier when plans change.`,
            warm: again
              ? `I'm disappointed, and this has happened before. If plans change, please let me know as early as you can.`
              : `I'm disappointed. If plans change, please let me know as early as you can.`,
            concise: notice
              ? `Canceling ${notice} out${again ? " again" : ""} is hard on me. I need more notice.`
              : `Canceling this late${again ? " again" : ""} is hard on me. I need more notice.`,
          },
          notes,
        };
      }

      const archetype = detectInterpersonalArchetype(raw, lower, timeRef, subject);
      if (archetype) {
        return archetype;
      }

      if (/\b(you always|you never)\b/i.test(lower)) {
        notes.push("Shifted from “you always / you never” (which triggers instant defensiveness) to today's specific situation and what you need next.");
        const about = subject || "what happened today";
        return {
          calibrations: {
            direct: `I'm not going to argue about always or never. I need a plan for ${about}${timeRef ? ` at ${timeRef}` : ""}.`,
            warm: `I don't want to make this about always or never. Can we deal with ${about}${timeRef ? ` at ${timeRef}` : ""} and decide the next step?`,
            concise: `Let's deal with ${about}, not with always or never.`,
          },
          notes,
        };
      }

      // Second-person ("you...") or imperatives ("stop...", "don't...") or tense/destructive drafts:
      // Transform into a first-person boundary so we NEVER echo raw user text back.
      const aboutPhrase = subject ? ` about ${subject}` : "";
      const onTopic = subject ? ` on ${subject}` : " on this";
      const whenPhrase = timeRef ? ` ${timeRef}` : "";

      if (
        tone.label === "destructive" ||
        tone.label === "negative" ||
        /\b(you|your|you're|youre|stop|don't|dont|can't|cant|won't|wont|why)\b/i.test(lower)
      ) {
        notes.push(
          "Shifted from second-person pushback to a calm, first-person boundary that holds your ground without escalating.",
        );
        notes.push(
          "Removed adversarial framing so the other person has to respond to your boundary rather than your tone.",
        );
        return {
          calibrations: {
            direct: `Where we stand right now${aboutPhrase} isn't working for me. I want to be upfront about my boundary here and agree on a clear path forward${timeRef ? ` by ${timeRef}` : ""}.`,
            warm: `I want to sort this out${aboutPhrase}. Can we talk about the specific issue${whenPhrase}?`,
            concise: `I'll talk about the actual issue${aboutPhrase}. I need it to be calm.`,
          },
          notes,
        };
      }

      notes.push("Structured your note into a clear, low-friction check-in with an easy next step.");
      return {
        calibrations: {
          direct: `Wanted to align${onTopic} and make sure we're on the same page. Let me know what works best on your end${timeRef ? ` by ${timeRef}` : ""}.`,
          warm: `Hey — wanted to check in${aboutPhrase} and see how things look on your end. Open to aligning on next steps${timeRef ? ` ${timeRef}` : " when you have a moment"}?`,
          concise: `Quick check-in${aboutPhrase} — let me know what works on your end${timeRef ? ` by ${timeRef}` : ""}.`,
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
        label:
          afterTone.label === "destructive" || afterTone.label === "negative" ? "neutral" : "positive",
        score: Math.min(0.84, Math.max(0.68, afterTone.score)),
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
    score: Math.min(0.84, Math.max(0.68, rawAfter.score)),
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
