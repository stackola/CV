"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ChatDict } from "@/i18n/dictionaries/de";
import type { QuestionCard as Card, Question, AnswerPair } from "@/lib/chat/protocol";
import { cn } from "@/lib/utils";

type Answers = Record<string, string | string[]>;

const isFilled = (q: Question, a: Answers) => {
  const v = a[q.id];
  return Array.isArray(v) ? v.length > 0 : typeof v === "string" && v.trim().length > 0;
};

export function QuestionCard({
  card,
  answered,
  summary,
  dict,
  onAnswer,
}: {
  card: Card;
  answered: boolean;
  summary?: AnswerPair[];
  dict: ChatDict;
  onAnswer: (text: string, summary: AnswerPair[]) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const total = card.questions.length;
  const q = card.questions[step]!;
  const isLast = step === total - 1;

  // Keep the active question + its nav in view when stepping, without yanking the
  // whole conversation around ("nearest" only scrolls if something is off-screen).
  useEffect(() => {
    if (answered) return;
    bottomRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (q.kind === "text") inputRef.current?.focus({ preventScroll: true });
  }, [step, answered, q.kind]);

  const goNext = () => setStep((s) => Math.min(total - 1, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const pickSingle = (opt: string) => {
    setAnswers((p) => ({ ...p, [q.id]: opt }));
    if (!isLast) window.setTimeout(goNext, 160); // guided auto-advance
  };

  const toggleMulti = (opt: string) => {
    setAnswers((p) => {
      const cur = Array.isArray(p[q.id]) ? (p[q.id] as string[]) : [];
      return { ...p, [q.id]: cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt] };
    });
  };

  const submit = () => {
    const pairs: AnswerPair[] = card.questions
      .map((qq) => {
        const v = answers[qq.id];
        const a = Array.isArray(v) ? v.join(", ") : (v as string)?.trim();
        return a ? { q: qq.text, a } : null;
      })
      .filter((p): p is AnswerPair => p !== null);
    if (!pairs.length) return;
    const text = pairs.map((p) => `${p.q} → ${p.a}`).join("\n");
    onAnswer(text, pairs);
  };

  // ---- Submitted summary view (renders from durable message data, not local state) ----
  if (answered) {
    const pairs = summary ?? [];
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm opacity-80">
        <ul className="space-y-1.5">
          {pairs.map((p, i) => (
            <li key={i} className="text-xs leading-snug">
              <span className="text-[var(--color-muted-foreground)]">{p.q}</span>
              <br />
              <span className="font-medium text-[var(--color-foreground)]">{p.a}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // ---- Active wizard view ----
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm">
      {card.intro && step === 0 && (
        <p className="mb-2 text-[var(--color-foreground)]">{card.intro}</p>
      )}

      {/* Progress */}
      <div className="mb-2 flex items-center gap-1">
        {card.questions.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < step
                ? "bg-[var(--color-accent)]"
                : i === step
                  ? "bg-[var(--color-accent)]/60"
                  : "bg-[var(--color-muted)]"
            )}
          />
        ))}
      </div>
      <p className="mb-1 text-[10px] uppercase tracking-wide text-[var(--color-muted-foreground)]">
        {step + 1} / {total}
      </p>

      <p className="mb-2 font-medium text-[var(--color-foreground)]">{q.text}</p>

      {q.kind === "text" ? (
        <input
          ref={inputRef}
          type="text"
          value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : ""}
          onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isFilled(q, answers)) {
              e.preventDefault();
              isLast ? submit() : goNext();
            }
          }}
          placeholder={dict.textPlaceholder}
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1.5 text-sm text-[var(--color-foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        />
      ) : (
        <div className="flex flex-col gap-1.5">
          {(q.options ?? []).map((opt) => {
            const isMulti = q.kind === "multi";
            const selected = isMulti
              ? Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)
              : answers[q.id] === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={selected}
                onClick={() => (isMulti ? toggleMulti(opt) : pickSingle(opt))}
                className={cn(
                  "flex w-full items-center gap-2.5 border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                  // round buttons = single-select, squarish = multi-select
                  isMulti ? "rounded-md" : "rounded-full",
                  selected
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                    : "border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-muted)]"
                )}
              >
                {/* Fixed-size indicator (radio vs checkbox) — never changes width, so no layout jump */}
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center border-2 transition-colors",
                    isMulti ? "rounded-[4px]" : "rounded-full",
                    selected ? "border-[var(--color-accent)]" : "border-[var(--color-muted-foreground)]"
                  )}
                >
                  {selected &&
                    (isMulti ? (
                      <Check className="h-3 w-3 text-[var(--color-accent)]" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                    ))}
                </span>
                <span className="flex-1 leading-snug text-[var(--color-foreground)]">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-3 flex items-center justify-between">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={goBack}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {dict.back}
        </Button>

        {isLast ? (
          <Button type="button" size="sm" variant="accent" onClick={submit} disabled={!isFilled(q, answers)}>
            <Check className="h-3.5 w-3.5" />
            {dict.submit}
          </Button>
        ) : (
          <Button type="button" size="sm" variant="accent" onClick={goNext} disabled={!isFilled(q, answers)}>
            {dict.next}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
