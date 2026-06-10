/**
 * In-memory fixed-window rate limiter + daily budget kill-switch.
 *
 * Per-process state (module-scoped Maps). This is sufficient for a single
 * long-lived instance under PM2. For a multi-instance deployment, swap the
 * Maps for Redis (BullMQ/Redis is already in the stack) — the function
 * signatures can stay the same.
 */

type Window = { count: number; resetAt: number };

const ipWindows = new Map<string, Window>();
const sessionWindows = new Map<string, Window>();

// Daily budget kill-switch (resets on a rolling 24h window).
let dailyCount = 0;
let dailyResetAt = 0;

const LIMITS = {
  ipPerWindow: 25,
  ipWindowMs: 10 * 60_000, // 10 min
  sessionPerWindow: 40,
  sessionWindowMs: 60 * 60_000, // 1 h
  dailyMax: 1500, // global messages/day before the kill-switch trips
  dailyWindowMs: 24 * 60 * 60_000,
};

function hit(map: Map<string, Window>, key: string, limit: number, windowMs: number, now: number): boolean {
  const w = map.get(key);
  if (!w || now >= w.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (w.count >= limit) return false;
  w.count += 1;
  return true;
}

/** Returns true if the global daily budget still has room (and consumes one). */
export function withinDailyBudget(now: number): boolean {
  if (now >= dailyResetAt) {
    dailyCount = 0;
    dailyResetAt = now + LIMITS.dailyWindowMs;
  }
  if (dailyCount >= LIMITS.dailyMax) return false;
  dailyCount += 1;
  return true;
}

/** Returns true if this request is allowed under per-IP and per-session limits. */
export function checkRateLimit(ip: string, sessionId: string, now: number): boolean {
  const okIp = hit(ipWindows, ip, LIMITS.ipPerWindow, LIMITS.ipWindowMs, now);
  if (!okIp) return false;
  const okSession = hit(sessionWindows, sessionId, LIMITS.sessionPerWindow, LIMITS.sessionWindowMs, now);
  return okSession;
}
