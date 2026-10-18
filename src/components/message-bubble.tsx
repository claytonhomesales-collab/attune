"use client";

import { motion } from "framer-motion";
import type { Message } from "@/lib/tone/types";
import { ToneBadge } from "./tone-badge";
import { ensureTone } from "@/lib/tone/climate";

export function MessageBubble({
  message,
  index,
}: {
  message: Message;
  index: number;
}) {
  const mine = message.sender === "you";
  const tone = ensureTone(message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.35), duration: 0.35 }}
      className={`flex ${mine ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[min(100%,28rem)] ${mine ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
        <div
          className={`tone-${tone.label} relative rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-none`}
          style={{
            background: mine
              ? "color-mix(in oklab, var(--sea) 12%, white)"
              : "white",
            boxShadow: `0 0 0 1px color-mix(in oklab, var(--tone) 35%, transparent), 0 8px 24px -16px var(--tone-glow)`,
            borderBottomRightRadius: mine ? "0.35rem" : undefined,
            borderBottomLeftRadius: mine ? undefined : "0.35rem",
          }}
        >
          <p className="whitespace-pre-wrap text-ink">{message.text}</p>
        </div>
        <div className={`flex items-center gap-2 ${mine ? "flex-row-reverse" : ""}`}>
          <ToneBadge label={tone.label} />
          <span className="text-[11px] text-ink-soft/60">
            {new Date(message.sentAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
            {mine ? " · you" : ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
