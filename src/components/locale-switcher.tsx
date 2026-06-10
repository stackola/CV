"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  const swap = (to: Locale) => {
    if (!pathname) return `/${to}`;
    const parts = pathname.split("/");
    if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
      parts[1] = to;
      return parts.join("/") || `/${to}`;
    }
    return `/${to}${pathname}`;
  };

  return (
    <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">
      {locales.map((loc, i) => (
        <React.Fragment key={loc}>
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            href={swap(loc)}
            aria-current={current === loc ? "true" : undefined}
            className={cn(
              "rounded px-1.5 py-1 transition-colors hover:text-[var(--color-foreground)]",
              current === loc && "text-[var(--color-foreground)]"
            )}
          >
            {loc}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
