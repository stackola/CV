"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { ChatDict } from "@/i18n/dictionaries/de";
import type { useChat } from "./use-chat";
import { ScorePanel } from "./score-panel";
import { MessageList } from "./message-list";

type Chat = ReturnType<typeof useChat>;

export function ChatPanel({
  chat,
  dict,
  locale,
  onClose,
}: {
  chat: Chat;
  dict: ChatDict;
  locale: Locale;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");

  // One-time consent gate: the visitor must acknowledge that messages go to
  // Anthropic (USA) before they can chat. Persisted so we don't nag returnees.
  const [consented, setConsented] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("cv-chat-consent") === "1") setConsented(true);
    } catch {
      /* ignore */
    }
  }, []);
  const accept = () => {
    setConsented(true);
    try {
      localStorage.setItem("cv-chat-consent", "1");
    } catch {
      /* ignore */
    }
  };

  const submit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || chat.streaming || !consented) return;
    setInput("");
    void chat.send(text);
  };

  const sendStarter = (text: string) => {
    if (chat.streaming || !consented) return;
    void chat.send(text);
  };

  const showStarters = consented && chat.messages.length === 0 && !chat.streaming;

  return (
    <div className="flex h-full w-full flex-col bg-[var(--color-card)] text-[var(--color-card-foreground)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-[var(--color-accent)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">{dict.title}</p>
            <p className="text-xs text-[var(--color-muted-foreground)]">{dict.subtitle}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={dict.close}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScorePanel
        state={chat.scoreState}
        dict={dict}
        updating={chat.toolPending === "update_match_score"}
      />

      <MessageList
        messages={chat.messages}
        streaming={chat.streaming}
        toolPending={chat.toolPending}
        dict={dict}
        onAnswer={chat.answerCard}
      />

      {chat.error && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-2 text-xs text-[var(--color-accent)]">
          {dict.errors[chat.error] ?? dict.errors.server_error}
        </div>
      )}

      {/* Consent gate — shown until the visitor acknowledges */}
      {!consented && (
        <div className="border-t border-[var(--color-border)] px-3 pt-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-3 text-xs leading-snug text-[var(--color-muted-foreground)]">
            <p>
              {dict.consentText}{" "}
              <Link
                href={`/${locale}/datenschutz`}
                className="underline underline-offset-2 hover:text-[var(--color-foreground)]"
              >
                {dict.privacy}
              </Link>
            </p>
            <div className="mt-2 flex justify-end">
              <Button type="button" size="sm" variant="accent" onClick={accept}>
                {dict.consentAccept}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Starter suggestions (empty state only) */}
      {showStarters && (
        <div className="flex flex-wrap gap-2 border-t border-[var(--color-border)] px-3 pt-3">
          {dict.starters.map((s) => (
            <Button
              key={s}
              type="button"
              size="sm"
              variant="outline"
              onClick={() => sendStarter(s)}
              className="h-auto whitespace-normal py-1.5 text-left text-xs"
            >
              {s}
            </Button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form onSubmit={submit} className={cn("p-3", !showStarters && "border-t border-[var(--color-border)]")}>
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            maxLength={2000}
            enterKeyHint="send"
            disabled={chat.streaming || !consented}
            placeholder={chat.streaming ? dict.thinking : dict.placeholder}
            className="max-h-28 min-h-9 flex-1 resize-none rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:opacity-60"
          />
          <Button type="submit" size="icon" variant="accent" disabled={!input.trim() || chat.streaming || !consented} aria-label={dict.send}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-[10px] leading-snug text-[var(--color-muted-foreground)]">
          {dict.disclaimer}{" "}
          <Link
            href={`/${locale}/datenschutz`}
            className="underline underline-offset-2 hover:text-[var(--color-foreground)]"
          >
            {dict.privacy}
          </Link>
        </p>
      </form>
    </div>
  );
}
