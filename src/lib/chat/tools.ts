import type Anthropic from "@anthropic-ai/sdk";

/**
 * The three presentational tools. None execute server-side logic — each
 * forwards its input to the browser to drive UI (badge / panel / card).
 * Defined once as a frozen constant so the tools-tier cache stays stable.
 */
export const TOOLS: Anthropic.Tool[] = [
  {
    name: "update_match_score",
    description:
      "Update the live match-score panel. Send ONLY the dimensions you can now score with concrete " +
      "evidence; omit dimensions you have no evidence for (they stay 'unknown'). Each score is 0–10, " +
      "judged against Willi's baseline rubric. Call this whenever a dimension's evidence changes.",
    input_schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        scores: {
          type: "object",
          additionalProperties: false,
          properties: {
            tech_stack_fit: { type: "integer", minimum: 0, maximum: 10 },
            remote_flex: { type: "integer", minimum: 0, maximum: 10 },
            work_style: { type: "integer", minimum: 0, maximum: 10 },
          },
        },
        rationale: {
          type: "object",
          additionalProperties: false,
          properties: {
            tech_stack_fit: { type: "string" },
            remote_flex: { type: "string" },
            work_style: { type: "string" },
          },
          description: "Short (≤120 chars) justification per scored dimension, recruiter's locale.",
        },
      },
      required: ["scores"],
    },
  },
  {
    name: "ask_questions",
    description:
      "Render an interactive question card to gather job info needed for scoring (e.g. comp, remote " +
      "policy, stack, team size, work style). Prefer multiple-choice over free text where answers are " +
      "enumerable. Use 1–4 questions. Prefer this tool over asking the same questions in prose.",
    input_schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        intro: {
          type: "string",
          description: "Optional one-line lead-in shown above the questions.",
        },
        questions: {
          type: "array",
          minItems: 1,
          maxItems: 4,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              id: { type: "string" },
              text: { type: "string" },
              kind: { type: "string", enum: ["single", "multi", "text"] },
              options: {
                type: "array",
                items: { type: "string" },
                description: "Required for single/multi; omit for text.",
              },
            },
            required: ["id", "text", "kind"],
          },
        },
      },
      required: ["questions"],
    },
  },
];
