"use client";

import { useEffect, useRef, useState } from "react";
import { DIMENSIONS, WEIGHTS } from "@/lib/chat/protocol";
import type { ChatDict } from "@/i18n/dictionaries/de";
import type { ScoreState } from "./use-chat";
import { cn } from "@/lib/utils";

/** Smoothly animates a number toward its target (count-up) when it changes. */
function useCountUp(target: number | null) {
  const [val, setVal] = useState(target ?? 0);
  const fromRef = useRef(target ?? 0);
  useEffect(() => {
    if (target === null) return;
    const from = fromRef.current;
    if (from === target) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 600;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) * (1 - t); // ease-out
      const cur = Math.round(from + (target - from) * eased);
      setVal(cur);
      if (t < 1) raf = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return target === null ? null : val;
}

export function ScorePanel({
  state,
  dict,
  updating,
}: {
  state: ScoreState;
  dict: ChatDict;
  updating?: boolean;
}) {
  const known = DIMENSIONS.filter((d) => typeof state.scores[d] === "number");
  const overallPct = known.length
    ? Math.round(
        (known.reduce((sum, d) => sum + state.scores[d]! * WEIGHTS[d], 0) /
          known.reduce((sum, d) => sum + WEIGHTS[d], 0)) *
          10
      )
    : null;
  const animatedPct = useCountUp(overallPct);

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-muted)]/40 px-4 py-3">
      <div className="flex items-baseline justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
          {dict.matchScore}
          {updating && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
          )}
        </span>
        <span
          className={cn(
            "text-sm font-semibold tabular-nums transition-colors",
            animatedPct === null ? "text-[var(--color-muted-foreground)]" : "text-[var(--color-accent)]"
          )}
        >
          {animatedPct === null ? "-" : `${animatedPct}%`}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
        {DIMENSIONS.map((d) => {
          const score = state.scores[d];
          const has = typeof score === "number";
          return (
            <div key={d} title={state.rationale[d]}>
              <div className="flex items-center justify-between text-[11px] leading-tight">
                <span className="truncate text-[var(--color-muted-foreground)]">{dict.dimensions[d]}</span>
                <span
                  className={cn(
                    "ml-1 shrink-0 tabular-nums",
                    has ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]"
                  )}
                >
                  {has ? `${score}/10` : "-"}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-muted)]">
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-700 ease-out"
                  style={{ width: has ? `${score! * 10}%` : "0%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
