export type ToneLabel = "positive" | "neutral" | "negative" | "destructive";

export type ToneResult = {
  label: ToneLabel;
  score: number; // -1 destructive … +1 positive
  confidence: number; // 0–1
  signals: string[];
  summary: string;
  source: "heuristic" | "ai";
};

export type Message = {
  id: string;
  conversationId: string;
  sender: "you" | "them";
  name: string;
  text: string;
  sentAt: string;
  tone?: ToneResult;
};

export type Conversation = {
  id: string;
  name: string;
  relation: string;
  avatarHue: number;
  lastPreview: string;
  updatedAt: string;
  mutedAnalysis?: boolean;
  messages: Message[];
};

export type Climate = {
  label: "warming" | "steady" | "cooling" | "escalating";
  youScore: number;
  themScore: number;
  overall: number;
  positiveShare: number;
  negativeShare: number;
  destructiveShare: number;
  repairMoments: number;
  trendNote: string;
};

export type SelfReport = {
  messageCount: number;
  positive: number;
  neutral: number;
  negative: number;
  destructive: number;
  avgScore: number;
  topSignals: string[];
  clarityDays: number;
  insight: string;
};

export type PlanId = "free" | "plus" | "family";
