"use client";

import { useEffect, useRef } from "react";
import type { ChatDict } from "@/i18n/dictionaries/de";
import type { AnswerPair } from "@/lib/chat/protocol";
import type { ChatMessage } from "./use-chat";
import { MessageBubble } from "./message-bubble";

export function MessageList({
  messages,
  streaming,
  toolPending,
  dict,
  onAnswer,
}: {
  messages: ChatMessage[];
  streaming: boolean;
  toolPending: string | null;
  dict: ChatDict;
  onAnswer: (messageId: string, text: string, summary: AnswerPair[]) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Whether to keep pinning to the bottom. Flips off when the user scrolls up.
  const stick = useRef(true);

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  // Auto-scroll on ANY content change at the bottom — new messages, each
  // streamed token, AND the tool-pending / thinking indicator — but only while
  // the user is already near the bottom. Scrolls the container itself (not via
  // scrollIntoView) so it never moves the page or the surrounding panel.
  useEffect(() => {
    if (!stick.current) return;
    const el = containerRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(id);
  }, [messages, streaming, toolPending]);

  const lastIsEmptyAssistant =
    streaming &&
    messages.length > 0 &&
    messages[messages.length - 1]!.role === "assistant" &&
    messages[messages.length - 1]!.text === "";

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
    >
      {messages.length === 0 && (
        <p className="rounded-2xl rounded-bl-sm bg-[var(--color-muted)] px-3.5 py-2 text-sm leading-relaxed text-[var(--color-foreground)]">
          {dict.greeting}
        </p>
      )}

      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} dict={dict} onAnswer={onAnswer} />
      ))}

      {toolPending === "ask_questions" ? (
        <p className="text-xs italic text-[var(--color-muted-foreground)]">{dict.preparing}</p>
      ) : lastIsEmptyAssistant ? (
        <p className="text-xs italic text-[var(--color-muted-foreground)]">{dict.thinking}</p>
      ) : null}
    </div>
  );
}
