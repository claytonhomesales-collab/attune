"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSeedConversations } from "@/lib/data/conversations";
import { analyzeHeuristic, softenSuggestion } from "@/lib/tone/heuristic";
import type { Conversation, Message, PlanId, ToneResult } from "@/lib/tone/types";

type AttuneState = {
  conversations: Conversation[];
  plan: PlanId;
  clarityStreak: number;
  onboarded: boolean;
  setPlan: (plan: PlanId) => void;
  setOnboarded: () => void;
  sendMessage: (conversationId: string, text: string) => Promise<Message>;
  analyzeDraft: (text: string) => Promise<{ tone: ToneResult; tip: string | null }>;
  getConversation: (id: string) => Conversation | undefined;
};

const STORAGE_KEY = "attune.v1";
const AttuneContext = createContext<AttuneState | null>(null);

type Persisted = {
  conversations: Conversation[];
  plan: PlanId;
  clarityStreak: number;
  onboarded: boolean;
};

function load(): Persisted {
  if (typeof window === "undefined") {
    return {
      conversations: getSeedConversations(),
      plan: "free",
      clarityStreak: 3,
      onboarded: false,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        conversations: getSeedConversations(),
        plan: "free",
        clarityStreak: 3,
        onboarded: false,
      };
    }
    return JSON.parse(raw) as Persisted;
  } catch {
    return {
      conversations: getSeedConversations(),
      plan: "free",
      clarityStreak: 3,
      onboarded: false,
    };
  }
}

async function classify(text: string, useAi: boolean): Promise<ToneResult> {
  if (!useAi) return analyzeHeuristic(text);
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return analyzeHeuristic(text);
    const data = (await res.json()) as ToneResult;
    return data;
  } catch {
    return analyzeHeuristic(text);
  }
}

export function AttuneProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    getSeedConversations(),
  );
  const [plan, setPlanState] = useState<PlanId>("free");
  const [clarityStreak, setClarityStreak] = useState(3);
  const [onboarded, setOnboardedState] = useState(false);

  useEffect(() => {
    const data = load();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConversations(data.conversations);
    setPlanState(data.plan);
    setClarityStreak(data.clarityStreak);
    setOnboardedState(data.onboarded);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const payload: Persisted = {
      conversations,
      plan,
      clarityStreak,
      onboarded,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [conversations, plan, clarityStreak, onboarded, ready]);

  const setPlan = useCallback((next: PlanId) => setPlanState(next), []);
  const setOnboarded = useCallback(() => setOnboardedState(true), []);

  const analyzeDraft = useCallback(
    async (text: string) => {
      const tone = await classify(text, plan !== "free");
      return { tone, tip: softenSuggestion(text, tone) };
    },
    [plan],
  );

  const sendMessage = useCallback(
    async (conversationId: string, text: string) => {
      const tone = await classify(text, plan !== "free");
      const message: Message = {
        id: `local-${Date.now()}`,
        conversationId,
        sender: "you",
        name: "You",
        text,
        sentAt: new Date().toISOString(),
        tone,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            messages: [...c.messages, message],
            lastPreview: text,
            updatedAt: message.sentAt,
          };
        }),
      );

      if (tone.label === "positive" || tone.label === "neutral") {
        setClarityStreak((s) => s + 0); // streak managed in insights UI from report
      }

      return message;
    },
    [plan],
  );

  const getConversation = useCallback(
    (id: string) => conversations.find((c) => c.id === id),
    [conversations],
  );

  const value = useMemo(
    () => ({
      conversations,
      plan,
      clarityStreak,
      onboarded,
      setPlan,
      setOnboarded,
      sendMessage,
      analyzeDraft,
      getConversation,
    }),
    [
      conversations,
      plan,
      clarityStreak,
      onboarded,
      setPlan,
      setOnboarded,
      sendMessage,
      analyzeDraft,
      getConversation,
    ],
  );

  return <AttuneContext.Provider value={value}>{children}</AttuneContext.Provider>;
}

export function useAttune() {
  const ctx = useContext(AttuneContext);
  if (!ctx) throw new Error("useAttune must be used within AttuneProvider");
  return ctx;
}
