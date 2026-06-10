import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { clientWork, ownWork } from "@/data/projects";
import { experience as cvExperience, skills } from "@/data/cv";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { alternates } from "@/lib/seo";

const HIGHLIGHT_CLIENTS = [
  "BOSCH",
  "Stadt Dresden",
  "Lemonverse GmbH",
  "OPOX GmbH",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale as Locale) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const freelanceClients = cvExperience.flatMap((e) => e.clients ?? []);
  const clientNames = Array.from(
    new Set([...HIGHLIGHT_CLIENTS, ...freelanceClients]),
  );

  return (
    <>
      <section className="relative border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-36">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-sm text-[var(--color-foreground)]">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-emerald-500"
            />
            {dict.hero.availability}
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-[var(--color-muted-foreground)]">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[var(--color-muted-foreground)] sm:text-lg md:text-xl">
            {dict.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/${locale}/projects`}>
              <Button variant="accent" size="lg">
                {dict.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${locale}/cv`}>
              <Button variant="outline" size="lg">
                {dict.hero.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {dict.track.eyebrow}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-foreground)]">
                {clientNames.join(" · ")}
              </p>
            </div>
            <Link
              href={`/${locale}/cv`}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)]"
            >
              {dict.track.cvLink}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {dict.featured.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {dict.featured.title}
              </h2>
            </div>
            <Link
              href={`/${locale}/projects`}
              className="hidden items-center gap-1 text-sm font-medium hover:text-[var(--color-accent)] md:inline-flex"
            >
              {dict.featured.viewAll}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {ownWork.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                {dict.projects.ownHeading}
              </h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ownWork.map((p) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} />
                ))}
              </div>
            </div>
          )}

          {clientWork.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                {dict.projects.clientHeading}
              </h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {clientWork.map((p) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 md:hidden">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--color-accent)]"
            >
              {dict.featured.viewAll}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]/30">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {dict.skills.title}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-10">
            <SkillBlock title={dict.skills.core} items={skills.core} />
            <SkillBlock title={dict.skills.working} items={skills.working} />
            <SkillBlock title={dict.skills.familiar} items={skills.familiar} />
          </div>
        </div>
      </section>
    </>
  );
}

function SkillBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
        {title}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}
