import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { clientWork, ownWork } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { alternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.projects.title,
    alternates: alternates(locale as Locale, "/projects"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {dict.projects.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted-foreground)]">
          {dict.projects.subtitle}
        </p>

        {clientWork.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {dict.projects.clientHeading}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {clientWork.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {ownWork.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {dict.projects.ownHeading}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ownWork.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
