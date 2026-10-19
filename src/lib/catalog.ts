export type ProductKind = "mirror" | "coach" | "thread" | "bench";

export type ProductCategory = "personal" | "work" | "home" | "team";

export type ProductSample = {
  label: string;
  context?: string;
  text: string;
  rewrites?: {
    direct: string;
    warm: string;
    concise: string;
  };
  notes?: string[];
};

export type Product = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  priceMonthly: number;
  category: ProductCategory;
  kind: ProductKind;
  audience: string;
  includes: string[];
  principles: string[];
  preview: {
    before: string;
    after: string;
    shift: string;
  };
  samples: ProductSample[];
  href: string;
};

export type Bundle = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  priceMonthly: number;
  productSlugs: string[];
  highlight?: boolean;
};

export const products: Product[] = [
  {
    slug: "mirror",
    number: "01",
    name: "Mirror",
    eyebrow: "Personal Telemetry",
    summary: "See how you actually sound across the conversations that matter.",
    description:
      "A private inbox that scores the emotional climate of every thread and builds a longitudinal report of your own tone — warm, even, tense, or harmful — over weeks, not just a single text.",
    priceMonthly: 800,
    category: "personal",
    kind: "mirror",
    audience: "Anyone who wants an honest read on their own habits before blaming the other person.",
    includes: [
      "Live thread climate meter",
      "Personal tone & clarity score",
      "Multi-day clarity streak",
      "Per-relationship warmth breakdown",
    ],
    principles: [
      "Score your own sends first.",
      "A thread can cool without anyone being the villain.",
      "Repair counts more than an unbroken streak.",
    ],
    preview: {
      before: "I forgot and made other plans. You always spring this last minute.",
      after: "I’m sorry — I double-booked tonight and spoke sharply earlier. Let me cook tomorrow so we can catch up properly.",
      shift: "Tense 24 → Warm 89",
    },
    samples: [],
    href: "/app",
  },
  {
    slug: "pause",
    number: "02",
    name: "Pause",
    eyebrow: "Before You Send",
    summary: "Catch a heated draft in three seconds and keep your real point.",
    description:
      "Paste the text, DM, or email you are ten seconds from sending. Pause strips out global blame and sarcasm, names the actual boundary, and hands back three natural ways to say it.",
    priceMonthly: 600,
    category: "personal",
    kind: "coach",
    audience: "The ten seconds before a sharp text, Slack reply, or late-night DM leaves your phone.",
    includes: [
      "Instant heat & signal detection",
      "Three calibrated rewrites (Direct, Warm, Short)",
      "Line-by-line explanation of what shifted",
    ],
    principles: [
      "Honesty stays. Contempt goes.",
      "Name the exact moment instead of “you always.”",
      "State what you need next, not just what went wrong.",
    ],
    preview: {
      before: "You always ignore my texts all day and then act confused when I’m annoyed.",
      after: "I texted twice today about dinner and didn’t hear back. Can you let me know by 5 if we’re still on?",
      shift: "Harmful 19 → Clear 86",
    },
    samples: [
      {
        label: "Unanswered texts",
        context: "Waiting all day to confirm evening plans",
        text: "You always ignore my texts all day and then act confused when I'm annoyed. This is ridiculous.",
        rewrites: {
          direct:
            "I texted you twice today about tonight's plans and didn't hear back. When I'm left guessing all afternoon, it throws off my evening. Can you let me know by 5 if we're still on?",
          warm:
            "Hey — I sent a couple of texts earlier about dinner and hadn't heard back, so I wasn't sure how to plan my evening. Are we still good for tonight, or should we move it to tomorrow?",
          concise:
            "I hadn't heard back on my texts about dinner — let me know by 5 if tonight still works.",
        },
        notes: [
          "Replaced “you always ignore me” with the concrete fact: two unanswered texts about tonight.",
          "Cut “act confused” and “this is ridiculous,” which invite a fight about character instead of an answer about dinner.",
          "Ended with a clear 5:00pm check-in so the other person knows how to resolve it.",
        ],
      },
      {
        label: "Curt shutdown",
        context: "Pulling back in the middle of an argument",
        text: "Fine. Whatever. Do what you want, I don't care anymore.",
        rewrites: {
          direct:
            "I do care about how we decide this, and I'm too frustrated right now to talk about it productively. Give me an hour to cool off and let's revisit it at 7.",
          warm:
            "I'm feeling overwhelmed and don't want to say something I don't mean. Can we pause for a bit and talk through this tonight once we've both had a breather?",
          concise:
            "I'm too frustrated to talk this through well right now. Let's pause and revisit at 7.",
        },
        notes: [
          "Replaced the stonewalling (“Fine. Whatever.”) with the truth: you do care, and you're flooded.",
          "Named a specific time to return (7:00) so taking space reads as self-regulation, not abandonment.",
        ],
      },
      {
        label: "Last-minute bail",
        context: "Someone cancels 20 minutes before meeting",
        text: "Seriously? You're bailing again 20 minutes before we meet? Unbelievable.",
        rewrites: {
          direct:
            "Canceling 20 minutes before we're supposed to meet throws off my whole evening. I need us to stick to plans we confirm, or give a heads-up earlier in the day.",
          warm:
            "I already rearranged my evening to head over, so a 20-minute heads-up is tough on my schedule. Let's only lock in a new time when we're both sure we can make it.",
          concise:
            "A 20-minute cancellation is tough when I've already cleared my evening. Next time, please let me know earlier in the day.",
        },
        notes: [
          "Kept the boundary firm — canceling 20 minutes out is not okay — without the sarcasm (“Seriously? Unbelievable.”).",
          "Stated the standard for next time clearly so the message commands respect.",
        ],
      },
    ],
    href: "/apps/pause",
  },
  {
    slug: "thread",
    number: "03",
    name: "Thread",
    eyebrow: "Full Exchange",
    summary: "Paste an entire conversation. See where it cooled and what to send next.",
    description:
      "Drop a multi-message transcript from iMessage, WhatsApp, or Slack. Thread maps the emotional arc line by line, scores both sides fairly, and drafts three next moves depending on whether you want to repair, clarify, or hold a boundary.",
    priceMonthly: 600,
    category: "personal",
    kind: "thread",
    audience: "When a single bubble doesn’t tell the story and you need to see where the thread turned.",
    includes: [
      "Line-by-line speaker & tone breakdown",
      "Directional climate arc",
      "Three calibrated next-reply options",
    ],
    principles: [
      "Context changes what a short reply means.",
      "Notice a bid for connection before answering the surface words.",
      "Never diagnose the other person.",
    ],
    preview: {
      before: "Alex: That stung. I was hoping for a little care.\nYou: Fine.",
      after: "You’re right — you told me you had a rough day and I brushed past it. Let me pick up dinner on my way home.",
      shift: "Cooling 34 → Warming 84",
    },
    samples: [
      {
        label: "Cooling dinner thread",
        context: "A partner reaches out after a hard day and gets a defensive reply",
        text: "Alex: Are we still on for dinner? I had a rough day.\nYou: You always spring this last minute.\nAlex: That stung. I was hoping for a little care.\nYou: Fine.",
      },
      {
        label: "Project handoff friction",
        context: "Two teammates clashing over a late spec change in Slack",
        text: "Dana: Hey, we need to add the SSO screen to Friday's release.\nYou: Are you kidding? Scope was locked on Monday.\nDana: The enterprise buyer just made it a blocker for signing.\nYou: Not my problem. Figure out what you're cutting then.",
      },
      {
        label: "Friend who feels flaked on",
        context: "Reaching out after canceling twice in a row",
        text: "You: Hey! Miss you — free for coffee this weekend?\nSam: Maybe. You've canceled the last two times.\nYou: I know, work has been crazy.\nSam: Everyone is busy. I just need to know you'll actually show up.",
      },
    ],
    href: "/apps/thread",
  },
  {
    slug: "repair",
    number: "04",
    name: "Repair",
    eyebrow: "After It Went Wrong",
    summary: "The clean apology you send once the damage is already done.",
    description:
      "Most apologies fail because they sneak the original argument back into the second half of the sentence. Repair removes the “but,” names your exact part with dignity, and offers a concrete next step.",
    priceMonthly: 600,
    category: "personal",
    kind: "coach",
    audience: "The hour after a fight, a defensive reply, or a comment that landed wrong in a meeting.",
    includes: [
      "Removes the defensive “sorry, but…” hook",
      "Ownership without groveling",
      "Concrete reset offer",
    ],
    principles: [
      "Name your part in the first sentence.",
      "Never relitigate the argument inside an apology.",
      "Offer a concrete action, not a monologue.",
    ],
    preview: {
      before: "Sorry if you took it the wrong way, but you never listen and someone had to say it.",
      after: "I’m sorry for how I spoke to you earlier — cutting you off was disrespectful. When you’re ready, I’d like to hear your side without interrupting.",
      shift: "Harmful 21 → Warm 91",
    },
    samples: [
      {
        label: "Non-apology with a “but”",
        context: "Apologizing while still trying to win the fight",
        text: "Sorry if you took it the wrong way, but you never listen and someone had to say it.",
        rewrites: {
          direct:
            "I'm sorry for how sharply I said that earlier. Even though I wanted to raise a real concern, my tone was disrespectful. When you're ready, I'd like to talk it through calmly and actually listen.",
          warm:
            "I'm sorry — I came in hot earlier and made it hard for us to have a real conversation. You didn't deserve that tone. Can we reset tonight so I can hear your side properly?",
          concise:
            "I'm sorry for my tone earlier — that was unfair to you. I'd like to reset and talk it through calmly when you're ready.",
        },
        notes: [
          "Removed “Sorry if you took it the wrong way,” which blames the listener for being hurt.",
          "Cut “you never listen and someone had to say it,” which restarts the fight immediately.",
          "Kept your dignity while owning the delivery.",
        ],
      },
      {
        label: "Snapped in a meeting",
        context: "Shutting down a colleague in front of the group",
        text: "Sorry I snapped in standup, I was just stressed because the timeline makes no sense.",
        rewrites: {
          direct:
            "I owe you an apology for cutting you off in standup earlier. I was stressed about the release dates, and I shouldn't have taken that out on you in front of the team. Let's look at the timeline together this afternoon.",
          warm:
            "Hey — I'm really sorry for how I reacted in standup. You were raising a fair question and I answered defensively. If you have 10 minutes after lunch, I'd love to walk through the schedule together.",
          concise:
            "Sorry for cutting you off in standup earlier — that wasn't fair to you. Let's review the timeline together this afternoon.",
        },
        notes: [
          "Separated your stress about the timeline from how you treated your colleague.",
          "Acknowledged that it happened in front of the group, which is the part that stings most.",
        ],
      },
      {
        label: "Forgot an important commitment",
        context: "Missing a promised call or dinner",
        text: "My bad for missing your call, today was a total disaster and my phone died.",
        rewrites: {
          direct:
            "I'm really sorry I missed our call tonight. I let my schedule get away from me and didn't give you a heads-up, and I know your time matters. Can I call you tomorrow at 6, and I'll make sure my evening is clear?",
          warm:
            "I'm so sorry I missed our call earlier — I hate that I left you waiting. No excuses on my end. Are you free tomorrow at 6 so I can give you my full attention?",
          concise:
            "I'm really sorry I missed our call and left you waiting. Can I call you tomorrow at 6 with my schedule cleared?",
        },
        notes: [
          "Upgraded “My bad” and the list of excuses into genuine accountability for the other person's time.",
          "Offered a specific make-up time with a commitment to protect it.",
        ],
      },
    ],
    href: "/apps/repair",
  },
  {
    slug: "brief",
    number: "05",
    name: "Brief",
    eyebrow: "Make It Short",
    summary: "Turn an anxious ramble or voice-note dump into one clear, warm sentence.",
    description:
      "When you feel awkward asking for something, you pad the message with five hedges and three apologies. Brief strips the nervous scaffolding and leaves a clean, confident note anyone can answer in ten seconds.",
    priceMonthly: 600,
    category: "personal",
    kind: "coach",
    audience: "When you have a 90-second voice-note in your head and need a two-line text.",
    includes: [
      "Strips self-deprecating hedges",
      "Isolates the single clear ask",
      "Keeps warmth in half the words",
    ],
    principles: [
      "One request per message.",
      "Lead with the point, not the apology for writing.",
      "Warmth takes five words, not a paragraph.",
    ],
    preview: {
      before: "Hey so I was thinking maybe if you aren’t too busy we could move Thursday to Friday, no pressure though, sorry this is long.",
      after: "Hey! Could we move our Thursday catch-up to Friday at 2pm? If not, next week works great too.",
      shift: "42 words → 18 words",
    },
    samples: [
      {
        label: "Reschedule ramble",
        context: "Over-explaining a simple calendar change",
        text: "Hey so I was thinking and I don't know maybe it's nothing but like I feel like we keep missing each other and I basically just want to know if Thursday still works or if we should pick another day, no pressure though, sorry this is long.",
        rewrites: {
          direct:
            "Hey! Does Thursday at 6 still work for you to catch up, or should we pick a day next week?",
          warm:
            "I'd love to properly catch up this week — does Thursday evening still work for you, or is another day easier?",
          concise:
            "Still good for Thursday, or should we pick another day?",
        },
        notes: [
          "Cut 34 words of nervous hedging (“maybe it's nothing”, “no pressure though”, “sorry this is long”).",
          "Made the question binary and effortless to reply to.",
        ],
      },
      {
        label: "Asking a favor",
        context: "Burying an introduction request at the bottom of a paragraph",
        text: "Hi Marcus, hope you're doing super well! I know you're slammed right now so totally ignore this if it's annoying, but I saw you know Elena at Linear and I've been trying to reach her team, so I was wondering if maybe you'd feel comfortable making a quick intro?",
        rewrites: {
          direct:
            "Hi Marcus — hope your week is going well. Would you be open to introducing me to Elena at Linear? Happy to send a 3-line forwardable blurb so it takes you 30 seconds.",
          warm:
            "Hi Marcus! I noticed you're connected with Elena at Linear. If you know her well enough, would you be comfortable making a quick intro? I can send a short blurb to make it easy — and no worries at all if not.",
          concise:
            "Hi Marcus — would you be open to introducing me to Elena at Linear? I can send a short forwardable blurb.",
        },
        notes: [
          "Removed “totally ignore this if it's annoying,” which lowers your status and makes the ask feel heavy.",
          "Added an offer to send a forwardable blurb, which removes the actual friction for the person helping you.",
        ],
      },
      {
        label: "Setting a boundary",
        context: "Declining a weekend event without a fake excuse",
        text: "Hey guys, so this week has just been super crazy with work and errands and I think I might have a headache coming on so I don't think I can make it to the party Saturday, really sorry!",
        rewrites: {
          direct:
            "I won't be able to make it Saturday night — I need a quiet weekend to recharge. Have a great time and let's get dinner next week!",
          warm:
            "I'm going to sit Saturday night out so I can catch up on rest after a long week. Hope it's a great night — let's grab dinner just us next week!",
          concise:
            "Won't be able to make Saturday night, taking a quiet weekend to recharge. Have the best time!",
        },
        notes: [
          "Replaced the invented medical excuse with a confident, adult reason nobody can argue with.",
          "Added a warm follow-up so declining the event still affirms the friendship.",
        ],
      },
    ],
    href: "/apps/brief",
  },
  {
    slug: "deal",
    number: "06",
    name: "Deal",
    eyebrow: "Sales & Founders",
    summary: "The follow-up that earns a decision without sounding desperate.",
    description:
      "Fake urgency (“need an answer today or we’re moving on”) signals weakness and kills executive trust. Deal rewrites pipeline follow-ups, pricing nudges, and scope notes so you hold high status while getting a clear yes or no.",
    priceMonthly: 900,
    category: "work",
    kind: "coach",
    audience: "Founders, account executives, and consultants writing emails where one wrong line loses the deal.",
    includes: [
      "High-status decision framing",
      "Removes fake urgency & needy “just bumping” openers",
      "Gives the buyer a concrete, low-friction next step",
    ],
    principles: [
      "Invented urgency reads as desperation.",
      "Give the buyer a clean way to say yes, pause, or pass.",
      "Never write “just circling back” without new value.",
    ],
    preview: {
      before: "Just circling back again. We need an answer today or we are moving on to other customers.",
      after: "To hold your May 1 onboarding slot, we’d need sign-off by Friday. Should we lock that in, or push the start date to June?",
      shift: "Tense 27 → Executive 92",
    },
    samples: [
      {
        label: "Ultimatum squeeze",
        context: "Pressuring a silent buyer for a signature",
        text: "Just circling back again. We need an answer today or we are moving on to other customers.",
        rewrites: {
          direct:
            "To hold your implementation slot for the first week of next month, we'd need the signed order back by Friday at 3pm. Should we lock that schedule in, or would pushing the kickoff to next quarter fit your team better?",
          warm:
            "Wanted to check in on timing for your rollout. I'm holding our next onboarding slot through Friday — would you like to keep that date, or should we release it for now and reconnect when your team is ready?",
          concise:
            "We're holding your onboarding slot through Friday. Should we lock that in, or push kickoff to next month?",
        },
        notes: [
          "Replaced the hostile ultimatum (“or we are moving on”) with a real operational constraint: holding an onboarding slot.",
          "Offered a binary choice (lock in Friday vs. push kickoff) that makes it safe for the buyer to reply even if they're delayed.",
        ],
      },
      {
        label: "Discount pushback",
        context: "Holding price when a prospect asks for 30% off",
        text: "We can't do 30% off, our prices are already fair and we don't discount like that.",
        rewrites: {
          direct:
            "We keep our pricing consistent across customers at this tier, so we can't take 30% off the annual rate. If budget is the main blocker for Q2, we can either start with the 15-seat core package or extend a 10% multi-year rate. Which of those helps more?",
          warm:
            "I want to find a setup that works for your budget. While we don't discount the core platform by 30%, we can phase the rollout so you only pay for the first team this quarter, or look at a two-year term for a 10% reduction. Worth exploring either option?",
          concise:
            "We hold pricing steady at this tier, so we can't do 30% off — but we can trim initial seat count for Q2 or apply a 10% two-year rate. Which works better?",
        },
        notes: [
          "Held the price firm without sounding defensive (“our prices are already fair”).",
          "Paired the boundary with two structured trade-offs (scope vs. multi-year term) so negotiations stay moving.",
        ],
      },
      {
        label: "Fourth follow-up",
        context: "Closing the file on a prospect who went dark after a demo",
        text: "Hey, I've emailed three times since our demo and haven't heard anything. Are you still interested or not?",
        rewrites: {
          direct:
            "Since I haven't heard back after our demo, I'll assume priorities shifted for this quarter and close out my follow-ups for now. If this comes back onto your radar later in the year, just reply here and we can pick right back up.",
          warm:
            "I know how fast priorities move, so I'll pause my notes here so I'm not crowding your inbox. If rolling this out becomes a priority next quarter, let me know and I'll happily refresh the proposal.",
          concise:
            "Assuming priorities shifted for Q2, so I'll pause follow-ups for now. Just reply here whenever you'd like to pick back up.",
        },
        notes: [
          "Removed the guilt-trip (“I've emailed three times”) which makes prospects avoid replying even more.",
          "Used a polite close-the-file note, which routinely gets the highest reply rate in enterprise sales.",
        ],
      },
    ],
    href: "/apps/deal",
  },
  {
    slug: "desk",
    number: "07",
    name: "Desk",
    eyebrow: "Customer Support",
    summary: "De-escalate an angry ticket in one reply without sounding like a bot.",
    description:
      "When a customer is furious, corporate canned empathy (“We apologize for any inconvenience”) pours fuel on the fire. Desk writes a human response that validates why they’re upset, takes personal ownership of the fix, and gives a real clock time.",
    priceMonthly: 900,
    category: "work",
    kind: "coach",
    audience: "Support leads, founders, and account managers answering the ticket that could become a public thread.",
    includes: [
      "Human acknowledgment (zero corporate boilerplate)",
      "Named owner of the resolution",
      "Concrete timestamp for the next update",
    ],
    principles: [
      "Validate their frustration before explaining the cause.",
      "Name what you are doing right now, then give a real clock time.",
      "Never hide behind company policy in the first paragraph.",
    ],
    preview: {
      before: "This is the third time. Your product is useless and nobody replies. Fix this now.",
      after: "You’re right to be frustrated — three messages without a fix is unacceptable. I’ve taken personal ownership of your ticket and will email you by 2:00pm EST with the resolution.",
      shift: "Escalating 14 → Steady 90",
    },
    samples: [
      {
        label: "Furious repeat ticket",
        context: "Customer writes in angry after three unresolved replies",
        text: "This is the third time. Your product is useless and nobody replies. I want this fixed now or I am posting everywhere.",
        rewrites: {
          direct:
            "You are completely right to be frustrated — having to write in three times without a real resolution is unacceptable on our end. I've taken personal ownership of your account right now, escalated the sync failure to our lead engineer, and will email you directly by 2:00pm today with the fix.",
          warm:
            "I'm really sorry we put you in a position where you had to ask three times. That's not the standard you pay us for. I am personally holding this ticket from here until it's solved, and I'll send you a direct update by 2:00pm today.",
          concise:
            "Three messages without a fix is unacceptable — I'm sorry. I own your ticket from here and will update you directly by 2:00pm today with the resolution.",
        },
        notes: [
          "Agreed with the customer's core grievance immediately (“three times without a resolution is unacceptable”) which disarms the threat.",
          "Replaced vague promises (“soon”) with personal ownership and a 2:00pm deadline.",
        ],
      },
      {
        label: "Billing dispute",
        context: "Customer angry about an unexpected auto-renewal charge",
        text: "Per our terms of service you didn't cancel 30 days before renewal so the charge is valid and non-refundable.",
        rewrites: {
          direct:
            "I see that the annual renewal ran automatically yesterday. Even though our terms normally require notice before the renewal date, we never want to trap someone in a plan they aren't using. I've just reversed the full charge back to your card — you'll see the credit in 3–5 business days.",
          warm:
            "I completely understand why an unexpected renewal charge is frustrating. Even if the cancellation window passed, if you need to pause your account instead of refunding, or if you'd like me to process a one-time exception refund today, just let me know which you prefer and I'll take care of it right away.",
          concise:
            "I see the auto-renewal ran yesterday. I've gone ahead and approved a one-time refund back to your card — it'll appear in 3–5 business days.",
        },
        notes: [
          "Removed the combative “Per our terms of service” opener that turns a routine billing ticket into a chargeback.",
          "Led with the solution so the customer feels respected rather than lectured.",
        ],
      },
      {
        label: "Outage update",
        context: "Replying when a bug is still being investigated",
        text: "Our engineers are looking into the bug and we will let you know whenever it's fixed. No ETA right now.",
        rewrites: {
          direct:
            "We've reproduced the export failure on our end and our infrastructure team is actively rolling back the release that caused it. Even if the full patch takes longer, I will send you a status update in 45 minutes (at 11:30am) with our progress or a manual export of your file.",
          warm:
            "Thank you for flagging this so quickly — we've confirmed the issue on our side and our engineers are working on the fix right now. In the meantime, I can run your export manually if you're on a deadline today, and I'll update you either way by 11:30am.",
          concise:
            "We've confirmed the bug and are rolling out the fix now. I'll update you by 11:30am — or let me know if you want me to pull your export manually right now.",
        },
        notes: [
          "Replaced “No ETA right now” (which makes customers feel helpless) with a guaranteed check-in time and a manual workaround.",
        ],
      },
    ],
    href: "/apps/desk",
  },
  {
    slug: "lead",
    number: "08",
    name: "Lead",
    eyebrow: "Managers & Execs",
    summary: "Deliver high-standard feedback without shrinking the person.",
    description:
      "When a manager sends a frustrated Slack message, the employee rereads it all afternoon. Lead turns exasperated feedback into clear, calm expectations that raise the bar on the work while keeping psychological safety intact.",
    priceMonthly: 900,
    category: "work",
    kind: "coach",
    audience: "Engineering managers, design leads, and executives giving feedback that needs to land cleanly.",
    includes: [
      "Separates the work standard from personal attack",
      "Names the exact bar & deadline",
      "Leaves room for collaborative problem-solving",
    ],
    principles: [
      "Critique the artifact, never the person’s intelligence.",
      "State the standard out loud instead of implying they should have known.",
      "End by asking what would unblock them.",
    ],
    preview: {
      before: "This deck is a mess. I don’t know why I still have to fix your slides before every review.",
      after: "The narrative on slides 4–7 isn’t ready for the exec review yet — we need the Q3 retention numbers front and center by 10am tomorrow. Want to spend 15 minutes walking through the structure?",
      shift: "Harmful 18 → Clear 88",
    },
    samples: [
      {
        label: "Messy exec deck",
        context: "Frustrated by a draft right before a leadership review",
        text: "This deck is a mess. I don't know why I still have to fix your slides before every review.",
        rewrites: {
          direct:
            "The storyline in this draft isn't tight enough for the leadership review yet. Specifically, slides 4–6 bury the Q3 retention numbers, and execs will ask for that headline first. Can you restructure those three slides by 10am tomorrow? Happy to mark up slide 4 as an example if useful.",
          warm:
            "Thanks for getting the first pass up. Before this goes to leadership tomorrow, we need to sharpen the narrative — especially putting the Q3 metrics at the top of slide 4 so the takeaway is unmistakable. Want to hop on a 10-minute huddle so we can align on the flow?",
          concise:
            "We need to tighten slides 4–6 before tomorrow's review so the Q3 metrics lead the story. Can you revise that section by 10am? Happy to mark up an example.",
        },
        notes: [
          "Cut “I don't know why I still have to fix your slides,” which shames the person without telling them what to fix.",
          "Named the exact problem (slides 4–6 burying metrics) and a clear deadline (10am tomorrow).",
        ],
      },
      {
        label: "Missed deadline",
        context: "Addressing a deliverable that slipped without notice",
        text: "You said the API spec would be done yesterday and now the whole frontend team is blocked. Why didn't you say something?",
        rewrites: {
          direct:
            "Since the API spec didn't land yesterday, frontend is currently blocked on the checkout integration. First, what's the realistic time we can get a working draft up today? Second, going forward, if a date is going to slip, I need a heads-up by midday so we can sequence the team's work.",
          warm:
            "Hey — checking in on the API spec since frontend is ready to wire up checkout today. Where does the draft stand, and is anything blocking you? Going forward, flag me early whenever a deadline looks tight so I can help clear the path.",
          concise:
            "Frontend is waiting on the API spec today — when can we post a working draft? Next time a date looks tight, please flag me early so we can adjust.",
        },
        notes: [
          "Replaced the accusatory “Why didn't you say something?” with two forward-looking items: unblocking today's work and setting the rule for early heads-ups.",
        ],
      },
      {
        label: "Quiet underperformance",
        context: "Opening a candid 1:1 conversation about slipping quality",
        text: "Your output has been really sloppy lately and the team is noticing.",
        rewrites: {
          direct:
            "In our 1:1 tomorrow, I want to talk candidly about the last two sprint deliveries. A few edge cases shipped unverified, which is below the bar you usually set. I want to understand what's getting in the way and agree on how we tighten review before the next release.",
          warm:
            "Ahead of our 1:1 tomorrow, I'd like us to spend time on the last two releases. They felt more rushed than your usual standard, and I want to check in on your workload and how we can get quality back to where we both want it.",
          concise:
            "Let's use our 1:1 tomorrow to look at the last two releases — a few bugs slipped through that are below your usual bar, and I want to align on how we tighten things up.",
        },
        notes: [
          "Removed “the team is noticing” (which breeds paranoia and triangulation).",
          "Anchored the conversation in their own high capability (“below the bar you usually set”).",
        ],
      },
    ],
    href: "/apps/lead",
  },
  {
    slug: "hire",
    number: "09",
    name: "Hire",
    eyebrow: "Recruiting Outreach",
    summary: "Write candidate outreach that sounds like a peer, not an automated drip.",
    description:
      "Senior engineers and designers delete “I came across your impressive profile” in half a second. Hire rewrites recruiting notes so they lead with a concrete reason you chose them, state the real problem, and make saying no effortless.",
    priceMonthly: 800,
    category: "work",
    kind: "coach",
    audience: "Founders, hiring managers, and recruiters writing to people who don’t have to look for a job.",
    includes: [
      "Replaces generic flattery with specific craft recognition",
      "Clear role scope in one sentence",
      "Zero-pressure opt-out",
    ],
    principles: [
      "Cite their actual work, never “your impressive background.”",
      "Say what they would build, not just adjectives about the company.",
      "Make declining comfortable so replying feels safe.",
    ],
    preview: {
      before: "Hi! I came across your impressive profile and we have an amazing opportunity you would be perfect for. 30 mins this week ASAP?",
      after: "I read your write-up on zero-downtime Postgres migrations. We’re rebuilding our storage engine and need a founding staff engineer. Open to a 15-minute intro next week, or happy to send the architecture brief first?",
      shift: "Spam 29 → Peer 91",
    },
    samples: [
      {
        label: "Generic template",
        context: "Cold LinkedIn / email outreach to a senior engineer",
        text: "Hi! I came across your impressive profile and we have an amazing opportunity you would be perfect for. Do you have 30 minutes this week? Let me know ASAP.",
        rewrites: {
          direct:
            "I saw the real-time sync engine work you led and wanted to reach out directly. We're hiring a Staff Engineer to own our local-first client architecture ($210k–$245k + equity). Would you be open to a 15-minute chat next week, or would you prefer I send the technical brief over email first?",
          warm:
            "Hi — I really admired your work on state synchronization and thought of you for a founding systems role we just opened. Even if you aren't actively looking, I'd love to share what we're building over a quick 15-minute call, or simply send the one-pager if you're curious.",
          concise:
            "Loved your work on real-time sync. We're hiring a Staff Engineer to lead our client architecture — open to a 15-minute chat next week, or want me to send the technical brief first?",
        },
        notes: [
          "Cut “impressive profile” and “amazing opportunity” — phrases every automated sequence uses.",
          "Lowered the ask from “30 minutes ASAP” to a 15-minute chat or an async brief.",
        ],
      },
      {
        label: "Candidate rejection",
        context: "Turning down a finalist after onsite interviews with dignity",
        text: "Unfortunately we have decided to move forward with another candidate who was a better fit. Good luck with your search.",
        rewrites: {
          direct:
            "Thank you for spending the afternoon with our team on Tuesday — everyone enjoyed diving into your product architecture walkthrough. We decided to move forward with a candidate who has direct healthcare compliance experience for this specific opening, so we won't be extending an offer. With your permission, I'd like to stay in touch as our core platform team expands in Q3.",
          warm:
            "I wanted to write you personally after Tuesday's interviews. The team loved your thoughtfulness in the design critique, and this was a genuinely close call. For this seat we chose someone who has already shipped in our exact regulatory space, which is a reflection of our immediate Q2 gap rather than your craft. Thank you for the energy you brought to us.",
          concise:
            "Thank you for Tuesday's interviews — the team really valued your walkthrough. We chose a candidate with direct compliance experience for this immediate seat, and we're grateful for the time you spent with us.",
        },
        notes: [
          "Replaced cold boilerplate with a specific detail from their interview and an honest, non-personal reason for the decision.",
        ],
      },
      {
        label: "Closing an offer",
        context: "Checking in on a pending offer without pressuring the candidate",
        text: "We need you to sign the offer letter by tomorrow at 5pm or we are pulling the offer.",
        rewrites: {
          direct:
            "The whole team is excited about the prospect of working with you. Our offer letter has Friday at 5pm as the sign-off date so we can lock in onboarding. What questions on compensation, scope, or team can I help answer before then so you feel 100% confident in your decision?",
          warm:
            "We'd love to have you on the team. Ahead of Friday's decision date on the offer, is there anyone else on the leadership team you'd like to speak with, or any detail on the package we can walk through together?",
          concise:
            "We're excited to have you join. Ahead of Friday's offer deadline, what questions on scope or comp can I answer to help you decide?",
        },
        notes: [
          "Kept the Friday deadline clear while shifting from threat (“pulling the offer”) to executive support.",
        ],
      },
    ],
    href: "/apps/hire",
  },
  {
    slug: "keep",
    number: "10",
    name: "Keep",
    eyebrow: "Customer Success",
    summary: "Re-engage a quiet account before renewal without guilt or nagging.",
    description:
      "When an account goes quiet 60 days before renewal, sending “Bumping this again!” only reminds them they aren’t replying. Keep anchors every check-in around a concrete result their team already got and asks a single 10-second question.",
    priceMonthly: 800,
    category: "work",
    kind: "coach",
    audience: "Customer success managers and account leads protecting net dollar retention.",
    includes: [
      "Leads with a concrete customer win or metric",
      "Replaces “bumping this” with useful context",
      "Single one-sentence question",
    ],
    principles: [
      "Remind them of value before asking for time.",
      "Ask a question they can answer from their phone in one line.",
      "Treat silence as a busy calendar, not a personal slight.",
    ],
    preview: {
      before: "Bumping this again — I still haven’t heard back and your renewal is coming up so I really need you to respond.",
      after: "Your team processed 1,400 tickets through the new routing workflow this quarter. Ahead of next month’s renewal, should we keep your seat count as-is or adjust for Q4?",
      shift: "Nagging 31 → Value 89",
    },
    samples: [
      {
        label: "Renewal guilt nudge",
        context: "Chasing a customer who hasn't replied to renewal emails",
        text: "Bumping this again — I still haven't heard back and your renewal is coming up so I really need you to respond.",
        rewrites: {
          direct:
            "Ahead of your renewal on the 1st, I pulled a quick snapshot of your account: your team cut average response time by 28% since enabling the routing rules in March. Would you like to keep your current 25-seat plan as-is for the new term, or adjust anything before it renews?",
          warm:
            "I know your calendar is packed, so I'll make this easy to answer in one line: with your renewal coming up next month, should we leave your current plan in place as-is, or would a 15-minute review of your Q3 usage be helpful?",
          concise:
            "With your renewal coming up next month, should we keep your current plan as-is, or do you want to adjust seat count before the 1st?",
        },
        notes: [
          "Eliminated “I really need you to respond,” which frames the renewal as your problem instead of their tool.",
          "Turned a vague meeting request into a 5-second yes/no question (“keep as-is or adjust?”).",
        ],
      },
      {
        label: "Usage drop-off",
        context: "Reaching out when weekly active usage drops by half",
        text: "I noticed your team stopped logging in over the last two weeks. Is something wrong?",
        rewrites: {
          direct:
            "I noticed your team's weekly exports dipped after the workflow update two weeks ago. Often that means a permission setting or template got in the way — did the team hit a snag I can fix for you, or are you simply between project cycles?",
          warm:
            "Checking in on your team — I saw activity quieted down a bit over the last two weeks and wanted to make sure nothing broke after the recent update. If anyone hit friction, point me their way and I'll get them sorted out.",
          concise:
            "Saw team activity quieted down over the last two weeks — did anyone hit a snag I can clear up, or are you just between project sprints?",
        },
        notes: [
          "Replaced the surveillance-sounding “I noticed your team stopped logging in” with a helpful operational hypothesis.",
        ],
      },
      {
        label: "Price increase note",
        context: "Communicating a 10% renewal adjustment with fairness",
        text: "Just letting you know our prices went up 10% this year so your next invoice will be higher.",
        rewrites: {
          direct:
            "Ahead of your upcoming renewal, I wanted to give you an early heads-up that our standard tier is adjusting by 10% this year following the new analytics and SSO releases your team uses. If you'd like to lock in your current rate before the 30th, we can extend your existing pricing on a two-year renewal.",
          warm:
            "Because you've been with us since last year, I wanted to reach out early before your renewal date. While our standard rate is increasing by 10% this term, I can hold your current legacy rate if we confirm your renewal before Friday. Let me know if you'd like me to send that paperwork over.",
          concise:
            "Wanted to flag early that standard rates adjust by 10% at renewal — or we can lock in your current rate if we renew before the 30th. Want me to send that option?",
        },
        notes: [
          "Paired the price adjustment with the value shipped and gave the customer an actionable way to keep their existing rate.",
        ],
      },
    ],
    href: "/apps/keep",
  },
  {
    slug: "steady",
    number: "11",
    name: "Steady",
    eyebrow: "Co-Parenting & Family",
    summary: "BIFF-standard, child-centered wording for high-conflict logistics.",
    description:
      "In high-conflict co-parenting or family threads, every emotional hook invites a ten-message spiral. Steady applies the Brief, Informative, Friendly, and Firm (BIFF) method — stripping history, blame, and threats down to calm, court-safe logistics.",
    priceMonthly: 800,
    category: "home",
    kind: "coach",
    audience: "Parents and family members coordinating schedules in high-friction seasons.",
    includes: [
      "BIFF-calibrated (Brief, Informative, Friendly, Firm)",
      "Strips character attacks & historical grievances",
      "Leaves only dates, times, and the child’s need",
    ],
    principles: [
      "Write every message as if a judge or your child could read it.",
      "Facts, time, place, and the child’s need — nothing else.",
      "Never take the bait on side accusations; answer only the schedule question.",
    ],
    preview: {
      before: "You never bring her backpack and I’m sick of cleaning up your mess. Drop her at 5 or don’t bother.",
      after: "Please include Maya’s school backpack and math folder at the 5:00pm drop-off today so she has her homework for tomorrow. Thank you.",
      shift: "Escalating 12 → Steady 95",
    },
    samples: [
      {
        label: "Missing backpack",
        context: "Asking for school items at handoff without starting a fight",
        text: "You never bring her backpack and I'm sick of cleaning up your mess. Drop her at 5 or don't bother.",
        rewrites: {
          direct:
            "Please bring Maya's school backpack and math folder at the 5:00pm drop-off today so she has her homework ready for tomorrow morning. I will be out front at 5:00.",
          warm:
            "Hi — reminder to please pack Maya's school backpack for the 5:00pm handoff today so she has her math folder for school tomorrow. Thanks, see you at 5:00.",
          concise:
            "Please include Maya's school backpack at the 5:00pm pickup today so she has her homework for tomorrow. Thank you.",
        },
        notes: [
          "Removed “You never” and “sick of cleaning up your mess,” which guarantee a defensive counter-attack.",
          "Named the exact item (backpack + math folder), the child's need (homework for tomorrow), and the time (5:00pm).",
        ],
      },
      {
        label: "Schedule swap bait",
        context: "Responding to a hostile message that contains a schedule question",
        text: "Since you only care about your own schedule and ruined our summer plans, I'm taking the kids next weekend instead. Deal with it.",
        rewrites: {
          direct:
            "Per our parenting calendar, next weekend (the 24th–26th) is my scheduled weekend with the kids, and we already have tickets booked. If you'd like to swap a weekend in November instead, let me know which dates you're looking at by Wednesday.",
          warm:
            "I'm keeping our scheduled weekend of the 24th–26th as planned since we have family commitments set for Saturday. Happy to look at a weekend swap in November if you need coverage then — let me know which dates work.",
          concise:
            "I'll be keeping my scheduled weekend of the 24th–26th as planned. If you'd like to propose a swap for a weekend in November, let me know by Wednesday.",
        },
        notes: [
          "Ignored the emotional bait completely and anchored strictly on the written calendar and concrete dates.",
        ],
      },
      {
        label: "Medical update",
        context: "Sharing doctor visit details neutrally",
        text: "Took Leo to urgent care because he had a fever again after staying at your house. You clearly aren't making him rest.",
        rewrites: {
          direct:
            "Update on Leo: I took him to pediatric urgent care this afternoon for a 101.4° fever. The doctor diagnosed a mild ear infection and prescribed amoxicillin (5ml twice daily at 8am and 8pm for 7 days). I'll send the bottle and dosing sheet in his bag on Friday.",
          warm:
            "Wanted to keep you in the loop on Leo — he had a 101.4° fever today, so we stopped by urgent care. It's a mild ear infection and he's already feeling better after his first dose of amoxicillin. I'll pack the medicine with his 8am/8pm schedule for Friday's handoff.",
          concise:
            "Health update for Leo: urgent care diagnosed a mild ear infection today. He's on amoxicillin 5ml at 8am/8pm for 7 days — I'll include the bottle at Friday's handoff.",
        },
        notes: [
          "Stripped the accusation (“after staying at your house”) and provided clean medical facts, dosage, and handoff logistics.",
        ],
      },
    ],
    href: "/apps/steady",
  },
  {
    slug: "bench",
    number: "12",
    name: "Bench",
    eyebrow: "Team Calibration",
    summary: "A shared workshop where teams tune high-stakes outbound messages together.",
    description:
      "Bench is a volunteer-only calibration board for customer-facing and leadership teams. People paste tough outbound drafts — pricing pushbacks, incident replies, sensitive feedback — see the collective climate, and sharpen them in one click.",
    priceMonthly: 1900,
    category: "team",
    kind: "bench",
    audience: "Sales, support, and leadership teams who care about how their company sounds in writing.",
    includes: [
      "Volunteer-only outbound workshop",
      "Live team tone & clarity index",
      "One-click Attune rewrite on every board card",
    ],
    principles: [
      "People paste their own outbound drafts — zero surveillance.",
      "The board is a craft workshop, not a compliance police feed.",
      "Celebrate clear, high-respect writing out loud.",
    ],
    preview: {
      before: "Chris (Support): This is the third email. You never respond and I am done being polite.",
      after: "Chris (Calibrated): I want to get this resolved for your team before Friday’s cutover — should we hold your slot or pause?",
      shift: "Team Index 64 → 88",
    },
    samples: [],
    href: "/apps/bench",
  },
];

export const bundles: Bundle[] = [
  {
    slug: "personal",
    name: "Personal Suite",
    eyebrow: "5 Instruments · Relationships & Daily Clarity",
    summary: "Your private tone inbox plus the four personal coaching studios for texts, threads, apologies, and concise notes.",
    priceMonthly: 1800,
    productSlugs: ["mirror", "pause", "thread", "repair", "brief"],
  },
  {
    slug: "home",
    name: "Home & Family Suite",
    eyebrow: "4 Instruments · Calm Logistics & Repair",
    summary: "BIFF-standard co-parenting and family logistics paired with Mirror, Pause, and Repair.",
    priceMonthly: 1600,
    productSlugs: ["steady", "mirror", "pause", "repair"],
  },
  {
    slug: "practice",
    name: "Practice Suite",
    eyebrow: "5 Instruments · Executive & Customer Craft",
    summary: "Every professional studio in one pass: sales follow-ups, support de-escalation, manager feedback, recruiting, and renewals.",
    priceMonthly: 2900,
    productSlugs: ["deal", "desk", "lead", "hire", "keep"],
    highlight: true,
  },
  {
    slug: "house",
    name: "The House Pass",
    eyebrow: "All 12 Instruments · Complete Atelier Access",
    summary: "Every app in the Attune store — personal, home, executive, and the shared team calibration board — under one subscription.",
    priceMonthly: 5400,
    productSlugs: products.map((p) => p.slug),
  },
];

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function bundleList(bundle: Bundle): Product[] {
  return bundle.productSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
}

export function bundleSavings(bundle: Bundle): number {
  const sum = bundleList(bundle).reduce((n, p) => n + p.priceMonthly, 0);
  return Math.max(0, sum - bundle.priceMonthly);
}

export function allSlugs(): string[] {
  return products.map((p) => p.slug);
}
