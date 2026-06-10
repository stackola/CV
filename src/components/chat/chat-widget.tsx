"use client";

import { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { ChatDict } from "@/i18n/dictionaries/de";
import { cn } from "@/lib/utils";
import { useChat } from "./use-chat";
import { ChatPanel } from "./chat-panel";

const STORAGE_KEY = "cv-chat-dismissed";

export function ChatWidget({ locale, dict }: { locale: Locale; dict: ChatDict }) {
  // Start closed (SSR-safe). On desktop we auto-open it as a highlight; on mobile it
  // stays closed behind a prominent launcher so it never takes over the screen.
  const [open, setOpen] = useState(false);
  const chat = useChat(locale);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return; // already dismissed this session
    } catch {
      /* ignore */
    }
    if (window.matchMedia("(min-width: 640px)").matches) setOpen(true);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* Panel — desktop: anchored card bottom-right; mobile: bottom sheet */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out",
          "inset-x-0 bottom-0 h-[85dvh]",
          "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[640px] sm:max-h-[calc(100dvh-3rem)] sm:w-[420px]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="h-full w-full overflow-hidden rounded-t-2xl shadow-2xl ring-1 ring-[var(--color-accent)]/25 sm:rounded-2xl">
          <ChatPanel chat={chat} dict={dict} locale={locale} onClose={close} />
        </div>
      </div>

      {/* Launcher — only when closed */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.launcher}
        className={cn(
          "group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--color-accent)] py-3 pl-4 pr-5 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
          open && "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        {/* Attention pulse */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--color-accent)] opacity-20 [animation-duration:2.5s]" />
        <Bot className="h-5 w-5" />
        {dict.launcher}
      </button>
    </>
  );
}
