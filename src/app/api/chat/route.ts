import Anthropic from "@anthropic-ai/sdk";
import { locales, type Locale } from "@/i18n/config";
import { TOOLS } from "@/lib/chat/tools";
import { buildSystem, localeDirective } from "@/lib/chat/system";
import { checkRateLimit, withinDailyBudget } from "@/lib/chat/ratelimit";
import {
  DIMENSIONS,
  type ServerEvent,
  type ErrorCode,
  type Scores,
  type Rationale,
} from "@/lib/chat/protocol";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 2048;
const MAX_MESSAGES = 30;
const MAX_MSG_CHARS = 2000;

function jsonError(code: ErrorCode, status: number) {
  return new Response(JSON.stringify({ error: code }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Reject cross-origin browser requests; allow tools that omit Origin (e.g. curl).
 * Compares the Origin against the public Host header (x-forwarded-host/host) so it
 * works behind a reverse proxy — req.url would otherwise carry the internal host
 * (e.g. 127.0.0.1:3031) and never match the browser's origin (prototyp.ms).
 */
const ALLOWED_HOSTS = new Set(["prototyp.ms", "www.prototyp.ms"]);

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const fwdHost = req.headers.get("x-forwarded-host") || req.headers.get("host");
    if (fwdHost && originHost === fwdHost) return true;
    if (originHost === new URL(req.url).host) return true;
    // Known production hosts (covers reverse proxies that rewrite the Host header).
    if (ALLOWED_HOSTS.has(originHost)) return true;
    return originHost.startsWith("localhost"); // dev, any port
  } catch {
    return false;
  }
}

const clampScore = (n: unknown): number | null => {
  if (typeof n !== "number" || !Number.isFinite(n)) return null;
  return Math.max(0, Math.min(10, Math.round(n)));
};

/** Map a raw tool_use block to a client UI event (presentational tools only). */
function toolEvent(name: string, input: Record<string, unknown>): ServerEvent | null {
  if (name === "update_match_score") {
    const scoresIn = (input.scores ?? {}) as Record<string, unknown>;
    const ratIn = (input.rationale ?? {}) as Record<string, unknown>;
    const scores: Scores = {};
    const rationale: Rationale = {};
    for (const dim of DIMENSIONS) {
      const s = clampScore(scoresIn[dim]);
      if (s !== null) scores[dim] = s;
      if (typeof ratIn[dim] === "string") rationale[dim] = (ratIn[dim] as string).slice(0, 200);
    }
    if (Object.keys(scores).length === 0) return null;
    return { t: "score", scores, rationale };
  }
  if (name === "ask_questions") {
    const questions = Array.isArray(input.questions) ? input.questions : [];
    if (questions.length === 0) return null;
    return {
      t: "questions",
      card: {
        intro: typeof input.intro === "string" ? input.intro : undefined,
        questions: questions.slice(0, 4) as never,
      },
    };
  }
  return null;
}

export async function POST(req: Request) {
  const now = Date.now();

  if (!process.env.ANTHROPIC_API_KEY) return jsonError("unavailable", 503);
  if (!sameOrigin(req)) return jsonError("bad_request", 403);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("bad_request", 400);
  }

  const b = body as Record<string, unknown>;
  const locale = b.locale as Locale;
  const sessionId = b.sessionId;
  const rawMessages = b.messages;

  if (!locales.includes(locale)) return jsonError("bad_request", 400);
  if (typeof sessionId !== "string" || sessionId.length < 1 || sessionId.length > 100)
    return jsonError("bad_request", 400);
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) return jsonError("bad_request", 400);
  if (rawMessages.length > MAX_MESSAGES) return jsonError("too_long", 413);

  const messages: Anthropic.MessageParam[] = [];
  for (const m of rawMessages) {
    const role = (m as Record<string, unknown>).role;
    const content = (m as Record<string, unknown>).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string")
      return jsonError("bad_request", 400);
    if (content.length > MAX_MSG_CHARS) return jsonError("too_long", 413);
    messages.push({ role, content });
  }
  if (messages[messages.length - 1]!.role !== "user") return jsonError("bad_request", 400);

  if (!withinDailyBudget(now)) return jsonError("unavailable", 503);
  if (!checkRateLimit(getIp(req), sessionId, now)) return jsonError("rate_limited", 429);

  // Inject the per-turn locale steer into the latest user message (kept out of the cached prefix).
  const last = messages[messages.length - 1]!;
  last.content = `${localeDirective(locale)}\n${last.content as string}`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const system = buildSystem();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (e: ServerEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        // Single turn — no tool round-trip. The tools are presentational, and a
        // turn that calls a tool ends there (e.g. asking questions waits for the
        // user's answer, which arrives as the next message). Claude always emits
        // text BEFORE its tool calls within a turn, so this guarantees the model
        // never produces prose after the question card.
        const ms = client.messages.stream(
          { model: MODEL, max_tokens: MAX_TOKENS, system, tools: TOOLS, messages },
          { signal: req.signal }
        );

        // Accumulate tool-call JSON per content-block index so we can emit each
        // tool's UI event the moment its block finishes.
        const toolBufs = new Map<number, { name: string; json: string }>();
        for await (const ev of ms) {
          if (ev.type === "content_block_start" && ev.content_block.type === "tool_use") {
            toolBufs.set(ev.index, { name: ev.content_block.name, json: "" });
            emit({ t: "tool_pending", name: ev.content_block.name });
          } else if (ev.type === "content_block_delta") {
            if (ev.delta.type === "text_delta") {
              emit({ t: "text", v: ev.delta.text });
            } else if (ev.delta.type === "input_json_delta") {
              const buf = toolBufs.get(ev.index);
              if (buf) buf.json += ev.delta.partial_json;
            }
          } else if (ev.type === "content_block_stop") {
            const buf = toolBufs.get(ev.index);
            if (buf) {
              let input: Record<string, unknown> = {};
              try {
                input = buf.json ? JSON.parse(buf.json) : {};
              } catch {
                /* drop malformed tool input */
              }
              const e = toolEvent(buf.name, input);
              if (e) emit(e);
            }
          }
        }

        const final = await ms.finalMessage();
        if (process.env.NODE_ENV !== "production") {
          const u = final.usage;
          console.log(
            `[chat] usage in=${u.input_tokens} out=${u.output_tokens} cacheRead=${u.cache_read_input_tokens ?? 0} cacheWrite=${u.cache_creation_input_tokens ?? 0}`
          );
        }
        emit({ t: "done" });
      } catch (err) {
        const aborted =
          req.signal.aborted ||
          err instanceof Anthropic.APIUserAbortError ||
          (err instanceof Error && err.name === "AbortError");
        if (!aborted) {
          console.error("[chat] stream error:", err);
          emit({ t: "error", code: "server_error" });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
