"use client";

import { useCallback, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type {
  ServerEvent,
  Scores,
  Rationale,
  QuestionCard,
  AnswerPair,
  ErrorCode,
} from "@/lib/chat/protocol";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  card?: QuestionCard; // on assistant messages
  cardAnswered?: boolean;
  cardSummary?: AnswerPair[]; // durable answers for the answered-card summary
  hidden?: boolean; // card answers: sent to the model but not shown as a duplicate bubble
};

export type ScoreState = { scores: Scores; rationale: Rationale };

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function useChat(locale: Locale) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [scoreState, setScoreState] = useState<ScoreState>({ scores: {}, rationale: {} });
  const [streaming, setStreaming] = useState(false);
  const [toolPending, setToolPending] = useState<string | null>(null);
  const [error, setError] = useState<ErrorCode | null>(null);
  const sessionId = useRef<string>(uid());

  const send = useCallback(
    async (raw: string, opts?: { hidden?: boolean }) => {
      const text = raw.trim();
      if (!text || streaming) return;
      setError(null);
      setToolPending(null);

      // Transcript to send: all prior non-empty text turns + this new user turn.
      const payload = [
        ...messages
          .filter((m) => m.text.trim().length > 0)
          .map((m) => ({ role: m.role, content: m.text })),
        { role: "user" as const, content: text },
      ];

      const userMsg: ChatMessage = { id: uid(), role: "user", text, hidden: opts?.hidden };
      const assistantId = uid();
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", text: "" },
      ]);
      setStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ locale, sessionId: sessionId.current, messages: payload }),
        });

        if (!res.ok || !res.body) {
          let code: ErrorCode = "server_error";
          try {
            const j = (await res.json()) as { error?: ErrorCode };
            if (j.error) code = j.error;
          } catch {
            /* ignore */
          }
          setError(code);
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const handle = (ev: ServerEvent) => {
          switch (ev.t) {
            case "text":
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, text: m.text + ev.v } : m))
              );
              break;
            case "tool_pending":
              setToolPending(ev.name);
              break;
            case "score":
              setScoreState((prev) => ({
                scores: { ...prev.scores, ...ev.scores },
                rationale: { ...prev.rationale, ...(ev.rationale ?? {}) },
              }));
              break;
            case "questions":
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, card: ev.card } : m))
              );
              setToolPending(null);
              break;
            case "error":
              setError(ev.code);
              break;
            case "done":
              break;
          }
        };

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line) continue;
            try {
              handle(JSON.parse(line) as ServerEvent);
            } catch {
              /* ignore malformed line */
            }
          }
        }
      } catch {
        setError("server_error");
      } finally {
        setStreaming(false);
        setToolPending(null);
        // Drop the assistant bubble if it ended up empty and carried no card.
        setMessages((prev) =>
          prev.filter((m) => !(m.id === assistantId && m.text === "" && !m.card))
        );
      }
    },
    [locale, messages, streaming]
  );

  const answerCard = useCallback(
    (messageId: string, answerText: string, summary: AnswerPair[]) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, cardAnswered: true, cardSummary: summary } : m))
      );
      void send(answerText, { hidden: true });
    },
    [send]
  );

  return {
    messages,
    scoreState,
    streaming,
    toolPending,
    error,
    send,
    answerCard,
    clearError: () => setError(null),
  };
}
