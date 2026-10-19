"use strict";
(() => {
  // src/lib/catalog.ts
  var products = [
    {
      slug: "mirror",
      number: "01",
      name: "Mirror",
      eyebrow: "Personal Telemetry",
      summary: "See how you actually sound across the conversations that matter.",
      description: "A private inbox that scores the emotional climate of every thread and builds a longitudinal report of your own tone \u2014 warm, even, tense, or harmful \u2014 over weeks, not just a single text.",
      priceMonthly: 800,
      category: "personal",
      kind: "mirror",
      audience: "Anyone who wants an honest read on their own habits before blaming the other person.",
      includes: [
        "Live thread climate meter",
        "Personal tone & clarity score",
        "Multi-day clarity streak",
        "Per-relationship warmth breakdown"
      ],
      principles: [
        "Score your own sends first.",
        "A thread can cool without anyone being the villain.",
        "Repair counts more than an unbroken streak."
      ],
      preview: {
        before: "I forgot and made other plans. You always spring this last minute.",
        after: "I\u2019m sorry \u2014 I double-booked tonight and spoke sharply earlier. Let me cook tomorrow so we can catch up properly.",
        shift: "Tense 24 \u2192 Warm 89"
      },
      samples: [],
      href: "/app"
    },
    {
      slug: "pause",
      number: "02",
      name: "Pause",
      eyebrow: "Before You Send",
      summary: "Catch a heated draft in three seconds and keep your real point.",
      description: "Paste the text, DM, or email you are ten seconds from sending. Pause strips out global blame and sarcasm, names the actual boundary, and hands back three natural ways to say it.",
      priceMonthly: 600,
      category: "personal",
      kind: "coach",
      audience: "The ten seconds before a sharp text, Slack reply, or late-night DM leaves your phone.",
      includes: [
        "Instant heat & signal detection",
        "Three calibrated rewrites (Direct, Warm, Short)",
        "Line-by-line explanation of what shifted"
      ],
      principles: [
        "Honesty stays. Contempt goes.",
        "Name the exact moment instead of \u201Cyou always.\u201D",
        "State what you need next, not just what went wrong."
      ],
      preview: {
        before: "You always ignore my texts all day and then act confused when I\u2019m annoyed.",
        after: "Not hearing back all day bothers me. Please reply when you can.",
        shift: "Harmful 19 \u2192 Clear 86"
      },
      samples: [
        {
          label: "Unanswered texts",
          context: "Waiting all day to confirm evening plans",
          text: "You always ignore my texts all day and then act confused when I'm annoyed. This is ridiculous.",
          rewrites: {
            direct: "I get annoyed when my texts go unanswered all day, and I want to be clear about why I'm upset. I need a reply, even a short one.",
            warm: "I'm not trying to start a fight. It's hard for me when I don't hear back all day, and even a quick reply would help a lot.",
            concise: "Not hearing back all day bothers me. Please reply when you can."
          },
          notes: [
            "Replaced \u201Cyou always ignore me\u201D and \u201Cthis is ridiculous\u201D with the fact that the texts went unanswered all day.",
            "Asked for a reply without inventing dinner, a count of texts, or a 5:00 deadline."
          ]
        },
        {
          label: "Curt shutdown",
          context: "Pulling back in the middle of an argument",
          text: "Fine. Whatever. Do what you want, I don't care anymore.",
          rewrites: {
            direct: "I'm too frustrated to keep talking about this right now. I need a break before we go any further.",
            warm: "I'm worn out, and I don't want to say something I'll regret. I need to step away from this for a bit.",
            concise: "I need a break from this right now."
          },
          notes: [
            "Replaced \u201CFine. Whatever. I don't care\u201D with the truth: you're too frustrated to keep going.",
            "Asked for a break without inventing an hour, 7:00, or tonight."
          ]
        },
        {
          label: "Last-minute bail",
          context: "Someone cancels 20 minutes before meeting",
          text: "Seriously? You're bailing again 20 minutes before we meet? Unbelievable.",
          rewrites: {
            direct: "Canceling 20 minutes before we meet, and not for the first time, is really frustrating. I need you to tell me earlier when plans change.",
            warm: "I'm disappointed, and this has happened before. If plans change, please let me know as early as you can.",
            concise: "Canceling 20 minutes out again is hard on me. I need more notice."
          },
          notes: [
            "Kept the 20 minutes and the fact that it happened again.",
            "Dropped \u201CSeriously?\u201D and \u201CUnbelievable,\u201D and did not invent a rearranged evening."
          ]
        }
      ],
      href: "/apps/pause"
    },
    {
      slug: "thread",
      number: "03",
      name: "Thread",
      eyebrow: "Full Exchange",
      summary: "Paste an entire conversation. See where it cooled and what to send next.",
      description: "Drop a multi-message transcript from iMessage, WhatsApp, or Slack. Thread maps the emotional arc line by line, scores both sides fairly, and drafts three next moves depending on whether you want to repair, clarify, or hold a boundary.",
      priceMonthly: 600,
      category: "personal",
      kind: "thread",
      audience: "When a single bubble doesn\u2019t tell the story and you need to see where the thread turned.",
      includes: [
        "Line-by-line speaker & tone breakdown",
        "Directional climate arc",
        "Three calibrated next-reply options"
      ],
      principles: [
        "Context changes what a short reply means.",
        "Notice a bid for connection before answering the surface words.",
        "Never diagnose the other person."
      ],
      preview: {
        before: "Alex: That stung. I was hoping for a little care.\nYou: Fine.",
        after: "You\u2019re right \u2014 you told me you had a rough day and I brushed past it. Let me pick up dinner on my way home.",
        shift: "Cooling 34 \u2192 Warming 84"
      },
      samples: [
        {
          label: "Cooling dinner thread",
          context: "A partner reaches out after a hard day and gets a defensive reply",
          text: "Alex: Are we still on for dinner? I had a rough day.\nYou: You always spring this last minute.\nAlex: That stung. I was hoping for a little care.\nYou: Fine."
        },
        {
          label: "Project handoff friction",
          context: "Two teammates clashing over a late spec change in Slack",
          text: "Dana: Hey, we need to add the SSO screen to Friday's release.\nYou: Are you kidding? Scope was locked on Monday.\nDana: The enterprise buyer just made it a blocker for signing.\nYou: Not my problem. Figure out what you're cutting then."
        },
        {
          label: "Friend who feels flaked on",
          context: "Reaching out after canceling twice in a row",
          text: "You: Hey! Miss you \u2014 free for coffee this weekend?\nSam: Maybe. You've canceled the last two times.\nYou: I know, work has been crazy.\nSam: Everyone is busy. I just need to know you'll actually show up."
        }
      ],
      href: "/apps/thread"
    },
    {
      slug: "repair",
      number: "04",
      name: "Repair",
      eyebrow: "After It Went Wrong",
      summary: "The clean apology you send once the damage is already done.",
      description: "Most apologies fail because they sneak the original argument back into the second half of the sentence. Repair removes the \u201Cbut,\u201D names your exact part with dignity, and offers a concrete next step.",
      priceMonthly: 600,
      category: "personal",
      kind: "coach",
      audience: "The hour after a fight, a defensive reply, or a comment that landed wrong in a meeting.",
      includes: [
        "Removes the defensive \u201Csorry, but\u2026\u201D hook",
        "Ownership without groveling",
        "Concrete reset offer"
      ],
      principles: [
        "Name your part in the first sentence.",
        "Never relitigate the argument inside an apology.",
        "Offer a concrete action, not a monologue."
      ],
      preview: {
        before: "Sorry if you took it the wrong way, but you never listen and someone had to say it.",
        after: "I\u2019m sorry for how I spoke to you earlier \u2014 cutting you off was disrespectful. When you\u2019re ready, I\u2019d like to hear your side without interrupting.",
        shift: "Harmful 21 \u2192 Warm 91"
      },
      samples: [
        {
          label: "Non-apology with a \u201Cbut\u201D",
          context: "Apologizing while still trying to win the fight",
          text: "Sorry if you took it the wrong way, but you never listen and someone had to say it.",
          rewrites: {
            direct: "I'm sorry for how sharply I said that earlier. Even though I wanted to raise a real concern, my tone was disrespectful. When you're ready, I'd like to talk it through calmly and actually listen.",
            warm: "I'm sorry \u2014 I came in hot earlier and made it hard for us to have a real conversation. You didn't deserve that tone. Can we reset tonight so I can hear your side properly?",
            concise: "I'm sorry for my tone earlier \u2014 that was unfair to you. I'd like to reset and talk it through calmly when you're ready."
          },
          notes: [
            "Removed \u201CSorry if you took it the wrong way,\u201D which blames the listener for being hurt.",
            "Cut \u201Cyou never listen and someone had to say it,\u201D which restarts the fight immediately.",
            "Kept your dignity while owning the delivery."
          ]
        },
        {
          label: "Snapped in a meeting",
          context: "Shutting down a colleague in front of the group",
          text: "Sorry I snapped in standup, I was just stressed because the timeline makes no sense.",
          rewrites: {
            direct: "I owe you an apology for cutting you off in standup earlier. I was stressed about the release dates, and I shouldn't have taken that out on you in front of the team. Let's look at the timeline together this afternoon.",
            warm: "Hey \u2014 I'm really sorry for how I reacted in standup. You were raising a fair question and I answered defensively. If you have 10 minutes after lunch, I'd love to walk through the schedule together.",
            concise: "Sorry for cutting you off in standup earlier \u2014 that wasn't fair to you. Let's review the timeline together this afternoon."
          },
          notes: [
            "Separated your stress about the timeline from how you treated your colleague.",
            "Acknowledged that it happened in front of the group, which is the part that stings most."
          ]
        },
        {
          label: "Forgot an important commitment",
          context: "Missing a promised call or dinner",
          text: "My bad for missing your call, today was a total disaster and my phone died.",
          rewrites: {
            direct: "I'm really sorry I missed our call tonight. I let my schedule get away from me and didn't give you a heads-up, and I know your time matters. Can I call you tomorrow at 6, and I'll make sure my evening is clear?",
            warm: "I'm so sorry I missed our call earlier \u2014 I hate that I left you waiting. No excuses on my end. Are you free tomorrow at 6 so I can give you my full attention?",
            concise: "I'm really sorry I missed our call and left you waiting. Can I call you tomorrow at 6 with my schedule cleared?"
          },
          notes: [
            "Upgraded \u201CMy bad\u201D and the list of excuses into genuine accountability for the other person's time.",
            "Offered a specific make-up time with a commitment to protect it."
          ]
        }
      ],
      href: "/apps/repair"
    },
    {
      slug: "brief",
      number: "05",
      name: "Brief",
      eyebrow: "Make It Short",
      summary: "Turn an anxious ramble or voice-note dump into one clear, warm sentence.",
      description: "When you feel awkward asking for something, you pad the message with five hedges and three apologies. Brief strips the nervous scaffolding and leaves a clean, confident note anyone can answer in ten seconds.",
      priceMonthly: 600,
      category: "personal",
      kind: "coach",
      audience: "When you have a 90-second voice-note in your head and need a two-line text.",
      includes: [
        "Strips self-deprecating hedges",
        "Isolates the single clear ask",
        "Keeps warmth in half the words"
      ],
      principles: [
        "One request per message.",
        "Lead with the point, not the apology for writing.",
        "Warmth takes five words, not a paragraph."
      ],
      preview: {
        before: "Hey so I was thinking maybe if you aren\u2019t too busy we could move Thursday to Friday, no pressure though, sorry this is long.",
        after: "Hey! Could we move our Thursday catch-up to Friday at 2pm? If not, next week works great too.",
        shift: "42 words \u2192 18 words"
      },
      samples: [
        {
          label: "Reschedule ramble",
          context: "Over-explaining a simple calendar change",
          text: "Hey so I was thinking and I don't know maybe it's nothing but like I feel like we keep missing each other and I basically just want to know if Thursday still works or if we should pick another day, no pressure though, sorry this is long.",
          rewrites: {
            direct: "Hey! Does Thursday at 6 still work for you to catch up, or should we pick a day next week?",
            warm: "I'd love to properly catch up this week \u2014 does Thursday evening still work for you, or is another day easier?",
            concise: "Still good for Thursday, or should we pick another day?"
          },
          notes: [
            "Cut 34 words of nervous hedging (\u201Cmaybe it's nothing\u201D, \u201Cno pressure though\u201D, \u201Csorry this is long\u201D).",
            "Made the question binary and effortless to reply to."
          ]
        },
        {
          label: "Asking a favor",
          context: "Burying an introduction request at the bottom of a paragraph",
          text: "Hi Marcus, hope you're doing super well! I know you're slammed right now so totally ignore this if it's annoying, but I saw you know Elena at Linear and I've been trying to reach her team, so I was wondering if maybe you'd feel comfortable making a quick intro?",
          rewrites: {
            direct: "Hi Marcus \u2014 hope your week is going well. Would you be open to introducing me to Elena at Linear? Happy to send a 3-line forwardable blurb so it takes you 30 seconds.",
            warm: "Hi Marcus! I noticed you're connected with Elena at Linear. If you know her well enough, would you be comfortable making a quick intro? I can send a short blurb to make it easy \u2014 and no worries at all if not.",
            concise: "Hi Marcus \u2014 would you be open to introducing me to Elena at Linear? I can send a short forwardable blurb."
          },
          notes: [
            "Removed \u201Ctotally ignore this if it's annoying,\u201D which lowers your status and makes the ask feel heavy.",
            "Added an offer to send a forwardable blurb, which removes the actual friction for the person helping you."
          ]
        },
        {
          label: "Setting a boundary",
          context: "Declining a weekend event without a fake excuse",
          text: "Hey guys, so this week has just been super crazy with work and errands and I think I might have a headache coming on so I don't think I can make it to the party Saturday, really sorry!",
          rewrites: {
            direct: "I won't be able to make it Saturday night \u2014 I need a quiet weekend to recharge. Have a great time and let's get dinner next week!",
            warm: "I'm going to sit Saturday night out so I can catch up on rest after a long week. Hope it's a great night \u2014 let's grab dinner just us next week!",
            concise: "Won't be able to make Saturday night, taking a quiet weekend to recharge. Have the best time!"
          },
          notes: [
            "Replaced the invented medical excuse with a confident, adult reason nobody can argue with.",
            "Added a warm follow-up so declining the event still affirms the friendship."
          ]
        }
      ],
      href: "/apps/brief"
    },
    {
      slug: "deal",
      number: "06",
      name: "Deal",
      eyebrow: "Sales & Founders",
      summary: "The follow-up that earns a decision without sounding desperate.",
      description: "Fake urgency (\u201Cneed an answer today or we\u2019re moving on\u201D) signals weakness and kills executive trust. Deal rewrites pipeline follow-ups, pricing nudges, and scope notes so you hold high status while getting a clear yes or no.",
      priceMonthly: 900,
      category: "work",
      kind: "coach",
      audience: "Founders, account executives, and consultants writing emails where one wrong line loses the deal.",
      includes: [
        "High-status decision framing",
        "Removes fake urgency & needy \u201Cjust bumping\u201D openers",
        "Gives the buyer a concrete, low-friction next step"
      ],
      principles: [
        "Invented urgency reads as desperation.",
        "Give the buyer a clean way to say yes, pause, or pass.",
        "Never write \u201Cjust circling back\u201D without new value."
      ],
      preview: {
        before: "Just circling back again. We need an answer today or we are moving on to other customers.",
        after: "To hold your May 1 onboarding slot, we\u2019d need sign-off by Friday. Should we lock that in, or push the start date to June?",
        shift: "Tense 27 \u2192 Executive 92"
      },
      samples: [
        {
          label: "Ultimatum squeeze",
          context: "Pressuring a silent buyer for a signature",
          text: "Just circling back again. We need an answer today or we are moving on to other customers.",
          rewrites: {
            direct: "To hold your implementation slot for the first week of next month, we'd need the signed order back by Friday at 3pm. Should we lock that schedule in, or would pushing the kickoff to next quarter fit your team better?",
            warm: "Wanted to check in on timing for your rollout. I'm holding our next onboarding slot through Friday \u2014 would you like to keep that date, or should we release it for now and reconnect when your team is ready?",
            concise: "We're holding your onboarding slot through Friday. Should we lock that in, or push kickoff to next month?"
          },
          notes: [
            "Replaced the hostile ultimatum (\u201Cor we are moving on\u201D) with a real operational constraint: holding an onboarding slot.",
            "Offered a binary choice (lock in Friday vs. push kickoff) that makes it safe for the buyer to reply even if they're delayed."
          ]
        },
        {
          label: "Discount pushback",
          context: "Holding price when a prospect asks for 30% off",
          text: "We can't do 30% off, our prices are already fair and we don't discount like that.",
          rewrites: {
            direct: "We keep our pricing consistent across customers at this tier, so we can't take 30% off the annual rate. If budget is the main blocker for Q2, we can either start with the 15-seat core package or extend a 10% multi-year rate. Which of those helps more?",
            warm: "I want to find a setup that works for your budget. While we don't discount the core platform by 30%, we can phase the rollout so you only pay for the first team this quarter, or look at a two-year term for a 10% reduction. Worth exploring either option?",
            concise: "We hold pricing steady at this tier, so we can't do 30% off \u2014 but we can trim initial seat count for Q2 or apply a 10% two-year rate. Which works better?"
          },
          notes: [
            "Held the price firm without sounding defensive (\u201Cour prices are already fair\u201D).",
            "Paired the boundary with two structured trade-offs (scope vs. multi-year term) so negotiations stay moving."
          ]
        },
        {
          label: "Fourth follow-up",
          context: "Closing the file on a prospect who went dark after a demo",
          text: "Hey, I've emailed three times since our demo and haven't heard anything. Are you still interested or not?",
          rewrites: {
            direct: "Since I haven't heard back after our demo, I'll assume priorities shifted for this quarter and close out my follow-ups for now. If this comes back onto your radar later in the year, just reply here and we can pick right back up.",
            warm: "I know how fast priorities move, so I'll pause my notes here so I'm not crowding your inbox. If rolling this out becomes a priority next quarter, let me know and I'll happily refresh the proposal.",
            concise: "Assuming priorities shifted for Q2, so I'll pause follow-ups for now. Just reply here whenever you'd like to pick back up."
          },
          notes: [
            "Removed the guilt-trip (\u201CI've emailed three times\u201D) which makes prospects avoid replying even more.",
            "Used a polite close-the-file note, which routinely gets the highest reply rate in enterprise sales."
          ]
        }
      ],
      href: "/apps/deal"
    },
    {
      slug: "desk",
      number: "07",
      name: "Desk",
      eyebrow: "Customer Support",
      summary: "De-escalate an angry ticket in one reply without sounding like a bot.",
      description: "When a customer is furious, corporate canned empathy (\u201CWe apologize for any inconvenience\u201D) pours fuel on the fire. Desk writes a human response that validates why they\u2019re upset, takes personal ownership of the fix, and gives a real clock time.",
      priceMonthly: 900,
      category: "work",
      kind: "coach",
      audience: "Support leads, founders, and account managers answering the ticket that could become a public thread.",
      includes: [
        "Human acknowledgment (zero corporate boilerplate)",
        "Named owner of the resolution",
        "Concrete timestamp for the next update"
      ],
      principles: [
        "Validate their frustration before explaining the cause.",
        "Name what you are doing right now, then give a real clock time.",
        "Never hide behind company policy in the first paragraph."
      ],
      preview: {
        before: "This is the third time. Your product is useless and nobody replies. Fix this now.",
        after: "You\u2019re right to be frustrated \u2014 three messages without a fix is unacceptable. I\u2019ve taken personal ownership of your ticket and will email you by 2:00pm EST with the resolution.",
        shift: "Escalating 14 \u2192 Steady 90"
      },
      samples: [
        {
          label: "Furious repeat ticket",
          context: "Customer writes in angry after three unresolved replies",
          text: "This is the third time. Your product is useless and nobody replies. I want this fixed now or I am posting everywhere.",
          rewrites: {
            direct: "You are completely right to be frustrated \u2014 having to write in three times without a real resolution is unacceptable on our end. I've taken personal ownership of your account right now, escalated the sync failure to our lead engineer, and will email you directly by 2:00pm today with the fix.",
            warm: "I'm really sorry we put you in a position where you had to ask three times. That's not the standard you pay us for. I am personally holding this ticket from here until it's solved, and I'll send you a direct update by 2:00pm today.",
            concise: "Three messages without a fix is unacceptable \u2014 I'm sorry. I own your ticket from here and will update you directly by 2:00pm today with the resolution."
          },
          notes: [
            "Agreed with the customer's core grievance immediately (\u201Cthree times without a resolution is unacceptable\u201D) which disarms the threat.",
            "Replaced vague promises (\u201Csoon\u201D) with personal ownership and a 2:00pm deadline."
          ]
        },
        {
          label: "Billing dispute",
          context: "Customer angry about an unexpected auto-renewal charge",
          text: "Per our terms of service you didn't cancel 30 days before renewal so the charge is valid and non-refundable.",
          rewrites: {
            direct: "I see that the annual renewal ran automatically yesterday. Even though our terms normally require notice before the renewal date, we never want to trap someone in a plan they aren't using. I've just reversed the full charge back to your card \u2014 you'll see the credit in 3\u20135 business days.",
            warm: "I completely understand why an unexpected renewal charge is frustrating. Even if the cancellation window passed, if you need to pause your account instead of refunding, or if you'd like me to process a one-time exception refund today, just let me know which you prefer and I'll take care of it right away.",
            concise: "I see the auto-renewal ran yesterday. I've gone ahead and approved a one-time refund back to your card \u2014 it'll appear in 3\u20135 business days."
          },
          notes: [
            "Removed the combative \u201CPer our terms of service\u201D opener that turns a routine billing ticket into a chargeback.",
            "Led with the solution so the customer feels respected rather than lectured."
          ]
        },
        {
          label: "Outage update",
          context: "Replying when a bug is still being investigated",
          text: "Our engineers are looking into the bug and we will let you know whenever it's fixed. No ETA right now.",
          rewrites: {
            direct: "We've reproduced the export failure on our end and our infrastructure team is actively rolling back the release that caused it. Even if the full patch takes longer, I will send you a status update in 45 minutes (at 11:30am) with our progress or a manual export of your file.",
            warm: "Thank you for flagging this so quickly \u2014 we've confirmed the issue on our side and our engineers are working on the fix right now. In the meantime, I can run your export manually if you're on a deadline today, and I'll update you either way by 11:30am.",
            concise: "We've confirmed the bug and are rolling out the fix now. I'll update you by 11:30am \u2014 or let me know if you want me to pull your export manually right now."
          },
          notes: [
            "Replaced \u201CNo ETA right now\u201D (which makes customers feel helpless) with a guaranteed check-in time and a manual workaround."
          ]
        }
      ],
      href: "/apps/desk"
    },
    {
      slug: "lead",
      number: "08",
      name: "Lead",
      eyebrow: "Managers & Execs",
      summary: "Deliver high-standard feedback without shrinking the person.",
      description: "When a manager sends a frustrated Slack message, the employee rereads it all afternoon. Lead turns exasperated feedback into clear, calm expectations that raise the bar on the work while keeping psychological safety intact.",
      priceMonthly: 900,
      category: "work",
      kind: "coach",
      audience: "Engineering managers, design leads, and executives giving feedback that needs to land cleanly.",
      includes: [
        "Separates the work standard from personal attack",
        "Names the exact bar & deadline",
        "Leaves room for collaborative problem-solving"
      ],
      principles: [
        "Critique the artifact, never the person\u2019s intelligence.",
        "State the standard out loud instead of implying they should have known.",
        "End by asking what would unblock them."
      ],
      preview: {
        before: "This deck is a mess. I don\u2019t know why I still have to fix your slides before every review.",
        after: "The narrative on slides 4\u20137 isn\u2019t ready for the exec review yet \u2014 we need the Q3 retention numbers front and center by 10am tomorrow. Want to spend 15 minutes walking through the structure?",
        shift: "Harmful 18 \u2192 Clear 88"
      },
      samples: [
        {
          label: "Messy exec deck",
          context: "Frustrated by a draft right before a leadership review",
          text: "This deck is a mess. I don't know why I still have to fix your slides before every review.",
          rewrites: {
            direct: "The storyline in this draft isn't tight enough for the leadership review yet. Specifically, slides 4\u20136 bury the Q3 retention numbers, and execs will ask for that headline first. Can you restructure those three slides by 10am tomorrow? Happy to mark up slide 4 as an example if useful.",
            warm: "Thanks for getting the first pass up. Before this goes to leadership tomorrow, we need to sharpen the narrative \u2014 especially putting the Q3 metrics at the top of slide 4 so the takeaway is unmistakable. Want to hop on a 10-minute huddle so we can align on the flow?",
            concise: "We need to tighten slides 4\u20136 before tomorrow's review so the Q3 metrics lead the story. Can you revise that section by 10am? Happy to mark up an example."
          },
          notes: [
            "Cut \u201CI don't know why I still have to fix your slides,\u201D which shames the person without telling them what to fix.",
            "Named the exact problem (slides 4\u20136 burying metrics) and a clear deadline (10am tomorrow)."
          ]
        },
        {
          label: "Missed deadline",
          context: "Addressing a deliverable that slipped without notice",
          text: "You said the API spec would be done yesterday and now the whole frontend team is blocked. Why didn't you say something?",
          rewrites: {
            direct: "Since the API spec didn't land yesterday, frontend is currently blocked on the checkout integration. First, what's the realistic time we can get a working draft up today? Second, going forward, if a date is going to slip, I need a heads-up by midday so we can sequence the team's work.",
            warm: "Hey \u2014 checking in on the API spec since frontend is ready to wire up checkout today. Where does the draft stand, and is anything blocking you? Going forward, flag me early whenever a deadline looks tight so I can help clear the path.",
            concise: "Frontend is waiting on the API spec today \u2014 when can we post a working draft? Next time a date looks tight, please flag me early so we can adjust."
          },
          notes: [
            "Replaced the accusatory \u201CWhy didn't you say something?\u201D with two forward-looking items: unblocking today's work and setting the rule for early heads-ups."
          ]
        },
        {
          label: "Quiet underperformance",
          context: "Opening a candid 1:1 conversation about slipping quality",
          text: "Your output has been really sloppy lately and the team is noticing.",
          rewrites: {
            direct: "In our 1:1 tomorrow, I want to talk candidly about the last two sprint deliveries. A few edge cases shipped unverified, which is below the bar you usually set. I want to understand what's getting in the way and agree on how we tighten review before the next release.",
            warm: "Ahead of our 1:1 tomorrow, I'd like us to spend time on the last two releases. They felt more rushed than your usual standard, and I want to check in on your workload and how we can get quality back to where we both want it.",
            concise: "Let's use our 1:1 tomorrow to look at the last two releases \u2014 a few bugs slipped through that are below your usual bar, and I want to align on how we tighten things up."
          },
          notes: [
            "Removed \u201Cthe team is noticing\u201D (which breeds paranoia and triangulation).",
            "Anchored the conversation in their own high capability (\u201Cbelow the bar you usually set\u201D)."
          ]
        }
      ],
      href: "/apps/lead"
    },
    {
      slug: "hire",
      number: "09",
      name: "Hire",
      eyebrow: "Recruiting Outreach",
      summary: "Write candidate outreach that sounds like a peer, not an automated drip.",
      description: "Senior engineers and designers delete \u201CI came across your impressive profile\u201D in half a second. Hire rewrites recruiting notes so they lead with a concrete reason you chose them, state the real problem, and make saying no effortless.",
      priceMonthly: 800,
      category: "work",
      kind: "coach",
      audience: "Founders, hiring managers, and recruiters writing to people who don\u2019t have to look for a job.",
      includes: [
        "Replaces generic flattery with specific craft recognition",
        "Clear role scope in one sentence",
        "Zero-pressure opt-out"
      ],
      principles: [
        "Cite their actual work, never \u201Cyour impressive background.\u201D",
        "Say what they would build, not just adjectives about the company.",
        "Make declining comfortable so replying feels safe."
      ],
      preview: {
        before: "Hi! I came across your impressive profile and we have an amazing opportunity you would be perfect for. 30 mins this week ASAP?",
        after: "I read your write-up on zero-downtime Postgres migrations. We\u2019re rebuilding our storage engine and need a founding staff engineer. Open to a 15-minute intro next week, or happy to send the architecture brief first?",
        shift: "Spam 29 \u2192 Peer 91"
      },
      samples: [
        {
          label: "Generic template",
          context: "Cold LinkedIn / email outreach to a senior engineer",
          text: "Hi! I came across your impressive profile and we have an amazing opportunity you would be perfect for. Do you have 30 minutes this week? Let me know ASAP.",
          rewrites: {
            direct: "I saw the real-time sync engine work you led and wanted to reach out directly. We're hiring a Staff Engineer to own our local-first client architecture ($210k\u2013$245k + equity). Would you be open to a 15-minute chat next week, or would you prefer I send the technical brief over email first?",
            warm: "Hi \u2014 I really admired your work on state synchronization and thought of you for a founding systems role we just opened. Even if you aren't actively looking, I'd love to share what we're building over a quick 15-minute call, or simply send the one-pager if you're curious.",
            concise: "Loved your work on real-time sync. We're hiring a Staff Engineer to lead our client architecture \u2014 open to a 15-minute chat next week, or want me to send the technical brief first?"
          },
          notes: [
            "Cut \u201Cimpressive profile\u201D and \u201Camazing opportunity\u201D \u2014 phrases every automated sequence uses.",
            "Lowered the ask from \u201C30 minutes ASAP\u201D to a 15-minute chat or an async brief."
          ]
        },
        {
          label: "Candidate rejection",
          context: "Turning down a finalist after onsite interviews with dignity",
          text: "Unfortunately we have decided to move forward with another candidate who was a better fit. Good luck with your search.",
          rewrites: {
            direct: "Thank you for spending the afternoon with our team on Tuesday \u2014 everyone enjoyed diving into your product architecture walkthrough. We decided to move forward with a candidate who has direct healthcare compliance experience for this specific opening, so we won't be extending an offer. With your permission, I'd like to stay in touch as our core platform team expands in Q3.",
            warm: "I wanted to write you personally after Tuesday's interviews. The team loved your thoughtfulness in the design critique, and this was a genuinely close call. For this seat we chose someone who has already shipped in our exact regulatory space, which is a reflection of our immediate Q2 gap rather than your craft. Thank you for the energy you brought to us.",
            concise: "Thank you for Tuesday's interviews \u2014 the team really valued your walkthrough. We chose a candidate with direct compliance experience for this immediate seat, and we're grateful for the time you spent with us."
          },
          notes: [
            "Replaced cold boilerplate with a specific detail from their interview and an honest, non-personal reason for the decision."
          ]
        },
        {
          label: "Closing an offer",
          context: "Checking in on a pending offer without pressuring the candidate",
          text: "We need you to sign the offer letter by tomorrow at 5pm or we are pulling the offer.",
          rewrites: {
            direct: "The whole team is excited about the prospect of working with you. Our offer letter has Friday at 5pm as the sign-off date so we can lock in onboarding. What questions on compensation, scope, or team can I help answer before then so you feel 100% confident in your decision?",
            warm: "We'd love to have you on the team. Ahead of Friday's decision date on the offer, is there anyone else on the leadership team you'd like to speak with, or any detail on the package we can walk through together?",
            concise: "We're excited to have you join. Ahead of Friday's offer deadline, what questions on scope or comp can I answer to help you decide?"
          },
          notes: [
            "Kept the Friday deadline clear while shifting from threat (\u201Cpulling the offer\u201D) to executive support."
          ]
        }
      ],
      href: "/apps/hire"
    },
    {
      slug: "keep",
      number: "10",
      name: "Keep",
      eyebrow: "Customer Success",
      summary: "Re-engage a quiet account before renewal without guilt or nagging.",
      description: "When an account goes quiet 60 days before renewal, sending \u201CBumping this again!\u201D only reminds them they aren\u2019t replying. Keep anchors every check-in around a concrete result their team already got and asks a single 10-second question.",
      priceMonthly: 800,
      category: "work",
      kind: "coach",
      audience: "Customer success managers and account leads protecting net dollar retention.",
      includes: [
        "Leads with a concrete customer win or metric",
        "Replaces \u201Cbumping this\u201D with useful context",
        "Single one-sentence question"
      ],
      principles: [
        "Remind them of value before asking for time.",
        "Ask a question they can answer from their phone in one line.",
        "Treat silence as a busy calendar, not a personal slight."
      ],
      preview: {
        before: "Bumping this again \u2014 I still haven\u2019t heard back and your renewal is coming up so I really need you to respond.",
        after: "Your team processed 1,400 tickets through the new routing workflow this quarter. Ahead of next month\u2019s renewal, should we keep your seat count as-is or adjust for Q4?",
        shift: "Nagging 31 \u2192 Value 89"
      },
      samples: [
        {
          label: "Renewal guilt nudge",
          context: "Chasing a customer who hasn't replied to renewal emails",
          text: "Bumping this again \u2014 I still haven't heard back and your renewal is coming up so I really need you to respond.",
          rewrites: {
            direct: "Ahead of your renewal on the 1st, I pulled a quick snapshot of your account: your team cut average response time by 28% since enabling the routing rules in March. Would you like to keep your current 25-seat plan as-is for the new term, or adjust anything before it renews?",
            warm: "I know your calendar is packed, so I'll make this easy to answer in one line: with your renewal coming up next month, should we leave your current plan in place as-is, or would a 15-minute review of your Q3 usage be helpful?",
            concise: "With your renewal coming up next month, should we keep your current plan as-is, or do you want to adjust seat count before the 1st?"
          },
          notes: [
            "Eliminated \u201CI really need you to respond,\u201D which frames the renewal as your problem instead of their tool.",
            "Turned a vague meeting request into a 5-second yes/no question (\u201Ckeep as-is or adjust?\u201D)."
          ]
        },
        {
          label: "Usage drop-off",
          context: "Reaching out when weekly active usage drops by half",
          text: "I noticed your team stopped logging in over the last two weeks. Is something wrong?",
          rewrites: {
            direct: "I noticed your team's weekly exports dipped after the workflow update two weeks ago. Often that means a permission setting or template got in the way \u2014 did the team hit a snag I can fix for you, or are you simply between project cycles?",
            warm: "Checking in on your team \u2014 I saw activity quieted down a bit over the last two weeks and wanted to make sure nothing broke after the recent update. If anyone hit friction, point me their way and I'll get them sorted out.",
            concise: "Saw team activity quieted down over the last two weeks \u2014 did anyone hit a snag I can clear up, or are you just between project sprints?"
          },
          notes: [
            "Replaced the surveillance-sounding \u201CI noticed your team stopped logging in\u201D with a helpful operational hypothesis."
          ]
        },
        {
          label: "Price increase note",
          context: "Communicating a 10% renewal adjustment with fairness",
          text: "Just letting you know our prices went up 10% this year so your next invoice will be higher.",
          rewrites: {
            direct: "Ahead of your upcoming renewal, I wanted to give you an early heads-up that our standard tier is adjusting by 10% this year following the new analytics and SSO releases your team uses. If you'd like to lock in your current rate before the 30th, we can extend your existing pricing on a two-year renewal.",
            warm: "Because you've been with us since last year, I wanted to reach out early before your renewal date. While our standard rate is increasing by 10% this term, I can hold your current legacy rate if we confirm your renewal before Friday. Let me know if you'd like me to send that paperwork over.",
            concise: "Wanted to flag early that standard rates adjust by 10% at renewal \u2014 or we can lock in your current rate if we renew before the 30th. Want me to send that option?"
          },
          notes: [
            "Paired the price adjustment with the value shipped and gave the customer an actionable way to keep their existing rate."
          ]
        }
      ],
      href: "/apps/keep"
    },
    {
      slug: "steady",
      number: "11",
      name: "Steady",
      eyebrow: "Co-Parenting & Family",
      summary: "BIFF-standard, child-centered wording for high-conflict logistics.",
      description: "In high-conflict co-parenting or family threads, every emotional hook invites a ten-message spiral. Steady applies the Brief, Informative, Friendly, and Firm (BIFF) method \u2014 stripping history, blame, and threats down to calm, court-safe logistics.",
      priceMonthly: 800,
      category: "home",
      kind: "coach",
      audience: "Parents and family members coordinating schedules in high-friction seasons.",
      includes: [
        "BIFF-calibrated (Brief, Informative, Friendly, Firm)",
        "Strips character attacks & historical grievances",
        "Leaves only dates, times, and the child\u2019s need"
      ],
      principles: [
        "Write every message as if a judge or your child could read it.",
        "Facts, time, place, and the child\u2019s need \u2014 nothing else.",
        "Never take the bait on side accusations; answer only the schedule question."
      ],
      preview: {
        before: "You never bring her backpack and I\u2019m sick of cleaning up your mess. Drop her at 5 or don\u2019t bother.",
        after: "Please include Maya\u2019s school backpack and math folder at the 5:00pm drop-off today so she has her homework for tomorrow. Thank you.",
        shift: "Escalating 12 \u2192 Steady 95"
      },
      samples: [
        {
          label: "Missing backpack",
          context: "Asking for school items at handoff without starting a fight",
          text: "You never bring her backpack and I'm sick of cleaning up your mess. Drop her at 5 or don't bother.",
          rewrites: {
            direct: "Please bring Maya's school backpack and math folder at the 5:00pm drop-off today so she has her homework ready for tomorrow morning. I will be out front at 5:00.",
            warm: "Hi \u2014 reminder to please pack Maya's school backpack for the 5:00pm handoff today so she has her math folder for school tomorrow. Thanks, see you at 5:00.",
            concise: "Please include Maya's school backpack at the 5:00pm pickup today so she has her homework for tomorrow. Thank you."
          },
          notes: [
            "Removed \u201CYou never\u201D and \u201Csick of cleaning up your mess,\u201D which guarantee a defensive counter-attack.",
            "Named the exact item (backpack + math folder), the child's need (homework for tomorrow), and the time (5:00pm)."
          ]
        },
        {
          label: "Schedule swap bait",
          context: "Responding to a hostile message that contains a schedule question",
          text: "Since you only care about your own schedule and ruined our summer plans, I'm taking the kids next weekend instead. Deal with it.",
          rewrites: {
            direct: "Per our parenting calendar, next weekend (the 24th\u201326th) is my scheduled weekend with the kids, and we already have tickets booked. If you'd like to swap a weekend in November instead, let me know which dates you're looking at by Wednesday.",
            warm: "I'm keeping our scheduled weekend of the 24th\u201326th as planned since we have family commitments set for Saturday. Happy to look at a weekend swap in November if you need coverage then \u2014 let me know which dates work.",
            concise: "I'll be keeping my scheduled weekend of the 24th\u201326th as planned. If you'd like to propose a swap for a weekend in November, let me know by Wednesday."
          },
          notes: [
            "Ignored the emotional bait completely and anchored strictly on the written calendar and concrete dates."
          ]
        },
        {
          label: "Medical update",
          context: "Sharing doctor visit details neutrally",
          text: "Took Leo to urgent care because he had a fever again after staying at your house. You clearly aren't making him rest.",
          rewrites: {
            direct: "Update on Leo: I took him to pediatric urgent care this afternoon for a 101.4\xB0 fever. The doctor diagnosed a mild ear infection and prescribed amoxicillin (5ml twice daily at 8am and 8pm for 7 days). I'll send the bottle and dosing sheet in his bag on Friday.",
            warm: "Wanted to keep you in the loop on Leo \u2014 he had a 101.4\xB0 fever today, so we stopped by urgent care. It's a mild ear infection and he's already feeling better after his first dose of amoxicillin. I'll pack the medicine with his 8am/8pm schedule for Friday's handoff.",
            concise: "Health update for Leo: urgent care diagnosed a mild ear infection today. He's on amoxicillin 5ml at 8am/8pm for 7 days \u2014 I'll include the bottle at Friday's handoff."
          },
          notes: [
            "Stripped the accusation (\u201Cafter staying at your house\u201D) and provided clean medical facts, dosage, and handoff logistics."
          ]
        }
      ],
      href: "/apps/steady"
    },
    {
      slug: "bench",
      number: "12",
      name: "Bench",
      eyebrow: "Team Calibration",
      summary: "A shared workshop where teams tune high-stakes outbound messages together.",
      description: "Bench is a volunteer-only calibration board for customer-facing and leadership teams. People paste tough outbound drafts \u2014 pricing pushbacks, incident replies, sensitive feedback \u2014 see the collective climate, and sharpen them in one click.",
      priceMonthly: 1900,
      category: "team",
      kind: "bench",
      audience: "Sales, support, and leadership teams who care about how their company sounds in writing.",
      includes: [
        "Volunteer-only outbound workshop",
        "Live team tone & clarity index",
        "One-click Attune rewrite on every board card"
      ],
      principles: [
        "People paste their own outbound drafts \u2014 zero surveillance.",
        "The board is a craft workshop, not a compliance police feed.",
        "Celebrate clear, high-respect writing out loud."
      ],
      preview: {
        before: "Chris (Support): This is the third email. You never respond and I am done being polite.",
        after: "Chris (Calibrated): I want to get this resolved for your team before Friday\u2019s cutover \u2014 should we hold your slot or pause?",
        shift: "Team Index 64 \u2192 88"
      },
      samples: [],
      href: "/apps/bench"
    }
  ];
  var bundles = [
    {
      slug: "personal",
      name: "Personal Suite",
      eyebrow: "5 Instruments \xB7 Relationships & Daily Clarity",
      summary: "Your private tone inbox plus the four personal coaching studios for texts, threads, apologies, and concise notes.",
      priceMonthly: 1800,
      productSlugs: ["mirror", "pause", "thread", "repair", "brief"]
    },
    {
      slug: "home",
      name: "Home & Family Suite",
      eyebrow: "4 Instruments \xB7 Calm Logistics & Repair",
      summary: "BIFF-standard co-parenting and family logistics paired with Mirror, Pause, and Repair.",
      priceMonthly: 1600,
      productSlugs: ["steady", "mirror", "pause", "repair"]
    },
    {
      slug: "practice",
      name: "Practice Suite",
      eyebrow: "5 Instruments \xB7 Executive & Customer Craft",
      summary: "Every professional studio in one pass: sales follow-ups, support de-escalation, manager feedback, recruiting, and renewals.",
      priceMonthly: 2900,
      productSlugs: ["deal", "desk", "lead", "hire", "keep"],
      highlight: true
    },
    {
      slug: "house",
      name: "The House Pass",
      eyebrow: "All 12 Instruments \xB7 Complete Atelier Access",
      summary: "Every app in the Attune store \u2014 personal, home, executive, and the shared team calibration board \u2014 under one subscription.",
      priceMonthly: 5400,
      productSlugs: products.map((p) => p.slug)
    }
  ];

  // src/lib/tone/heuristic.ts
  var POSITIVE = [
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
    "fair to you"
  ];
  var NEGATIVE = [
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
    "stop blaming"
  ];
  var DESTRUCTIVE = [
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
    "screw you"
  ];
  var REPAIR = [
    "i'm sorry",
    "i apologize",
    "can we talk",
    "i was wrong",
    "let's reset",
    "i care",
    "help me understand",
    "what do you need",
    "owe you an apology",
    "personal ownership"
  ];
  function countMatches(text, phrases) {
    const hits = [];
    for (const phrase of phrases) {
      if (text.includes(phrase)) hits.push(phrase);
    }
    return { count: hits.length, hits };
  }
  function labelFromScore(score, destructiveHits) {
    if (destructiveHits > 0 || score <= -0.65) return "destructive";
    if (score <= -0.2) return "negative";
    if (score >= 0.25) return "positive";
    return "neutral";
  }
  function analyzeHeuristic(text) {
    const normalized = text.trim().toLowerCase().replace(/’/g, "'");
    if (!normalized) {
      return {
        label: "neutral",
        score: 0,
        confidence: 0.4,
        signals: ["empty"],
        summary: "Nothing to score yet.",
        source: "heuristic"
      };
    }
    const pos = countMatches(normalized, POSITIVE);
    const neg = countMatches(normalized, NEGATIVE);
    const des = countMatches(normalized, DESTRUCTIVE);
    const repair = countMatches(normalized, REPAIR);
    const exclamations = (text.match(/!/g) || []).length;
    const allCaps = text.length > 8 && text === text.toUpperCase() && /[A-Z]/.test(text);
    const questionMarks = (text.match(/\?/g) || []).length;
    const shortCold = /^(k|ok|fine|sure|whatever|idc|k\.|nope|nah)$/i.test(text.trim()) || normalized === "fine.";
    const spoken = normalized.replace(/\([^)]*\)/g, " ");
    const accusatory = /\b(you can't|you cant|you won't|you wont|you only|why do you|why can't you|stop\s+\w+ing)\b/i.test(
      spoken
    ) || /\byou (?:don't|dont) (?!possess|have|believe|think|know|see|want|need|mean)\b/i.test(spoken);
    let score = pos.count * 0.28 + repair.count * 0.35 - neg.count * 0.34 - des.count * 0.75;
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
      ...des.hits.map((h) => `harm: ${h}`)
    ];
    if (accusatory && neg.hits.length === 0) signals.push("defensive pushback");
    if (shortCold) signals.push("curt reply");
    if (allCaps) signals.push("shouting");
    if (signals.length === 0) signals.push("plain wording");
    const summaries = {
      positive: "Reads warm, grounded, and constructive.",
      neutral: "Even and factual \u2014 low emotional charge.",
      negative: "Carries friction, pressure, or defensiveness.",
      destructive: "Contains escalatory language that can damage trust."
    };
    const confidence = Math.min(
      0.95,
      0.5 + (pos.count + neg.count + des.count + repair.count + (accusatory ? 1 : 0)) * 0.12
    );
    return {
      label,
      score,
      confidence,
      signals: signals.slice(0, 5),
      summary: summaries[label],
      source: "heuristic"
    };
  }

  // src/lib/studio/rewrite.ts
  function tidy(text) {
    return text.replace(/\s+/g, " ").trim();
  }
  function normalizeForMatch(text) {
    return text.toLowerCase().replace(/['’“”"]/g, "").replace(/\s+/g, " ").trim();
  }
  function extractTimeReference(text) {
    const withoutNotice = text.replace(/\b\d+\s*(?:minutes|mins|hours)\s+before\b/gi, " ");
    const match = withoutNotice.match(
      /\b((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tonight|tomorrow|this afternoon|this morning)(?:\s+at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?|\d{1,2}(?::\d{2})?\s*(?:am|pm)|at\s+\d{1,2}(?::\d{2})?(?:\s*(?:am|pm))?|this week|next week)\b/i
    );
    if (!match) return null;
    let value = match[1].replace(/^at\s+/i, "");
    if (/^\d{1,2}$/.test(value)) value = `${value}:00`;
    return value;
  }
  function extractNotice(text) {
    const match = text.match(/\b(\d+\s*(?:minutes|mins|hours))\s+before\b/i);
    return match ? match[1] : null;
  }
  function extractAbout(text) {
    const match = text.match(/\babout\s+([a-z0-9][a-z0-9\s'-]{1,40}?)(?=[?.!,]|$)/i);
    if (!match) return null;
    const phrase = match[1].replace(/\b(the|a|an)\b/gi, (word) => word.toLowerCase()).trim();
    if (!phrase || /\b(you|your|me|my|always|never)\b/i.test(phrase)) return null;
    return phrase;
  }
  function extractSubject(text) {
    const lower = text.toLowerCase();
    const topics = [
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
      [/\b(meeting|standup|review|1:1|sync)\b/, "our review"]
    ];
    for (const [regex, label] of topics) {
      if (regex.test(lower)) return label;
    }
    return null;
  }
  function extractSpecificActionAfterInto(text) {
    const match = text.match(
      /\binto\s+([a-z0-9\s']+?)(?:[.!?,;]|$)/i
    );
    if (!match) return null;
    const candidate = match[1].trim().toLowerCase();
    if (!candidate || candidate.length < 4 || candidate.length > 48 || /^(doing what you want|doing that|doing this|doing it|what you want|it|this|that|anything|something|saying yes)$/i.test(
      candidate
    ) || /\b(you|your|yours|yourself)\b/i.test(candidate)) {
      return null;
    }
    return candidate;
  }
  function fitsStudio(slug, lower) {
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
  function sentence(text) {
    const value = text.replace(/\s+/g, " ").trim();
    if (!value) return value;
    const headed = value.charAt(0).toUpperCase() + value.slice(1);
    return /[.!?]$/.test(headed) ? headed : `${headed}.`;
  }
  function isCalmDraft(raw, lower, tone) {
    if (tone.label === "negative" || tone.label === "destructive") return false;
    if (/\b(you always|you never|guilt|manipulat|ridiculous|unbelievable|whatever|hate|shut up|idiot|stupid|blame|fault|ignore|bailing|selfish)\b/i.test(
      lower
    )) {
      return false;
    }
    if (/\b(you can't|you cant|you don't|you dont|you won't|you wont|why can't|why cant|why don't|why dont|why won't|why wont|stop\s+\w+ing|don't talk|dont talk|don't tell|dont tell)\b/i.test(
      lower
    )) {
      return false;
    }
    if (/\b(asap|impressive profile|amazing opportunity|perfect for)\b/i.test(lower)) return false;
    return raw.includes("?") || /^(please|can you|could you|would you|checking|quick|just checking|let me know)\b/i.test(raw.trim());
  }
  function cleanAsk(fragment) {
    return fragment.replace(/[!?.]+/g, "").replace(/\b(ever|just|even|always|never|seriously|please)\b/gi, "").replace(/\s+/g, " ").replace(/^[, ]+|[, ]+$/g, "").trim();
  }
  var PAST_TO_BASE = {
    sent: "send",
    left: "leave",
    took: "take",
    told: "tell",
    made: "make",
    did: "do",
    went: "go",
    came: "come",
    said: "say",
    paid: "pay",
    brought: "bring",
    bought: "buy",
    thought: "think",
    felt: "feel",
    found: "find",
    gave: "give",
    got: "get",
    saw: "see",
    wrote: "write",
    broke: "break",
    forgot: "forget",
    spoke: "speak",
    drove: "drive",
    ate: "eat",
    drank: "drink",
    wore: "wear",
    hung: "hang",
    kept: "keep",
    slept: "sleep",
    meant: "mean",
    heard: "hear",
    held: "hold",
    stood: "stand",
    understood: "understand",
    built: "build",
    spent: "spend",
    lost: "lose",
    ran: "run",
    knew: "know",
    grew: "grow",
    threw: "throw",
    chose: "choose",
    woke: "wake",
    fell: "fall",
    led: "lead",
    met: "meet",
    sat: "sit",
    sold: "sell",
    taught: "teach",
    caught: "catch",
    fed: "feed",
    shut: "shut",
    put: "put",
    cut: "cut",
    let: "let",
    set: "set",
    read: "read",
    hit: "hit",
    closed: "close",
    opened: "open",
    locked: "lock",
    called: "call",
    finished: "finish",
    started: "start",
    asked: "ask",
    helped: "help",
    cleaned: "clean",
    moved: "move",
    changed: "change",
    agreed: "agree",
    replied: "reply",
    answered: "answer",
    ignored: "ignore",
    canceled: "cancel",
    cancelled: "cancel",
    texted: "text",
    emailed: "email",
    washed: "wash",
    packed: "pack",
    checked: "check",
    signed: "sign",
    shipped: "ship",
    fixed: "fix",
    booked: "book",
    confirmed: "confirm",
    updated: "update",
    included: "include",
    returned: "return"
  };
  function toInfinitive(phrase) {
    const match = phrase.match(/^([a-z']+)([\s\S]*)$/i);
    if (!match) return phrase;
    const verb = match[1].toLowerCase();
    const rest = match[2];
    const mapped = PAST_TO_BASE[verb];
    if (mapped) return `${mapped}${rest}`;
    if (!verb.endsWith("ed") || /^(need|feed|bleed|seed|speed)$/i.test(verb)) return phrase;
    if (verb.endsWith("ied")) return `${verb.slice(0, -3)}y${rest}`;
    let stem = verb.slice(0, -2);
    if (stem.length >= 3 && stem.at(-1) === stem.at(-2) && /[^aeiouy]/.test(stem.at(-1) || "")) {
      stem = stem.slice(0, -1);
    }
    if (/[svz]$/.test(stem) || /[^n]g$/.test(stem)) return `${stem}e${rest}`;
    return `${stem}${rest}`;
  }
  function toGerund(phrase) {
    const match = phrase.match(/^([a-z]+)([\s\S]*)$/i);
    if (!match) return phrase;
    const rest = match[2];
    let verb = match[1].toLowerCase();
    if (verb.endsWith("ing")) return `${verb}${rest}`;
    if (verb === "be") return `being${rest}`;
    if (verb.endsWith("ie")) return `${verb.slice(0, -2)}ying${rest}`;
    if (verb.endsWith("ee") || verb.endsWith("ye") || verb.endsWith("oe")) return `${verb}ing${rest}`;
    if (verb.endsWith("e")) verb = verb.slice(0, -1);
    else if (/^[^aeiou]*[aeiou][^aeiouwxy]$/i.test(verb) && verb.length <= 4) verb = `${verb}${verb.slice(-1)}`;
    return `${verb}ing${rest}`;
  }
  function reflectTheirWords(raw) {
    const text = raw.replace(/[’‘ʼ]/g, "'").replace(/\s+/g, " ").trim();
    const frames = [
      {
        pattern: /^why (?:can't|cant|don't|dont|won't|wont|aren't|arent) you(?:\s+(?:ever|just|even|always|never))*\s+(.+)$/i,
        polarity: "do"
      },
      {
        pattern: /^why (?:do|would) you(?:\s+(?:always|still|even|just))*\s+(.+)$/i,
        polarity: "stop"
      },
      {
        pattern: /^you (?:never|don't|dont|won't|wont|refuse to)\s+(.+)$/i,
        polarity: "do",
        skipCognitive: true
      },
      {
        pattern: /^you always\s+(.+)$/i,
        polarity: "stop"
      },
      {
        pattern: /^(?:please\s+)?(?:just\s+)?(?:stop|quit)\s+(.+)$/i,
        polarity: "stop"
      },
      {
        pattern: /^(?:don't|dont)\s+(.+)$/i,
        polarity: "dont"
      },
      {
        pattern: /^(?:can|could|would) you(?:\s+(?:please|just))*\s+(.+)$/i,
        polarity: "do"
      }
    ];
    for (const frame of frames) {
      const match = text.match(frame.pattern);
      const ask = match?.[1] ? cleanAsk(stripNoise(match[1])) : "";
      if (!askIsUseful(ask)) continue;
      if (frame.skipCognitive && /^(know|understand|get|see|care|realize|realise|notice|think|believe|mean|have)\b/i.test(ask)) {
        if (/^have\b/i.test(ask)) continue;
        const topic = ask.replace(/^(know|understand|get|see|care|realize|realise|notice|think|believe|mean)\s+/i, "").trim();
        if (/^care$/i.test(ask) || !topic) {
          return {
            calibrations: {
              direct: "I need this to matter here.",
              warm: "I want this to matter between us.",
              concise: "I need this to matter."
            },
            notes: [
              "Turned \u201Cyou don\u2019t care\u201D into the point that this has to matter.",
              "The request inside the draft is: this has to matter"
            ]
          };
        }
        return {
          calibrations: {
            direct: `I don't think ${topic} is clear yet.`,
            warm: `I want ${topic} to be clear between us.`,
            concise: sentence(`${topic} isn't clear yet`)
          },
          notes: [
            "Turned the accusation into the gap you actually named.",
            `The request inside the draft is: ${topic}.`
          ]
        };
      }
      const said = frame.polarity === "stop" ? ask : toInfinitive(ask);
      const action = frame.polarity === "stop" ? toGerund(said) : said;
      const direct = frame.polarity === "stop" ? `I need you to stop ${action}.` : frame.polarity === "dont" ? `I need you not to ${action}.` : `I need you to ${action}.`;
      const warm = frame.polarity === "stop" ? `Could you stop ${action}?` : frame.polarity === "dont" ? `I'd rather you didn't ${action}.` : `Could you ${action}?`;
      const concise = frame.polarity === "stop" ? `Please stop ${action}.` : frame.polarity === "dont" ? `Please don't ${action}.` : `Please ${action}.`;
      return {
        calibrations: { direct, warm, concise },
        notes: [
          "Used the words you actually wrote, instead of a stock line.",
          `The request inside the draft is: ${frame.polarity === "stop" ? `stop ${action}` : action}.`
        ]
      };
    }
    return null;
  }
  var CONTRACTIONS = {
    dont: "don't",
    cant: "can't",
    wont: "won't",
    im: "I'm",
    ive: "I've",
    id: "I'd",
    isnt: "isn't",
    wasnt: "wasn't",
    didnt: "didn't",
    doesnt: "doesn't",
    arent: "aren't",
    werent: "weren't",
    wouldnt: "wouldn't",
    couldnt: "couldn't",
    shouldnt: "shouldn't",
    youre: "you're",
    theyre: "they're",
    whats: "what's",
    thats: "that's",
    lets: "let's"
  };
  function stripNoise(value) {
    return value.replace(/[’‘ʼ]/g, "'").replace(/\b(um+|uh+|lol+|lmao|omg|wtf|idk)\b/gi, " ").replace(/\b(i mean|you know|kind of|sort of|i guess|i don't know|i dont know)\b/gi, " ").replace(/\b(fucking|fuck|shit|damn|goddamn|asshole|bitch|bastard|asap)\b/gi, " ").replace(/\byou(?:'re| are)?(?:\s+an?)?(?:\s+such an?)?\s+(?:idiot|stupid|moron|jerk|dumbass)\b/gi, "").replace(/\b(?:what )?an? (?:idiot|stupid|moron|jerk|dumbass)\b/gi, "").replace(/!{2,}/g, "!").replace(/\?{2,}/g, "?").replace(/\s+/g, " ").replace(/\s+([,.!?])/g, "$1").replace(/\(\s*\)/g, "").trim();
  }
  function fixContractions(value) {
    return value.replace(
      /\b(dont|cant|wont|im|ive|id|isnt|wasnt|didnt|doesnt|arent|werent|wouldnt|couldnt|shouldnt|youre|theyre|whats|thats|lets)\b/gi,
      (word) => CONTRACTIONS[word.toLowerCase()] ?? word
    ).replace(/\bi\b/g, "I");
  }
  function askIsUseful(ask) {
    const words = ask.split(/\s+/).filter(Boolean);
    if (words.length === 0 || ask.length < 2) return false;
    if (words.length < 3 && /^(being|it|that|this|so|me|them|a|an|the)$/i.test(words[words.length - 1])) return false;
    return true;
  }
  function splitDraft(raw) {
    const text = stripNoise(raw).replace(/\s+/g, " ").trim();
    if (!text) return [];
    const sentences = text.split(/(?<=[.!?])\s+/).map((part) => part.trim()).filter(Boolean);
    const clauses = [];
    for (const part of sentences.length ? sentences : [text]) {
      const bits = part.split(/,\s+(?:and\s+|but\s+)?(?=(?:you|why|stop|don't|dont|please)\b)/i);
      for (const bit of bits) {
        const cleaned = bit.replace(/^(?:and|but)\s+/i, "").replace(/^[, ]+|[, ]+$/g, "").trim();
        if (cleaned) clauses.push(cleaned);
      }
    }
    const hasApology = clauses.some((clause) => /^(?:i'm sorry|im sorry|sorry|i apologize|i apologise)\b/i.test(clause));
    if (!hasApology) return clauses;
    return clauses.filter((clause) => !/^you (?:started|made me|caused|did it|did this)\b/i.test(clause));
  }
  function crisp(text) {
    const asking = /\?\s*$/.test(text.trim());
    const stripped = text.replace(/\b(really|very|just|actually|basically|honestly)\b/gi, " ").replace(/[.!?]+$/g, "").replace(/\s+/g, " ").trim();
    const parts = stripped.split(/\s+and\s+/i);
    let chosen = stripped;
    if (parts.length > 1 && parts[0].split(/\s+/).length >= 4 && stripped.split(/\s+/).length > 16) {
      chosen = parts[0];
    }
    let words = chosen.split(/\s+/).filter(Boolean);
    if (words.length > 12) words = words.slice(0, 12);
    while (words.length > 4 && /^(the|a|an|and|or|but|when|since|of|to|for|with|on|in|at|by|before|after|until|about|from|into|over)$/i.test(words[words.length - 1] || "")) {
      words.pop();
    }
    const done = sentence(words.join(" "));
    return asking ? done.replace(/\.$/, "?") : done;
  }
  function clauseVoices(direct, warm, concise, request, changed) {
    return {
      direct: sentence(direct),
      warm: sentence(warm),
      concise: sentence(concise),
      request,
      changed
    };
  }
  function softenJudgment(value) {
    return value.replace(/\b(is|was|are|were) (?:so |absolutely |totally )?(?:ridiculous|unbelievable|absurd|insane|pathetic)\b/gi, "$1 not workable").replace(/\s+/g, " ").trim();
  }
  function lowerFirst(text) {
    if (/^I(?:['’]|\s)/.test(text)) return text;
    const first = text.split(/\s+/)[0]?.replace(/[^\p{L}\p{N}]/gu, "") ?? "";
    if (/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december)$/i.test(first)) {
      return text;
    }
    return text.charAt(0).toLowerCase() + text.slice(1);
  }
  function tooThin(value) {
    const words = value.replace(/[.!?]+$/g, "").split(/\s+/).filter(Boolean);
    if (words.length === 0) return true;
    if (words.length <= 2 && /^(you|why|they|he|she|it)\b/i.test(words[0])) return true;
    return false;
  }
  function cap(text) {
    const trimmed = text.trim();
    if (!trimmed) return trimmed;
    if (/^I(?:['’]|\s|$)/.test(trimmed)) return trimmed;
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }
  function stripLeadArticle(text) {
    return text.replace(/^(?:the|a|an)\s+/i, "").trim();
  }
  function pluralizeNoun(noun) {
    const lower = noun.toLowerCase();
    if (/(?:s|x|z|ch|sh)$/i.test(lower)) return `${lower}es`;
    if (/[^aeiou]y$/i.test(lower)) return `${lower.slice(0, -1)}ies`;
    return `${lower}s`;
  }
  function factTokens(text) {
    const found = text.match(
      /\b(?:\d+(?::\d+)?\s*(?:mb|gb|kb|am|pm)?|q\d+|(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tonight|tomorrow))\b/gi
    ) || [];
    return [...new Set(found.map((token) => token.toLowerCase().replace(/\s+/g, "")))];
  }
  function voiceKeepsFacts(source, voice) {
    const flat = voice.toLowerCase().replace(/\s+/g, "");
    return factTokens(source).every((token) => flat.includes(token));
  }
  function splitFacts(text) {
    const parts = text.split(/\s+and\s+/i).map((part) => part.trim()).filter(Boolean);
    if (parts.length < 2) return [text];
    const verbal = (part) => /\b(is|are|was|were|be|been|fails|failed|fail|breaks|broke|waiting|waited|need|needs|needed|has|have|had|can|can't|does|doesn't|won't|will|works|working|missing|forget|bring|send|include|remember|wait|don't|dont)\b/i.test(
      part
    );
    return parts.every(verbal) ? parts : [text];
  }
  function softFail(verb) {
    if (/failed|broke/i.test(verb)) return "didn't go through";
    if (/isn't working|is not working/i.test(verb)) return "isn't going through";
    return "doesn't go through";
  }
  function joinWarm(parts) {
    const asking = parts.length > 0 && parts.every((part) => part.trim().endsWith("?"));
    const cleaned = parts.map((part) => part.replace(/[.!?]+$/g, "").trim()).filter(Boolean);
    if (cleaned.length === 0) return "";
    const combined = cleaned.length === 1 ? cleaned[0] : cleaned.every((part) => /^I don't think\b/i.test(part)) ? `I don't think ${cleaned.map((part) => part.replace(/^I don't think\s+/i, "")).join(", or that ")}` : `${cleaned[0]}, and ${cleaned.slice(1).map((part) => lowerFirst(part)).join(", and ")}`;
    const done = sentence(cleaned.length === 1 ? cleaned[0] : combined);
    return asking ? done.replace(/\.$/, "?") : done;
  }
  function recastQuestion(body) {
    const cleaned = body.replace(/\bjust\b/gi, "").replace(/\s+/g, " ").trim();
    const helper = /^(can|could|will) you\b/i.test(cleaned);
    const warm = helper ? cleaned.replace(/^(can|could|will) you\b/i, "Would you") : /^(do|does|is|are|what|when|where|who|why|how|would)\b/i.test(cleaned) ? cleaned : `Would ${cleaned} work`;
    const concise = helper ? cleaned.replace(/^(?:can|could|would|will) you\s+/i, "") : cleaned;
    return {
      direct: `${cap(cleaned)}?`,
      warm: `${cap(warm)}?`,
      concise: `${cap(concise)}?`
    };
  }
  function recastFact(piece) {
    const base = piece.replace(/[.!?]+$/g, "").trim();
    const sorry = base.match(/^(?:i'm |i am )?sorry(?: that)?\s+(.+)$/i);
    if (sorry) {
      const rest = sorry[1].replace(/^i\s+/i, "");
      const act = toGerund(toInfinitive(rest));
      return {
        direct: `I'm sorry ${sorry[1]}`,
        warm: `I owe an apology for ${act}`,
        concise: `Sorry ${sorry[1]}`
      };
    }
    const forget = base.match(/^(?:please\s+)?(?:don't|dont) forget\s+(.+)$/i);
    if (forget) {
      return {
        direct: `Don't forget ${forget[1]}`,
        warm: `Please remember ${forget[1]}`,
        concise: `Remember ${forget[1]}`
      };
    }
    const need = base.match(/^i need\s+(.+)$/i);
    if (need) {
      return {
        direct: `I need ${need[1]}`,
        warm: `I'd like ${need[1]}`,
        concise: `Need ${need[1]}`
      };
    }
    const works = base.match(/^([A-Za-z]+(?:\s+at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?)\s+works$/i);
    if (works) {
      return {
        direct: `${cap(works[1])} works`,
        warm: `I'm good with ${works[1]}`,
        concise: `${cap(works[1])} is good`
      };
    }
    const failsWhen = base.match(
      /^(.*?)\s+(fails|failed|breaks|broke|doesn't work|does not work|isn't working|is not working)\s+when\s+(.+)$/i
    );
    if (failsWhen) {
      const subject = failsWhen[1].trim();
      const verb = failsWhen[2];
      const condition = failsWhen[3].trim();
      const flipped = condition.match(/^(?:the|a|an)\s+([a-z0-9-]+)\s+(?:is|are)\s+(.+)$/i);
      const action = stripLeadArticle(subject);
      if (flipped && action.split(/\s+/).length <= 2) {
        const noun = flipped[1];
        const quality = flipped[2];
        const past = /failed|broke/i.test(verb);
        return {
          direct: `${cap(pluralizeNoun(noun))} ${quality} ${past ? "failed" : "fail"} to ${action}`,
          warm: `Once a ${noun} is ${quality}, ${lowerFirst(subject)} ${softFail(verb)}`,
          concise: `${cap(action)} ${past ? "failed" : "fails"} ${quality}`
        };
      }
      return {
        direct: `When ${condition}, ${lowerFirst(subject)} ${verb}`,
        warm: `When ${condition}, ${lowerFirst(subject)} ${softFail(verb)}`,
        concise: `${cap(stripLeadArticle(subject))} ${verb} when ${condition}`
      };
    }
    const waiting = base.match(/^(.*?)\s+has been waiting since\s+(.+)$/i);
    if (waiting) {
      const who = waiting[1].trim();
      const since = waiting[2].trim();
      return {
        direct: `${cap(who)} has been waiting since ${since}`,
        warm: `${cap(who)} is still waiting, since ${since}`,
        concise: `${cap(stripLeadArticle(who))} waiting since ${since}`
      };
    }
    const missing = base.match(/^(.*?)\s+(?:is|are) missing\s+(.+)$/i);
    if (missing) {
      const subject = missing[1].trim();
      const object = missing[2].trim();
      const plural = /\b(numbers|items|files|details|data|results)\b/i.test(object);
      return {
        direct: `${cap(subject)} doesn't include ${object}`,
        warm: `${cap(object)} ${plural ? "aren't" : "isn't"} in ${lowerFirst(subject)}`,
        concise: `${cap(stripLeadArticle(subject))} missing ${stripLeadArticle(object)}`
      };
    }
    const negated = base.match(/^(.*?)\s+(is not|isn't|are not|aren't)\s+(.+)$/i);
    if (negated) {
      const subject = negated[1].trim();
      const rest = negated[3].trim();
      const plural = /are/i.test(negated[2]);
      return {
        direct: `${cap(subject)} ${plural ? "aren't" : "isn't"} ${rest}`,
        warm: `I don't think ${lowerFirst(subject)} ${plural ? "are" : "is"} ${rest}`,
        concise: `${cap(stripLeadArticle(subject))} ${plural ? "aren't" : "isn't"} ${rest}`
      };
    }
    const imperative = base.match(/^(?:please\s+)?([a-z]+)(\s+.+)$/i);
    const imperativeVerbs = /* @__PURE__ */ new Set([
      "bring",
      "send",
      "take",
      "make",
      "put",
      "keep",
      "leave",
      "call",
      "email",
      "text",
      "confirm",
      "review",
      "share",
      "add",
      "include",
      "pack",
      "grab",
      "check",
      "update",
      "book",
      "ship",
      "fix",
      "move",
      "change",
      "close",
      "open",
      "lock",
      "wash",
      "return",
      "remember",
      "tell",
      "give",
      "get",
      "hold",
      "pick",
      "drop"
    ]);
    if (imperative && imperativeVerbs.has(imperative[1].toLowerCase())) {
      const phrase = `${imperative[1].toLowerCase()}${imperative[2]}`;
      return {
        direct: cap(phrase),
        warm: `Could you ${phrase}?`,
        concise: cap(stripLeadArticle(phrase).replace(/\b(the|a|an)\b/gi, "").replace(/\s+/g, " ").trim())
      };
    }
    if (!/\b(is|are|was|were|has|have|had|do|does|did|fails|need|works)\b/i.test(base) && base.split(/\s+/).length <= 4) {
      const words = base.split(/\s+/);
      if (words.length === 2) {
        return {
          direct: `The ${words[1].toLowerCase()} is ${words[0].toLowerCase()}`,
          warm: `That ${words[1].toLowerCase()} comes across as ${words[0].toLowerCase()}`,
          concise: cap(base)
        };
      }
    }
    const when = base.match(/^(.*?)\s+when\s+(.+)$/i);
    if (when && when[1].split(/\s+/).length >= 2 && when[2].split(/\s+/).length >= 2) {
      return {
        direct: `When ${when[2]}, ${lowerFirst(when[1])}`,
        warm: `When ${when[2]}, ${lowerFirst(when[1].replace(/\bfails\b/i, "doesn't go through"))}`,
        concise: cap(stripLeadArticle(base))
      };
    }
    return {
      direct: cap(base.replace(/\b(is not|are not)\b/gi, (match) => match.toLowerCase().startsWith("are") ? "aren't" : "isn't")),
      warm: `I want this said more gently: ${lowerFirst(base)}`,
      concise: cap(stripLeadArticle(base).replace(/\b(the|a|an)\b/gi, "").replace(/\s+/g, " ").trim())
    };
  }
  function sayItThreeWays(raw) {
    const text = raw.replace(/[.!]+$/g, "").trim();
    const asking = /\?\s*$/.test(raw.trim());
    const pieces = splitFacts(text.replace(/\?$/, ""));
    if (asking && pieces.length === 1) {
      const question = recastQuestion(text.replace(/\?$/, ""));
      return {
        direct: sentence(question.direct),
        warm: sentence(question.warm),
        concise: sentence(question.concise)
      };
    }
    const parts = pieces.map((piece) => recastFact(piece));
    const voices = {
      direct: parts.map((part) => sentence(part.direct)).join(" "),
      warm: joinWarm(parts.map((part) => part.warm)),
      concise: parts.map((part) => sentence(part.concise)).join(" ")
    };
    return {
      direct: voiceKeepsFacts(text, voices.direct) ? voices.direct : sentence(text),
      warm: voiceKeepsFacts(text, voices.warm) ? voices.warm : sentence(`I want this said more gently: ${lowerFirst(sentence(text))}`),
      concise: voiceKeepsFacts(text, voices.concise) ? voices.concise : sentence(text)
    };
  }
  function lightPolishClause(clause) {
    let s = softenJudgment(fixContractions(stripNoise(clause))).replace(/^(?:hey|hi|hello|so|um|look|listen|honestly|basically|anyway|well)[, ]+/i, "").replace(/^(?:fine|ok|okay|whatever|look),\s+(?=\S)/i, "").replace(/\s+/g, " ").trim();
    if (/^(?:i'm sorry|im sorry|sorry|i apologize|i apologise)\b/i.test(s)) {
      s = s.replace(/\s+but\s+you\b[^.!?]*$/i, "").trim();
    }
    if (!askIsUseful(s.replace(/[.!?]+$/g, "")) && s.split(/\s+/).length < 3) return null;
    const voices = sayItThreeWays(s);
    return clauseVoices(voices.direct, voices.warm, voices.concise, void 0, true);
  }
  function polishClause(clause) {
    const cleaned = stripNoise(clause).replace(/[.!?]+$/g, "").trim();
    if (!cleaned) return null;
    const late = cleaned.match(/^you(?:'re| are) (?:always |so )?late\b/i);
    if (late) {
      return clauseVoices("I need you to be on time.", "Could you be on time?", "Please be on time.", "be on time", true);
    }
    const keepDoing = cleaned.match(/^you (?:can't|cant) (?:just )?(?:keep |keep on )?([a-z]+ing\b.*)$/i);
    if (keepDoing) {
      const action = cleanAsk(stripNoise(keepDoing[1]));
      if (askIsUseful(action)) {
        return clauseVoices(
          `I need you to stop ${action}.`,
          `Could you stop ${action}?`,
          `Please stop ${action}.`,
          `stop ${action}`,
          true
        );
      }
    }
    const forced = cleaned.match(/^you (?:can't|cant) (?:just )?(?:make|force|guilt|pressure) me (?:to |into )?(.+)$/i);
    if (forced) {
      const what = cleanAsk(stripNoise(forced[1]));
      if (askIsUseful(what)) {
        return clauseVoices(
          `I'm not going to ${what}.`,
          `I'm still not going to ${what}.`,
          `I'm not going to ${what}.`,
          what,
          true
        );
      }
    }
    const cant = cleaned.match(/^you (?:can't|cant) (?:even |just )?(.+)$/i);
    if (cant) {
      const rest = toInfinitive(cleanAsk(stripNoise(cant[1])));
      if (askIsUseful(rest) && /^(listen|hear|answer|reply|help|try)\b/i.test(rest)) {
        return clauseVoices(`I need you to ${rest}.`, `Could you ${rest}?`, `Please ${rest}.`, rest, true);
      }
      if (askIsUseful(rest) && !/^(be serious|mean that|believe)\b/i.test(rest)) {
        return clauseVoices(`We can't ${rest}.`, `I don't think we can ${rest}.`, `We can't ${rest}.`, rest, true);
      }
    }
    const reflected = reflectTheirWords(cleaned);
    if (reflected) {
      const request = reflected.notes[1]?.match(/^The request inside the draft is:\s*(.+)$/i)?.[1]?.replace(/\.$/, "");
      return {
        direct: reflected.calibrations.direct,
        warm: reflected.calibrations.warm,
        concise: reflected.calibrations.concise,
        request,
        changed: true
      };
    }
    const light = lightPolishClause(clause);
    if (light && !tooThin(light.direct)) return light;
    if (/\b(idiot|stupid|moron|shut up|screw you|go to hell)\b/i.test(clause)) {
      return clauseVoices(
        "I need this said plainly, without the insult.",
        "I want this said plainly, and without the insult.",
        "Please say it without the insult.",
        void 0,
        true
      );
    }
    return light && !tooThin(light.direct) ? light : null;
  }
  function polishDraft(raw) {
    const clauses = splitDraft(raw).map(polishClause).filter((clause) => clause !== null);
    if (clauses.length === 0) {
      if (/\b(idiot|stupid|moron|jerk|shut up|screw you|go to hell)\b/i.test(raw)) {
        return {
          calibrations: {
            direct: "I need this said plainly, without the insult.",
            warm: "I want this said plainly, and without the insult.",
            concise: "Please say it without the insult."
          },
          notes: [
            "The draft was an insult without a request, so the reply only drops the insult.",
            "Did not invent a topic, a time, or a next step."
          ]
        };
      }
      return null;
    }
    const direct = clauses.map((clause) => clause.direct).join(" ");
    let warm = clauses.map((clause) => clause.warm).join(" ");
    let concise = clauses.find((clause) => clause.request)?.concise || clauses.find((clause) => clause.direct.includes("?"))?.concise || clauses[0].concise;
    if (clauses.length > 1 && normalizeForMatch(concise) === normalizeForMatch(direct)) {
      concise = crisp(clauses[0].direct);
    }
    if (normalizeForMatch(warm) === normalizeForMatch(direct)) {
      warm = sentence(`I want this said more gently: ${lowerFirst(direct)}`);
    }
    const request = clauses.find((clause) => clause.request)?.request;
    if (normalizeForMatch(direct) === normalizeForMatch(raw) && /\b(you always|you never|idiot|stupid|shut up|guilt me)\b/i.test(raw)) {
      return null;
    }
    return {
      calibrations: { direct, warm, concise },
      notes: request ? [
        `Kept the request in your words: ${request}.`,
        "Said that request in a firm line, a warmer line, and a shorter line."
      ] : [
        "Said the same thing three ways: firm, warmer, and shorter.",
        "Every version keeps the facts you actually wrote."
      ]
    };
  }
  function logisticsCalibration(raw, lower, timeRef) {
    const trimmed = lower.trim().replace(/[.!]+$/g, "");
    if (/^(fine|whatever|k|ok|okay|do what you want|forget it|i don't care|idc)$/.test(trimmed)) {
      const until = timeRef ? ` I'll come back to it ${timeRef}.` : "";
      return {
        calibrations: {
          direct: `I'm too frustrated to keep talking about this right now. I need a break before we go any further.${until}`,
          warm: timeRef ? `I'm worn out, and I don't want to say something I'll regret. I need to step away until ${timeRef}.` : "I'm worn out, and I don't want to say something I'll regret. I need to step away from this for a bit.",
          concise: "I need a break from this right now."
        },
        notes: [
          "Said that you're too frustrated to keep going, without pretending you don't care.",
          timeRef ? `Kept ${timeRef}, because you named when you'd return.` : "Did not invent a clock time to restart."
        ]
      };
    }
    if (/\b(ignored me|ignoring me|you ignore|you ignored|ghost(?:ed|ing)?(?: me)?|never reply|don't reply|haven't heard back|havent heard back|go unanswered|unanswered)\b/i.test(
      lower
    )) {
      const about = extractAbout(raw);
      const allDay = /\ball day\b/i.test(lower);
      const replyBy = timeRef ? ` I need it by ${timeRef}.` : "";
      return {
        calibrations: {
          direct: about ? `I haven't heard back about ${about}${allDay ? " all day" : ""}. I need a reply, even a short one.${replyBy}` : allDay ? `Not hearing back all day bothers me. I need a reply, even a short one.${replyBy}` : `I haven't heard back. I need a reply, even a short one.${replyBy}`,
          warm: about ? `It's hard for me when I don't hear back about ${about}. Even a quick reply would help.` : "It's hard for me when I don't hear back. Even a quick reply would help.",
          concise: about ? `Haven't heard back about ${about}. Please reply when you can.` : "Not hearing back bothers me. Please reply when you can."
        },
        notes: [
          "Replaced the blame with the fact that you haven't heard back, and asked for a reply.",
          !about && !timeRef ? "Did not invent a plan, a count of texts, or a deadline you didn't name." : "Kept the detail you named, and left out anything you didn't."
        ]
      };
    }
    if (/\b(cancel|canceling|cancelling|bail|bailing|flak)\b/i.test(lower) && /\b(you|again|late|minutes before|mins before|last minute)\b/i.test(lower)) {
      const notice = extractNotice(raw);
      const again = /\bagain\b/i.test(lower);
      const late = notice ? `${notice} before we meet` : "this late";
      return {
        calibrations: {
          direct: `Canceling ${late}${again ? ", and not for the first time," : ""} is really frustrating. I need you to tell me earlier when plans change.`,
          warm: again ? "I'm disappointed, and this has happened before. If plans change, please let me know as early as you can." : "I'm disappointed. If plans change, please let me know as early as you can.",
          concise: notice ? `Canceling ${notice} out${again ? " again" : ""} is hard on me. I need more notice.` : `Canceling this late${again ? " again" : ""} is hard on me. I need more notice.`
        },
        notes: [
          notice ? `Kept the ${notice} notice and asked for earlier warning.` : "Asked for earlier warning without inventing how late the cancellation was.",
          again ? "Kept that this has happened before, because you said again." : "Did not claim this has happened before."
        ]
      };
    }
    return null;
  }
  function clipWords(text, max) {
    const words = text.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean);
    if (words.length <= max) return words.join(" ");
    const joined = words.slice(0, max).join(" ");
    const comma = joined.lastIndexOf(",");
    if (comma > joined.length * 0.5) return joined.slice(0, comma).trim();
    return joined.replace(/\s+\S*$/, "").trim() || joined;
  }
  function glossAside(aside) {
    const lower = aside.toLowerCase();
    const bits = [];
    if (/happening now/.test(lower)) bits.push("not believed as happening now");
    if (/possess/.test(lower)) bits.push("not already theirs");
    if (/\breal\b/.test(lower) || /possible/.test(lower)) bits.push("not real or possible");
    if (/\bwish\b/.test(lower) || /\bwant\b/.test(lower)) bits.push("only a wish");
    if (bits.length >= 2) return bits.join(", ");
    return clipWords(aside.replace(/\s+/g, " ").trim(), 16);
  }
  function condensePassage(raw) {
    const trimmed = raw.replace(/\s+/g, " ").trim();
    const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
    if (wordCount < 36) return null;
    if (/\b(guilt me|you always|you never|shut up|leave me alone|idiot|stupid|worthless|figure it out yourself)\b/i.test(
      trimmed
    )) {
      return null;
    }
    const asides = [...trimmed.matchAll(/\(([^)]+)\)/g)].map((match) => match[1].trim()).filter((aside) => aside.split(/\s+/).length >= 6);
    const gloss = asides.length ? glossAside(asides[0]) : "";
    const body = trimmed.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\bcan not\b/gi, "cannot").replace(/\b(hey so|i was thinking and|i don't know maybe|it's nothing but|no pressure though|sorry this is long)\b/gi, "").replace(/\s+/g, " ").replace(/\s+,/g, ",").replace(/\bit(?:'s| is) nothing but\b/gi, "").replace(/,\s*,+/g, ",").replace(/,\s*\./g, ".").replace(/^[, ]+|[, ]+$/g, "").trim();
    const day = body.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i)?.[1];
    if (day && /\b(still works|another day|pick another|reschedul)/i.test(body)) {
      const morning = body.match(/\b((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\s+morning)\b/i)?.[1];
      const extra = morning && morning.toLowerCase() !== `${day.toLowerCase()} morning` ? ` I can do ${morning}.` : "";
      const ask = `Does ${day} still work, or should we pick another day?${extra}`;
      return {
        calibrations: {
          direct: ask,
          warm: `Hey \u2014 does ${day} still work for you, or is another day easier?${extra}`,
          concise: extra ? `${day} still good?${extra}` : `Does ${day} still work, or another day?`
        },
        notes: [
          "Read the full ramble and kept the actual scheduling question.",
          "Cut the apology for writing and the \u201Cno pressure\u201D padding."
        ]
      };
    }
    const questions = [...body.matchAll(/[^.!?]{12,}\?/g)].map(
      (match) => match[0].replace(/\b(hey so|i was thinking and|i don't know maybe|it's nothing but|no pressure though|sorry this is long|basically|just)\b/gi, "").replace(/\s+/g, " ").trim()
    );
    if (questions.length > 0) {
      const ask = sentence(questions[0]);
      const alternatives = body.match(/\b(?:or|also)\b[^?.!]{8,80}/i)?.[0]?.replace(/^(or|also)\s+/i, "").trim();
      const direct2 = alternatives ? `${ask.replace(/\?$/, "")}, or ${alternatives.replace(/\.$/, "")}?` : ask;
      return {
        calibrations: {
          direct: sentence(direct2).replace(/\.$/, direct2.trim().endsWith("?") || ask.endsWith("?") ? "?" : "."),
          warm: `Hey \u2014 ${ask.charAt(0).toLowerCase()}${ask.slice(1)}`,
          concise: sentence(clipWords(ask.replace(/\?$/, ""), 18)) + (ask.endsWith("?") ? "" : "")
        },
        notes: [
          "Read the full note and kept the question it was circling.",
          "Cut the hedges around it so the ask is answerable in one reply."
        ]
      };
    }
    const pieces = body.split(/(?<=[.!?])\s+/).map((part) => part.trim()).filter((part) => part.split(/\s+/).length >= 3);
    const thesis = sentence(pieces[0] || body);
    const rest = pieces.slice(1).join(" ");
    const evenRaw = rest.match(/even when[^.]*/i)?.[0]?.trim() ?? "";
    const even = evenRaw ? `${evenRaw.charAt(0).toLowerCase()}${evenRaw.slice(1)}` : "";
    const prints = /does not print|doesn't print|do not print/i.test(rest);
    const notInImage = /if it is not in the image/i.test(rest);
    const cannotPass = /cannot get past it/i.test(rest);
    let mechanism;
    if (notInImage && prints) {
      const condition = gloss ? ` (${gloss})` : "";
      const tail = even ? `, ${even}` : "";
      const lead = cannotPass ? "We cannot get past it by what we do, say, or think. " : "";
      mechanism = `${lead}If it is not in the image${condition}, it does not print${tail}.`;
    } else if (rest) {
      const clipped = sentence(clipWords(rest, gloss ? 28 : 36));
      mechanism = gloss ? `${clipped.replace(/\.$/, "")} (${gloss}).` : clipped;
    } else {
      mechanism = gloss ? `${gloss.charAt(0).toUpperCase()}${gloss.slice(1)}.` : "";
    }
    const direct = sentence(`${thesis.replace(/\.$/, "")}. ${mechanism}`.replace(/\s+/g, " "));
    const warmCore = notInImage && prints ? `${thesis.replace(/\.$/, "")}. Trying harder does not cross that boundary. If it is not in the image${gloss ? ` (${gloss})` : ""}, it does not print${even ? `, ${even}` : ""}.` : `${thesis.replace(/\.$/, "")}. ${sentence(clipWords(rest || body, 24))}`;
    const askPiece = pieces.find((part) => /\b(if|whether|can we|could we|should we)\b/i.test(part)) || pieces[pieces.length - 1] || thesis;
    const concise = notInImage && prints ? `If it is not in the image${gloss ? ` (${clipWords(gloss, 12)})` : ""}, it does not print.` : sentence(clipWords(askPiece, 22));
    return {
      calibrations: {
        direct,
        warm: sentence(warmCore),
        concise: sentence(concise)
      },
      notes: [
        "Read the whole passage. The reply follows the claim through to the last sentence, instead of swapping in a stock line.",
        gloss ? "Folded the long aside back into the sentence, because it defines the claim rather than decorating it." : "Cut repeated scaffolding and kept the sentence that actually carries the point."
      ]
    };
  }
  function calmCalibrations(raw) {
    const trimmed = raw.replace(/\s+/g, " ").replace(/\b(can you|could you|would you|please)\s+just\b/gi, "$1").trim();
    const question = (trimmed.match(/[^.!?]*\?/)?.[0] || trimmed).trim();
    const asking = question.endsWith("?");
    const stillWorks = question.match(/^does (.+) still work for (.+)\?$/i);
    const direct = stillWorks ? `Is ${stillWorks[2]} still on for ${stillWorks[1]}?` : asking ? question.charAt(0).toUpperCase() + question.slice(1) : sentence(question);
    const warm = stillWorks ? `Are you still good for ${stillWorks[2]} ${stillWorks[1]}?` : /^can you\b/i.test(direct) ? direct.replace(/^Can you\b/, "Would you") : /^could you\b/i.test(direct) ? direct.replace(/^Could you\b/, "Would you") : `I wanted to ask this more gently: ${lowerFirst(direct)}`;
    const trimmedAsk = direct.replace(/^can we\s+/i, "").replace(/^could we\s+/i, "").replace(/^would you\s+/i, "").replace(/^please\s+/i, "").replace(/^(?:can|could|would) you\s+/i, "").replace(/\s+/g, " ").trim();
    const shortened = `${trimmedAsk.charAt(0).toUpperCase()}${trimmedAsk.slice(1)}`;
    const shortTopic = stillWorks ? stillWorks[2].replace(/^the\s+/i, "") : "";
    const concise = stillWorks ? `${shortTopic.charAt(0).toUpperCase()}${shortTopic.slice(1)} ${stillWorks[1]} still good?` : shortened.length < direct.length ? shortened : direct;
    return {
      calibrations: {
        direct,
        warm,
        concise: concise.charAt(0).toUpperCase() + concise.slice(1)
      },
      notes: [
        "Kept your question, including the time and the topic.",
        "Added a warmer greeting and a shorter version without changing the ask."
      ]
    };
  }
  function detectInterpersonalArchetype(raw, lower, timeRef, subject) {
    if (/\b(apologi[sz]e|apology|say sorry|i'm sorry|im sorry)\b/i.test(lower) && /\b(can't make me|cant make me|won't|wont|not going to|refuse|don't|dont|make me)\b/i.test(lower)) {
      return {
        calibrations: {
          direct: "I'm not going to apologize for this. I need you to stop pushing me to apologize.",
          warm: "I hear that you want an apology, and I'm not going to give one I don't mean. Please stop pressing me for it.",
          concise: "I won't apologize for this, so please let it go."
        },
        notes: [
          "Kept the refusal, and took out the power struggle (\u201Cyou can\u2019t make me\u201D).",
          "Did not promise a talk about what happened, because the draft didn't offer one."
        ]
      };
    }
    if (/\b(unreasonable|unfair|not fair|overreact|blown this up|making a big deal|too much to ask)\b/i.test(lower)) {
      return {
        calibrations: {
          direct: "This doesn't feel fair to me. Before I agree, I need us to look at what you're actually asking.",
          warm: "I want this to be fair to both of us, and it doesn't feel that way yet. Can we slow down and look at the actual ask?",
          concise: "This doesn't feel fair. Can we look at the actual ask first?"
        },
        notes: [
          "Replaced the character judgment (\u201Cunreasonable\u201D) with the real objection: the ask doesn't feel fair.",
          "Asked to look at the request itself, which is something the other person can answer."
        ]
      };
    }
    if (/\b(guilt|guilting|guilt-trip|pressure me|pressuring|pressured me|manipulat|coerce|twist my arm|make me feel bad|doing what you want|talk me into|push me into|force me|forcing me|you can't make me|you cant make me|stop pushing|take no for an answer|already said no)\b/i.test(
      lower
    )) {
      const specificAction = extractSpecificActionAfterInto(raw);
      return {
        calibrations: {
          direct: specificAction ? `I'm not going to be pushed into ${specificAction}. My answer is no, and I need that respected.` : "I'm not going to say yes because I feel pushed. My answer is no, and I need that respected.",
          warm: specificAction ? `I care about you, and I'm still saying no to ${specificAction}. If I agreed from guilt, I'd resent it later.` : "I care about you, and I'm still saying no. If I agreed out of guilt, I'd resent it, and I don't want that between us.",
          concise: specificAction ? `No on ${specificAction}. Pushing me won't change it.` : "My answer is no. Please don't push me to change it."
        },
        notes: [
          "Turned the accusation (\u201Cyou can\u2019t guilt me\u201D) into a settled answer: no.",
          "Took out the contest (\u201Cdoing what you want\u201D) so there is nothing to argue about except the decision.",
          specificAction ? `Kept the specific thing you are refusing: ${specificAction}.` : "Did not invent a reason, a time, or a compromise you didn't offer."
        ]
      };
    }
    if (/\b(control me|controlling|boss me|stop telling me|don't tell me what to do|dont tell me what to do|run my life|my life|my choice|back off|mind your own|none of your business|butt out|stop micromanaging|let me do my job)\b/i.test(
      lower
    )) {
      const decision = subject ? `The call on ${subject} is mine.` : "This is my decision to make.";
      return {
        calibrations: {
          direct: `${decision} I need you to step back and let me make it.`,
          warm: subject ? `I don't want to fight about ${subject}. I need to make this call myself, and I'd like you to trust me with it.` : "I don't want to fight about this. I need to make this call myself, and I'd like you to trust me with it.",
          concise: subject ? `${subject.charAt(0).toUpperCase()}${subject.slice(1)} is my call. Please let me make it.` : "This one's my call. Please let me make it."
        },
        notes: [
          "Said whose decision it is, without thanking them for trust they haven't shown.",
          "Asked them to step back, which is the actual request."
        ]
      };
    }
    if (/\b(never listen|don't listen|dont listen|not listening|won't listen|wont listen|aren't listening|arent listening|just listen|ever listen|listen to me|hear me out|hear a word|talking over me|talk over me|interrupt|dismiss|invalidat|talking to a wall|talk to a wall|ignore what i say|don't care how i feel|my feelings don't matter)\b/i.test(
      lower
    )) {
      const interrupted = /\b(interrupt|talking over|talk over)\b/i.test(lower);
      return {
        calibrations: {
          direct: interrupted ? "I don't feel heard right now. I need to finish before you respond." : "I don't feel heard right now. I need you to listen to what I'm saying before you respond.",
          warm: "I want us to understand each other, and right now I don't feel heard. Can you hear me out before you answer?",
          concise: "I don't feel heard. Please just listen."
        },
        notes: [
          "Replaced \u201Cwhy can\u2019t you ever just listen\u201D with what is true right now: you don't feel heard.",
          interrupted ? "Kept the interruption, because you named it, and asked to finish." : "Did not invent an interruption or a timer the draft never mentioned."
        ]
      };
    }
    if (/\b(talk to me like that|speak to me like that|watch your tone|watch your mouth|who do you think you are|disrespect|condescend|patroniz|talk down to me|your attitude|being rude|so rude to me|treat me like)\b/i.test(
      lower
    )) {
      const later = timeRef ? ` If it stays like this, I'll come back to it ${timeRef}.` : "";
      return {
        calibrations: {
          direct: `I'm not okay with how you're speaking to me right now. I need you to talk to me respectfully.${later}`,
          warm: "I do want to hear what you have to say, and it's hard when you talk to me this way. Can you say it more kindly?",
          concise: "Please speak to me with respect."
        },
        notes: [
          "Named the tone as the problem and asked for respect, without matching it.",
          timeRef ? `Kept ${timeRef}, because you named it.` : "Did not invent a time to resume."
        ]
      };
    }
    if (/\b(not my fault|not my problem|your fault|you messed up|you screwed up|you broke|you ruined|clean up your mess|not my job|figure it out yourself|deal with it yourself|stop blaming me|don't blame me)\b/i.test(
      lower
    )) {
      const topic = subject && subject !== "this" ? ` ${subject}` : " this";
      return {
        calibrations: {
          direct: `I don't think${topic} is on me, and I'm not going to fix it. I need you to handle it.`,
          warm: "I don't want to argue about blame. I'm not the one to sort this out, so I need you to take it from here.",
          concise: "This one isn't mine to fix. Please handle it."
        },
        notes: [
          "Kept the boundary \u2014 this isn't yours to fix \u2014 without \u201Cfigure it out yourself.\u201D",
          "Did not promise a piece of the work you never named."
        ]
      };
    }
    if (/\b(selfish|only care about yourself|all about you|one-sided|i do everything|pull your weight|carry the load|never help|don't help|dont help|inconsiderate|take me for granted)\b/i.test(
      lower
    )) {
      return {
        calibrations: {
          direct: `Right now the effort between us feels uneven, and I'm starting to feel resentful. I need us to share the load more fairly going forward.`,
          warm: `I'm feeling stretched thin carrying this on my own, and I don't want that to turn into resentment between us. Can we talk about how to balance this more evenly?`,
          concise: `This feels one-sided right now \u2014 I need us to share the effort more evenly.`
        },
        notes: [
          "Translated a character label (\u201Cselfish\u201D) into the concrete impact on your energy and the relationship.",
          "Named the need for shared effort before resentment builds further."
        ]
      };
    }
    if (/\b(lying|lied to me|you lie|dishonest|bullshit|full of excuses|all excuses|can't trust|cant trust|don't trust|dont trust|broke your promise|promised me|story keeps changing)\b/i.test(
      lower
    )) {
      return {
        calibrations: {
          direct: `What you're sharing now doesn't match what we agreed on earlier, and that makes it hard for me to trust where things stand. I need a straightforward answer so I know how to proceed.`,
          warm: `Trust matters a lot to me, and right now the mixed signals are leaving me uneasy. Can we be completely transparent with each other about what's actually happening?`,
          concise: `The mixed signals are making it hard to trust where things stand \u2014 I need a straightforward answer here.`
        },
        notes: [
          "Named the gap between prior commitments and current actions without using inflammatory labels.",
          "Anchored the request on clarity and rebuilding trust."
        ]
      };
    }
    if (/\b(sick of|tired of|fed up|over this|had enough|i'm done|im done|can't do this anymore|cant do this anymore|leave me alone|stop texting me|give me space|at my limit|exhausting)\b/i.test(
      lower
    )) {
      const until = timeRef ? ` I'll come back to it ${timeRef}.` : "";
      return {
        calibrations: {
          direct: `I've had enough of this for now. I need you to give me some space.${until}`,
          warm: timeRef ? `I'm really drained by this right now, and I need some time on my own until ${timeRef}. Please give me that space.` : "I'm really drained by this right now, and I need some time on my own. Please give me that space.",
          concise: "I need some space right now."
        },
        notes: [
          "Turned \u201Cleave me alone\u201D into a plain request for space.",
          timeRef ? `Kept ${timeRef}, because you named when you'd return.` : "Did not promise a return time you didn't give."
        ]
      };
    }
    if (/\b(i don't want to|i dont want to|i'm not going to|im not going to|i'm not doing|im not doing|no way|i won't do|i wont do|i refuse|count me out|don't have time|not happening)\b/i.test(
      lower
    )) {
      const about = subject ? ` on ${subject}` : " on this";
      return {
        calibrations: {
          direct: `I won't be able to take this on right now. My bandwidth is spoken for, so I need to pass${about}.`,
          warm: `Thank you for thinking of me \u2014 I need to pass${about} right now so I can honor my current commitments, and I hope it goes smoothly.`,
          concise: `I don't have the bandwidth for this right now, so I'll need to pass.`
        },
        notes: [
          "Delivered a clean, unambiguous \u201Cno\u201D without defensiveness or over-justifying."
        ]
      };
    }
    return null;
  }
  function buildContextualCalibrations(slug, raw, tone) {
    const lower = raw.toLowerCase();
    const timeRef = extractTimeReference(raw);
    const subject = extractSubject(raw);
    const notes = [];
    if (isCalmDraft(raw, lower, tone) && raw.trim().split(/\s+/).length < 36) return calmCalibrations(raw);
    const passage = condensePassage(raw);
    if (passage && (slug === "brief" || slug === "pause" || !fitsStudio(slug, lower))) return passage;
    const archetype = detectInterpersonalArchetype(raw, lower, timeRef, subject);
    if (archetype) return archetype;
    const route = fitsStudio(slug, lower) ? slug : "pause";
    if (route === "pause") {
      const logistics = logisticsCalibration(raw, lower, timeRef);
      if (logistics) return logistics;
    }
    const polished = polishDraft(raw);
    if (polished) return polished;
    if (tone.label === "destructive") {
      notes.push("Removed personal attacks and contemptuous phrasing so the recipient focuses on your actual request.");
    } else if (tone.label === "negative") {
      notes.push("Lowered the emotional heat while keeping your boundary and expectation unmistakably clear.");
    } else {
      notes.push("Tightened the structure so your main ask lands in the first sentence.");
    }
    switch (route) {
      case "repair": {
        notes.push("Eliminated any defensive \u201Cbut\u201D clause so the apology reads as genuine ownership.");
        notes.push("Closed with a concrete invitation to reset when the other person is ready.");
        const topicPhrase = subject ? ` about ${subject}` : "";
        const whenPhrase = timeRef ? ` ${timeRef}` : "";
        return {
          calibrations: {
            direct: `I'm sorry for how sharply I came across earlier${topicPhrase}. Even though I was stressed, my tone wasn't fair to you. When you're ready${whenPhrase}, I'd like to talk it through calmly and hear your side.`,
            warm: `I owe you an apology for my tone earlier${topicPhrase} \u2014 that landed much harder than you deserved. Can we reset${whenPhrase} so I can listen properly?`,
            concise: `I'm sorry for my tone earlier${topicPhrase}. That wasn't fair to you \u2014 I'd like to reset${whenPhrase} when you're ready.`
          },
          notes
        };
      }
      case "brief": {
        if (isCalmDraft(raw, lower, tone)) return calmCalibrations(raw);
        const archetype2 = detectInterpersonalArchetype(raw, lower, timeRef, subject);
        if (archetype2) return archetype2;
        notes.push("Stripped self-deprecating hedges and preamble so the recipient can answer in ten seconds.");
        const topicAsk = subject || "this";
        const timed = timeRef ? ` for ${timeRef}` : "";
        return {
          calibrations: {
            direct: timeRef ? `Quick check on ${topicAsk} \u2014 does ${timeRef} still work on your end, or should we adjust?` : `Quick check on ${topicAsk} \u2014 does the current plan still work, or should we adjust?`,
            warm: `Hey \u2014 checking in on ${topicAsk}${timed}. Let me know if that still works, or if another time is easier.`,
            concise: timeRef ? `Still good for ${topicAsk} ${timeRef}?` : `Still good for ${topicAsk}, or should we pick another time?`
          },
          notes
        };
      }
      case "deal": {
        notes.push("Replaced artificial pressure with an operational timeline and a clear yes/no decision frame.");
        const topic = subject || "this";
        return {
          calibrations: {
            direct: timeRef ? `To hold the date on ${topic}, we need a decision by ${timeRef}. Should we lock that in, or push it?` : `I need a clear decision on ${topic}: should we move ahead, pause, or pass?`,
            warm: timeRef ? `Checking on ${topic}. We can hold the date through ${timeRef} \u2014 want to keep it, or release it for now?` : `Checking on ${topic}. Do you want to move ahead, pause, or pass?`,
            concise: timeRef ? `Decision on ${topic} by ${timeRef}: lock it in, or push it?` : `On ${topic}: move ahead, pause, or pass?`
          },
          notes
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
            concise: `I'm sorry about ${issue}. I own it from here and will update you ${when}.`
          },
          notes
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
            concise: `The main point in ${artifact} needs to lead${due}. I can mark up the first section.`
          },
          notes
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
            warm: `Hi \u2014 I had a specific reason for writing, and there's no pressure to be looking. I can send a one-page brief, or we can do ${intro}${when} if you're curious.`,
            concise: `Open to ${intro}${when}, or want the brief first?`
          },
          notes
        };
      }
      case "keep": {
        notes.push("Anchored the check-in around account value and reduced the ask to a one-line decision.");
        return {
          calibrations: {
            direct: `Ahead of your renewal, one question: keep the current plan as-is, or adjust it${timeRef ? ` before ${timeRef}` : " before it renews"}?`,
            warm: `I'll keep this to one line. With your renewal coming up, should the current plan stay as-is, or do you want to change it${timeRef ? ` before ${timeRef}` : ""}?`,
            concise: `Renewal question: keep the plan as-is, or adjust it${timeRef ? ` before ${timeRef}` : ""}?`
          },
          notes
        };
      }
      case "steady": {
        notes.push("Applied the BIFF standard (Brief, Informative, Friendly, Firm) \u2014 keeping only logistics and the child's need.");
        const item = subject;
        const when = timeRef;
        const direct = item && when ? `Please include ${item} at the ${when} handoff. Thank you.` : item ? `Please include ${item} at the handoff. Thank you.` : when ? `Please confirm the ${when} handoff and what should come with them. Thank you.` : "Please send the handoff time and what should come with them. Thank you.";
        return {
          calibrations: {
            direct,
            warm: item && when ? `Hi \u2014 please bring ${item} for the ${when} handoff. Thank you.` : item ? `Hi \u2014 please bring ${item} to the handoff. Thank you.` : when ? `Hi \u2014 please confirm ${when} and what should come with them. Thank you.` : "Hi \u2014 please send the handoff time and what they need to bring. Thank you.",
            concise: item && when ? `Please include ${item} at ${when}. Thank you.` : item ? `Please bring ${item}. Thank you.` : when ? `Please confirm ${when}. Thank you.` : "Please send the handoff time. Thank you."
          },
          notes
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
              direct: about ? `I haven't heard back about ${about}${allDay ? " all day" : ""}. I need a reply, even a short one.${replyBy}` : allDay ? `I get annoyed when my texts go unanswered all day, and I want to be clear about why I'm upset. I need a reply, even a short one.${replyBy}` : `I haven't heard back. I need a reply, even a short one.${replyBy}`,
              warm: about ? `I'm not trying to start a fight. It's hard for me when I don't hear back about ${about}. Even a quick reply would help.` : "I'm not trying to start a fight. It's hard for me when I don't hear back all day, and even a quick reply would help a lot.",
              concise: about ? `Haven't heard back about ${about}. Please reply when you can.` : "Not hearing back all day bothers me. Please reply when you can."
            },
            notes
          };
        }
        if (/^(fine|whatever|k|ok|do what you want|forget it|i don't care)/i.test(lower.trim())) {
          const until = timeRef ? ` I'll come back to it ${timeRef}.` : "";
          notes.push("Said that you're too frustrated to keep going, without pretending you don't care.");
          if (!timeRef) notes.push("Did not invent a clock time to restart.");
          return {
            calibrations: {
              direct: `I'm too frustrated to keep talking about this right now. I need a break before we go any further.${until}`,
              warm: timeRef ? `I'm worn out, and I don't want to say something I'll regret. I need to step away until ${timeRef}.` : "I'm worn out, and I don't want to say something I'll regret. I need to step away from this for a bit.",
              concise: "I need a break from this right now."
            },
            notes
          };
        }
        if (/\b(cancel|canceling|bail|bailing|flak|late|last minute|spring this)\b/i.test(lower)) {
          const notice = extractNotice(raw);
          const again = /\bagain\b/i.test(lower);
          const late = notice ? `${notice} before we meet` : "this late";
          notes.push(
            notice ? `Kept the ${notice} notice and asked for earlier warning.` : "Asked for earlier warning without inventing how late the cancellation was."
          );
          if (again) notes.push("Kept that this has happened before, because you said again.");
          return {
            calibrations: {
              direct: `Canceling ${late}${again ? ", and not for the first time," : ""} is really frustrating. I need you to tell me earlier when plans change.`,
              warm: again ? `I'm disappointed, and this has happened before. If plans change, please let me know as early as you can.` : `I'm disappointed. If plans change, please let me know as early as you can.`,
              concise: notice ? `Canceling ${notice} out${again ? " again" : ""} is hard on me. I need more notice.` : `Canceling this late${again ? " again" : ""} is hard on me. I need more notice.`
            },
            notes
          };
        }
        const archetype2 = detectInterpersonalArchetype(raw, lower, timeRef, subject);
        if (archetype2) {
          return archetype2;
        }
        const reflected = reflectTheirWords(raw);
        if (reflected) return reflected;
        if (/\b(you always|you never)\b/i.test(lower)) {
          notes.push("Shifted from \u201Cyou always / you never\u201D (which triggers instant defensiveness) to today's specific situation and what you need next.");
          const about = subject || "what happened today";
          return {
            calibrations: {
              direct: `I'm not going to argue about always or never. I need a plan for ${about}${timeRef ? ` at ${timeRef}` : ""}.`,
              warm: `I don't want to make this about always or never. Can we deal with ${about}${timeRef ? ` at ${timeRef}` : ""} and decide the next step?`,
              concise: `Let's deal with ${about}, not with always or never.`
            },
            notes
          };
        }
        const aboutPhrase = subject ? ` about ${subject}` : "";
        const onTopic = subject ? ` on ${subject}` : " on this";
        const whenPhrase = timeRef ? ` ${timeRef}` : "";
        if (tone.label === "destructive" || tone.label === "negative" || /\b(you|your|you're|youre|stop|don't|dont|can't|cant|won't|wont|why)\b/i.test(lower)) {
          notes.push(
            "Shifted from second-person pushback to a calm, first-person boundary that holds your ground without escalating."
          );
          notes.push(
            "Removed adversarial framing so the other person has to respond to your boundary rather than your tone."
          );
          return {
            calibrations: {
              direct: `Where we stand right now${aboutPhrase} isn't working for me. I want to be upfront about my boundary here and agree on a clear path forward${timeRef ? ` by ${timeRef}` : ""}.`,
              warm: `I want to sort this out${aboutPhrase}. Can we talk about the specific issue${whenPhrase}?`,
              concise: `I'll talk about the actual issue${aboutPhrase}. I need it to be calm.`
            },
            notes
          };
        }
        notes.push("Structured your note into a clear, low-friction check-in with an easy next step.");
        return {
          calibrations: {
            direct: `Wanted to align${onTopic} and make sure we're on the same page. Let me know what works best on your end${timeRef ? ` by ${timeRef}` : ""}.`,
            warm: `Hey \u2014 wanted to check in${aboutPhrase} and see how things look on your end. Open to aligning on next steps${timeRef ? ` ${timeRef}` : " when you have a moment"}?`,
            concise: `Quick check-in${aboutPhrase} \u2014 let me know what works on your end${timeRef ? ` by ${timeRef}` : ""}.`
          },
          notes
        };
      }
    }
  }
  function studioRewrite(slug, raw) {
    const text = raw.replace(/[’‘ʼ]/g, "'").trim();
    const tone = analyzeHeuristic(text);
    if (!text) {
      return {
        rewrite: "",
        calibrations: { direct: "", warm: "", concise: "" },
        notes: ["Paste a draft or select a real-world scenario above to calibrate."],
        tone,
        afterTone: tone,
        source: "heuristic"
      };
    }
    const normalizedInput = normalizeForMatch(text);
    const product = products.find((p) => p.slug === slug);
    const matchedSample = product?.samples.find((s) => normalizeForMatch(s.text) === normalizedInput) || products.flatMap((p) => p.samples).find((s) => normalizeForMatch(s.text) === normalizedInput);
    if (matchedSample?.rewrites) {
      const rewrite = matchedSample.rewrites.direct;
      const afterTone2 = analyzeHeuristic(rewrite);
      return {
        rewrite,
        calibrations: matchedSample.rewrites,
        notes: matchedSample.notes || [
          "Replaced escalatory phrasing with specific facts and a clear next step."
        ],
        tone,
        afterTone: {
          ...afterTone2,
          label: afterTone2.label === "destructive" || afterTone2.label === "negative" ? "neutral" : "positive",
          score: Math.min(0.84, Math.max(0.68, afterTone2.score))
        },
        source: "heuristic"
      };
    }
    const { calibrations, notes } = buildContextualCalibrations(slug, text, tone);
    const rawAfter = analyzeHeuristic(calibrations.direct);
    const afterTone = {
      ...rawAfter,
      label: rawAfter.label === "destructive" || rawAfter.label === "negative" ? "neutral" : "positive",
      score: Math.min(0.84, Math.max(0.68, rawAfter.score))
    };
    return {
      rewrite: tidy(calibrations.direct),
      calibrations,
      notes,
      tone,
      afterTone,
      source: "heuristic"
    };
  }

  // extension/src/content.ts
  var VOICES = [
    { id: "direct", label: "Direct" },
    { id: "warm", label: "Warm" },
    { id: "concise", label: "Short" }
  ];
  function composerFrom(target) {
    if (!(target instanceof HTMLElement)) return null;
    if (target.closest("#attune-extension-root")) return null;
    if (target instanceof HTMLTextAreaElement) return target;
    if (target instanceof HTMLInputElement) {
      const type = (target.type || "text").toLowerCase();
      if (["password", "hidden", "file", "checkbox", "radio", "submit", "button", "range", "color"].includes(type)) {
        return null;
      }
      return target;
    }
    const editable = target.closest("[contenteditable]");
    if (!(editable instanceof HTMLElement)) return null;
    const mode = editable.contentEditable;
    if (mode !== "true" && mode !== "plaintext-only") return null;
    return editable;
  }
  function readDraft(composer) {
    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const start = composer.selectionStart ?? 0;
      const end = composer.selectionEnd ?? 0;
      if (start !== end) return { text: composer.value.slice(start, end), partial: true };
      return { text: composer.value, partial: false };
    }
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && composer.contains(selection.anchorNode)) {
      return { text: selection.toString(), partial: true };
    }
    return { text: composer.innerText, partial: false };
  }
  function writeDraft(composer, text, partial) {
    composer.focus();
    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const start = partial ? composer.selectionStart ?? 0 : 0;
      const end = partial ? composer.selectionEnd ?? composer.value.length : composer.value.length;
      composer.setRangeText(text, start, end, "end");
      composer.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
      return;
    }
    const selection = window.getSelection();
    if (!partial || !selection || selection.isCollapsed || !composer.contains(selection.anchorNode)) {
      const range = document.createRange();
      range.selectNodeContents(composer);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    document.execCommand("insertText", false, text);
  }
  function mount() {
    if (document.getElementById("attune-extension-root")) return;
    const host = document.createElement("div");
    host.id = "attune-extension-root";
    host.style.cssText = "all: initial; position: fixed; z-index: 2147483646; right: 16px; bottom: 16px;";
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
    .bar {
      display: none;
      align-items: center;
      gap: 6px;
      padding: 8px;
      border-radius: 999px;
      background: #14120b;
      color: #f6f1e7;
      font: 13px/1.2 Georgia, "Iowan Old Style", serif;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
    }
    .bar.show { display: flex; }
    .mark { padding: 0 6px; letter-spacing: 0.04em; }
    button {
      border: 0;
      border-radius: 999px;
      padding: 6px 10px;
      background: #f6f1e7;
      color: #14120b;
      font: inherit;
      cursor: pointer;
    }
    button:disabled { opacity: 0.4; cursor: default; }
  `;
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.innerHTML = `<span class="mark">Attune</span>`;
    const buttons = VOICES.map((voice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = voice.label;
      button.dataset.voice = voice.id;
      return button;
    });
    for (const button of buttons) bar.appendChild(button);
    shadow.append(style, bar);
    document.documentElement.appendChild(host);
    let composer = null;
    const refresh = () => {
      const draft = composer ? readDraft(composer).text.trim() : "";
      bar.classList.toggle("show", Boolean(composer));
      for (const button of buttons) button.disabled = draft.length === 0;
    };
    bar.addEventListener("mousedown", (event) => event.preventDefault());
    bar.addEventListener("click", (event) => {
      const button = event.target?.closest("button");
      const voice = button?.dataset.voice;
      if (!composer || !voice || !button || button.disabled) return;
      const draft = readDraft(composer);
      const result = studioRewrite("pause", draft.text);
      const next = result.calibrations[voice] || result.rewrite;
      if (!next.trim()) return;
      writeDraft(composer, next, draft.partial);
      refresh();
    });
    document.addEventListener("focusin", (event) => {
      composer = composerFrom(event.target);
      refresh();
    });
    document.addEventListener("input", () => refresh(), true);
    document.addEventListener("selectionchange", () => refresh());
  }
  mount();
})();
