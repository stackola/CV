import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "@/components/nav-link";
import { MobileMenu } from "@/components/mobile-menu";

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = [
    { href: `/${locale}/projects`, label: dict.nav.work },
    { href: `/${locale}/cv`, label: dict.nav.cv },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] transition-transform group-hover:scale-110" />
          Willi Krappen
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} />
          <ThemeToggle />
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}
