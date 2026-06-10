import type { Locale } from "@/i18n/config";

/** The match-score dimensions tracked in the live panel. Compensation is
 * deliberately excluded — the bot never discusses or scores pay. */
export type Dimension = "tech_stack_fit" | "remote_flex" | "work_style";

export const DIMENSIONS: readonly Dimension[] = [
  "tech_stack_fit",
  "remote_flex",
  "work_style",
] as const;

/**
 * Weights for the overall match score (sum to 1). Lives here — not in
 * baseline.ts — so the client can compute the overall without bundling the
 * private baseline data (rubric, dealbreakers).
 */
export const WEIGHTS: Record<Dimension, number> = {
  work_style: 0.4,
  remote_flex: 0.35,
  tech_stack_fit: 0.25,
};

export type QuestionKind = "single" | "multi" | "text";

export type Question = {
  id: string;
  text: string;
  kind: QuestionKind;
  options?: string[];
};

export type QuestionCard = {
  intro?: string;
  questions: Question[];
};

/** A submitted answer (question text + chosen answer) shown in the card's summary. */
export type AnswerPair = { q: string; a: string };

export type Scores = Partial<Record<Dimension, number>>;
export type Rationale = Partial<Record<Dimension, string>>;

export type ErrorCode =
  | "rate_limited"
  | "too_long"
  | "bad_request"
  | "unavailable"
  | "server_error";

/** Newline-delimited JSON events streamed from /api/chat to the browser. */
export type ServerEvent =
  | { t: "text"; v: string }
  | { t: "tool_pending"; name: string } // a tool call started generating (UI can lock + show a hint)
  | { t: "score"; scores: Scores; rationale?: Rationale }
  | { t: "questions"; card: QuestionCard }
  | { t: "error"; code: ErrorCode }
  | { t: "done" };

/** Plain text-only turn the browser replays each request (no tool state). */
export type ClientMessage = { role: "user" | "assistant"; content: string };

export type ChatRequest = {
  locale: Locale;
  sessionId: string;
  messages: ClientMessage[];
};
