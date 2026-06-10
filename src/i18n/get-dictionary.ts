import { de } from "./dictionaries/de";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

const dictionaries = { de, en } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
