import type { Locale } from "@/i18n/config";
import { PagebeeContent } from "./pagebee";
import { DronesContent } from "./drones";
import { LemonverseContent } from "./lemonverse";
import { OpoxContent } from "./opox";

export const richContent: Record<
  string,
  React.ComponentType<{ locale: Locale }>
> = {
  pagebee: PagebeeContent,
  drones: DronesContent,
  lemonverse: LemonverseContent,
  opox: OpoxContent,
};
