import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { projects } from "@/data/projects";

const BASE = "https://prototyp.ms";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/cv",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}${path}`])
        ),
      },
    }))
  );
}
