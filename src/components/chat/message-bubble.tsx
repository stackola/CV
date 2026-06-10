"use client";

import type { ChatDict } from "@/i18n/dictionaries/de";
import type { AnswerPair } from "@/lib/chat/protocol";
import type { ChatMessage } from "./use-chat";
import { QuestionCard } from "./question-card";
import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";

export function MessageBubble({
  message,
  dict,
  onAnswer,
}: {
  message: ChatMessage;
  dict: ChatDict;
  onAnswer: (messageId: string, text: string, summary: AnswerPair[]) => void;
}) {
  const isUser = message.role === "user";

  // Hidden card-answer turns are sent to the model but not shown — the card's
  // answered summary is the visible record.
  if (message.hidden) return null;

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      {message.text && (
        <div
          className={cn(
            "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isUser
              ? "whitespace-pre-wrap rounded-br-sm bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
              : "rounded-bl-sm bg-[var(--color-muted)] text-[var(--color-foreground)]"
          )}
        >
          {isUser ? message.text : <Markdown>{message.text}</Markdown>}
        </div>
      )}

      {message.card && (
        <div className="mt-2 w-full max-w-[95%]">
          <QuestionCard
            card={message.card}
            answered={!!message.cardAnswered}
            summary={message.cardSummary}
            dict={dict}
            onAnswer={(text, summary) => onAnswer(message.id, text, summary)}
          />
        </div>
      )}
    </div>
  );
}
