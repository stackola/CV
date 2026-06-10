import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

const BASE = "https://prototyp.ms";

/**
 * Per-page canonical + hreflang alternates.
 * `path` is the locale-independent path, e.g. "" (home), "/cv", "/projects/pagebee".
 */
export function alternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(
      locales.map((l) => [l, `${BASE}/${l}${path}`])
    ),
  };
}
