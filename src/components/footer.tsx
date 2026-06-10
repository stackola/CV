import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { personalInfo } from "@/data/cv";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold tracking-tight">
              {personalInfo.name}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              {personalInfo.role[locale]} · {personalInfo.location}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={`/${locale}/projects`}
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              {dict.nav.work}
            </Link>
            <Link
              href={`/${locale}/cv`}
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              {dict.nav.cv}
            </Link>
            <a
              href="https://github.com/stackola"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              GitHub
            </a>
            <Link
              href={`/${locale}/datenschutz`}
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              {dict.nav.privacy}
            </Link>
            <Link
              href={`/${locale}/impressum`}
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              {dict.nav.imprint}
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted-foreground)] md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}.{" "}
            {dict.footer.rights}
          </p>
          <p>
            {dict.footer.built}{" "}
            <a
              href="https://github.com/stackola/CV"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[var(--color-foreground)]"
            >
              {dict.footer.source}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
