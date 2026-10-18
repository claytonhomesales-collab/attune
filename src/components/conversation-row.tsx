"use client";

import Link from "next/link";
import { computeClimate, ensureTone } from "@/lib/tone/climate";
import type { Conversation } from "@/lib/tone/types";
import { ToneBadge } from "./tone-badge";

export function ConversationRow({ conversation }: { conversation: Conversation }) {
  const climate = computeClimate(conversation.messages);
  const last = conversation.messages[conversation.messages.length - 1];
  const lastTone = last ? ensureTone(last) : null;

  return (
    <Link
      href={`/app/thread/${conversation.id}`}
      className="group flex items-center gap-4 px-4 py-4 transition hover:bg-white/70 md:px-5"
    >
      <div
        className="relative flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{
          background: `linear-gradient(145deg, hsl(${conversation.avatarHue} 42% 42%), hsl(${conversation.avatarHue} 35% 28%))`,
        }}
      >
        {conversation.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
        <span
          className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-foam"
          style={{
            background:
              climate.label === "escalating"
                ? "var(--destructive)"
                : climate.label === "cooling"
                  ? "var(--negative)"
                  : climate.label === "warming"
                    ? "var(--positive)"
                    : "var(--neutral)",
          }}
          title={climate.label}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate font-medium text-ink">{conversation.name}</p>
          <time className="shrink-0 text-[11px] text-ink-soft/55">
            {new Date(conversation.updatedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
        <p className="mt-0.5 text-xs text-ink-soft/70">{conversation.relation}</p>
        <p className="mt-1 truncate text-sm text-ink-soft">{conversation.lastPreview}</p>
      </div>
      {lastTone && (
        <div className="hidden sm:block">
          <ToneBadge label={lastTone.label} />
        </div>
      )}
    </Link>
  );
}
