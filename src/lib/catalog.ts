export type ProductKind = "mirror" | "coach" | "thread" | "bench";

export type ProductCategory = "personal" | "work" | "home" | "team";

export type Product = {
  slug: string;
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
  samples: { label: string; text: string }[];
  href: string;
};

export type Bundle = {
  slug: string;
  name: string;
  summary: string;
  priceMonthly: number;
  productSlugs: string[];
  highlight?: boolean;
};

export const products: Product[] = [
  {
    slug: "mirror",
    name: "Mirror",
    eyebrow: "Your pattern",
    summary: "See how you sound across the conversations that matter.",
    description:
      "An inbox with a climate for every thread and a private report of your own tone. Warm, even, tense, or harmful — over time, not just one line.",
    priceMonthly: 800,
    category: "personal",
    kind: "mirror",
    audience: "Anyone who wants the mirror, not a verdict on someone else.",
    includes: [
      "Thread climate",
      "Your tone report",
      "Clarity streak",
      "Per-relationship breakdown",
    ],
    principles: [
      "Score your own sends first.",
      "A thread can cool without anyone being the villain.",
      "Repair counts more than a perfect streak.",
    ],
    samples: [],
    href: "/app",
  },
  {
    slug: "pause",
    name: "Pause",
    eyebrow: "Before you send",
    summary: "Catch a sharp draft and keep the point.",
    description:
      "Paste any message you are about to send. Pause names the heat and hands back a line that still says what you meant.",
    priceMonthly: 600,
    category: "personal",
    kind: "coach",
    audience: "The moment before a text, email, or DM leaves your hands.",
    includes: ["Live tone read", "Rewrite that keeps the ask", "What changed, in plain language"],
    principles: [
      "Honesty stays. Contempt goes.",
      "One specific moment beats “you always.”",
      "A short pause is the product.",
    ],
    samples: [
      {
        label: "Curt",
        text: "Fine. Whatever. Do what you want.",
      },
      {
        label: "Blame",
        text: "You always ignore me and then act confused. This is ridiculous.",
      },
    ],
    href: "/apps/pause",
  },
  {
    slug: "thread",
    name: "Thread",
    eyebrow: "A whole conversation",
    summary: "Paste a thread. See the climate. Leave with the next line.",
    description:
      "Share a conversation into Thread. Each line is scored, the climate is named, and you get a next message that can warm it without pretending.",
    priceMonthly: 600,
    category: "personal",
    kind: "thread",
    audience: "When you need the shape of the whole exchange, not one bubble.",
    includes: ["Line-by-line tone", "Climate meter", "A suggested next send"],
    principles: [
      "Context changes a short reply.",
      "Match their bid for repair when it is real.",
      "Do not diagnose the other person.",
    ],
    samples: [
      {
        label: "Cooling thread",
        text: "Alex: Are we still on for dinner? I had a rough day.\nYou: You always spring this last minute.\nAlex: That stung. I was hoping for a little care.\nYou: Fine.",
      },
    ],
    href: "/apps/thread",
  },
  {
    slug: "repair",
    name: "Repair",
    eyebrow: "After it went wrong",
    summary: "The note you send once the damage is already done.",
    description:
      "Repair turns a defensive follow-up into a clean acknowledgment: what you did, what you meant, and what you will do next.",
    priceMonthly: 600,
    category: "personal",
    kind: "coach",
    audience: "The hour after a fight, a sharp email, or a public miss.",
    includes: ["Ownership without self-erasure", "No re-argument", "A concrete next step"],
    principles: [
      "Name your part in one sentence.",
      "Do not sneak the case back in.",
      "Offer a time, not a speech.",
    ],
    samples: [
      {
        label: "Still arguing",
        text: "Sorry if you took it the wrong way, but you never listen and someone had to say it.",
      },
    ],
    href: "/apps/repair",
  },
  {
    slug: "brief",
    name: "Brief",
    eyebrow: "Make it short",
    summary: "Turn a ramble into the message you meant to send.",
    description:
      "Drop a voice-note transcript or a messy draft. Brief cuts filler and returns a short note a person can actually answer.",
    priceMonthly: 600,
    category: "personal",
    kind: "coach",
    audience: "When you have the feeling and not the sentence.",
    includes: ["Filler stripped", "One ask", "Copy-ready length"],
    principles: [
      "One request per message.",
      "Lead with the point.",
      "Warmth can be one clause, not a paragraph.",
    ],
    samples: [
      {
        label: "Ramble",
        text: "Hey so I was thinking and I don't know maybe it's nothing but like I feel like we keep missing each other and I basically just want to know if Thursday still works or if we should pick another day, no pressure though, sorry this is long.",
      },
    ],
    href: "/apps/brief",
  },
  {
    slug: "deal",
    name: "Deal",
    eyebrow: "Sales and founders",
    summary: "The follow-up that asks for the decision without the squeeze.",
    description:
      "Deal rewrites pipeline notes, nudges, and proposals so the next step is clear and the pressure is gone. Built for messages that can lose a deal.",
    priceMonthly: 900,
    category: "work",
    kind: "coach",
    audience: "Founders and sellers writing the email they cannot afford to get wrong.",
    includes: ["A dated next step", "No false urgency", "The ask stays intact"],
    principles: [
      "Urgency you invent reads as fear.",
      "Give them a way to say yes that is small.",
      "One page beats a third bump.",
    ],
    samples: [
      {
        label: "Squeeze",
        text: "Just circling back again. We need an answer today or we are moving on to other customers.",
      },
    ],
    href: "/apps/deal",
  },
  {
    slug: "desk",
    name: "Desk",
    eyebrow: "Support",
    summary: "De-escalate a ticket without sounding like a script.",
    description:
      "Desk takes an angry customer thread and returns an acknowledgment, the owner of the fix, and a time. The heat drops. The accountability stays.",
    priceMonthly: 900,
    category: "work",
    kind: "coach",
    audience: "Support leads answering the message that could become a public complaint.",
    includes: ["Acknowledge the impact", "Own the next action", "A real time, not “soon”"],
    principles: [
      "Never correct their feelings first.",
      "Say what you will do, then when.",
      "Do not hide behind policy on the first line.",
    ],
    samples: [
      {
        label: "Hot ticket",
        text: "This is the third time. Your product is useless and nobody replies. I want this fixed now or I am posting everywhere.",
      },
    ],
    href: "/apps/desk",
  },
  {
    slug: "lead",
    name: "Lead",
    eyebrow: "Managers",
    summary: "A clear ask that does not shrink the person.",
    description:
      "Lead rewrites feedback, nudges, and hard news so the expectation is obvious and the person is still respected.",
    priceMonthly: 900,
    category: "work",
    kind: "coach",
    audience: "Managers sending the Slack message people reread all afternoon.",
    includes: ["One expectation", "Respect kept", "Room for their reply"],
    principles: [
      "Critique the work, not the character.",
      "Say the standard out loud.",
      "Ask what they need to meet it.",
    ],
    samples: [
      {
        label: "Sharp feedback",
        text: "This deck is a mess. I don't know why I still have to fix your slides before every review.",
      },
    ],
    href: "/apps/lead",
  },
  {
    slug: "hire",
    name: "Hire",
    eyebrow: "Recruiting",
    summary: "Outreach that sounds like a person, not a sequence.",
    description:
      "Hire turns a stiff recruiting note into a specific, respectful invitation. No fake familiarity. No pressure close.",
    priceMonthly: 800,
    category: "work",
    kind: "coach",
    audience: "Recruiters and founders writing the first note to someone they actually want.",
    includes: ["A real reason you wrote", "A small ask", "An easy no"],
    principles: [
      "Name the work, not a superlative.",
      "Make declining comfortable.",
      "Specific beats “your impressive background.”",
    ],
    samples: [
      {
        label: "Sequence",
        text: "Hi! I came across your impressive profile and we have an amazing opportunity you would be perfect for. Do you have 30 minutes this week? Let me know ASAP.",
      },
    ],
    href: "/apps/hire",
  },
  {
    slug: "keep",
    name: "Keep",
    eyebrow: "Customer success",
    summary: "A check-in that earns a reply without guilt.",
    description:
      "Keep rewrites renewal nudges and health checks so the customer hears value and a simple question, not a chase.",
    priceMonthly: 800,
    category: "work",
    kind: "coach",
    audience: "Success managers writing the note before a quiet account goes cold.",
    includes: ["Value in one line", "One question", "No guilt"],
    principles: [
      "Remind them of a result they already felt.",
      "Ask one question they can answer in a sentence.",
      "Silence is data, not a moral failing.",
    ],
    samples: [
      {
        label: "Guilt nudge",
        text: "Bumping this again — I still haven't heard back and your renewal is coming up so I really need you to respond.",
      },
    ],
    href: "/apps/keep",
  },
  {
    slug: "steady",
    name: "Steady",
    eyebrow: "Co-parenting",
    summary: "Factual, child-centered wording for high-conflict threads.",
    description:
      "Steady strips blame, history, and threats from a co-parent message and leaves the logistics a child actually needs.",
    priceMonthly: 800,
    category: "home",
    kind: "coach",
    audience: "Parents writing messages that may be reread in a hard season.",
    includes: ["Logistics only", "No character attacks", "A clear time and place"],
    principles: [
      "Write as if a child could find the phone.",
      "Facts, time, place, need.",
      "The argument can wait. The handoff cannot.",
    ],
    samples: [
      {
        label: "Loaded logistics",
        text: "You never bring her backpack and I'm sick of cleaning up your mess. Drop her at 5 or don't bother.",
      },
    ],
    href: "/apps/steady",
  },
  {
    slug: "bench",
    name: "Bench",
    eyebrow: "Team pulse",
    summary: "A shared board of outbound lines people chose to paste.",
    description:
      "Bench scores drafts a team volunteers — sales notes, support replies, manager messages — so the group can see heat before it ships. Each person only adds their own lines.",
    priceMonthly: 1900,
    category: "team",
    kind: "bench",
    audience: "Teams who want a shared standard for outbound words.",
    includes: [
      "Volunteer-only drafts",
      "Team climate",
      "No private-phone monitoring",
    ],
    principles: [
      "People paste their own outbound lines.",
      "The board is a workshop, not a surveillance feed.",
      "Praise the clear notes out loud.",
    ],
    samples: [],
    href: "/apps/bench",
  },
];

export const bundles: Bundle[] = [
  {
    slug: "personal",
    name: "Personal",
    summary: "The mirror, the pause, the thread, and the notes that follow.",
    priceMonthly: 1800,
    productSlugs: ["mirror", "pause", "thread", "repair", "brief"],
  },
  {
    slug: "home",
    name: "Home",
    summary: "Steady logistics plus the personal mirror.",
    priceMonthly: 1600,
    productSlugs: ["steady", "mirror", "pause", "repair"],
  },
  {
    slug: "practice",
    name: "Practice",
    summary: "Every work app: deals, support, managers, hiring, and renewals.",
    priceMonthly: 2900,
    productSlugs: ["deal", "desk", "lead", "hire", "keep"],
    highlight: true,
  },
  {
    slug: "house",
    name: "House",
    summary: "The full Attune store. Every app, one subscription.",
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
