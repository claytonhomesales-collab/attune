"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ClimateMeter } from "@/components/climate-meter";
import { Composer } from "@/components/composer";
import { MessageBubble } from "@/components/message-bubble";
import { useAttune } from "@/lib/store/attune-store";
import { computeClimate, computeSelfReport } from "@/lib/tone/climate";

function ThreadContent() {
  const params = useParams<{ id: string }>();
  const { getConversation } = useAttune();
  const conversation = getConversation(params.id);

  if (!conversation) {
    return (
      <main className="mx-auto max-w-2xl flex-1 px-6 py-16">
        <p className="text-ink-soft">Conversation not found.</p>
        <Link href="/app" className="mt-4 inline-block text-sea">
          Back to inbox
        </Link>
      </main>
    );
  }

  const climate = computeClimate(conversation.messages);
  const self = computeSelfReport(conversation.messages);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-0 md:px-6 md:pb-8">
      <div className="flex items-center gap-3 px-5 py-2 md:px-0">
        <Link
          href="/app"
          className="text-sm font-medium text-sea hover:text-sea-deep"
        >
          ← Inbox
        </Link>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-none bg-white/75 shadow-[inset_0_0_0_1px_var(--line)] md:rounded-[1.35rem]">
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-4">
          <div
            className="flex size-11 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(145deg, hsl(${conversation.avatarHue} 42% 42%), hsl(${conversation.avatarHue} 35% 28%))`,
            }}
          >
            {conversation.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-xl text-sea-deep">
              {conversation.name}
            </h1>
            <p className="text-xs text-ink-soft/70">{conversation.relation}</p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-[10px] uppercase tracking-[0.12em] text-ink-soft/55">
              Your tone here
            </p>
            <p className="text-sm font-medium text-ink">
              {Math.round(((self.avgScore + 1) / 2) * 100)}
            </p>
          </div>
        </div>

        <div className="border-b border-[var(--line)] px-5 py-4">
          <ClimateMeter climate={climate} />
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 md:px-5">
          {conversation.messages.map((message, index) => (
            <MessageBubble key={message.id} message={message} index={index} />
          ))}
        </div>

        <Composer conversationId={conversation.id} />
      </div>
    </main>
  );
}

export default function ThreadPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl flex-1 px-6 py-16 text-ink-soft">
          Loading conversation…
        </main>
      }
    >
      <ThreadContent />
    </Suspense>
  );
}
