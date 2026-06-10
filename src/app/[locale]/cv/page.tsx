import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  driving,
  education,
  experience,
  languages,
  misc,
  personalInfo,
  pick,
  skills,
} from "@/data/cv";
import { experience as experienceEntries } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.cv.title,
    alternates: alternates(locale as Locale, "/cv"),
  };
}

export default async function CVPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <section>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {dict.cv.title}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-[var(--color-muted-foreground)]">
            {dict.cv.subtitle}
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
            {personalInfo.role[locale]}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {personalInfo.name}
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
            {personalInfo.location}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 text-sm">
            <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" />
            {dict.cv.availability}
          </p>
          <div className="mt-6">
            <a href="/Lebenslauf-Willi-Krappen.pdf" download>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                {dict.cv.download}
              </Button>
            </a>
          </div>
        </div>

        <Section title={dict.cv.education}>
          {education.map((row, idx) => (
            <TimelineRow
              key={idx}
              period={row.period}
              title={pick(row.title, locale)}
              detail={row.detail ? pick(row.detail, locale) : undefined}
              clientsLabel={dict.cv.clientsLabel}
            />
          ))}
        </Section>

        <Section title={dict.cv.experience}>
          {experience.map((row, idx) => (
            <TimelineRow
              key={idx}
              period={row.period}
              title={pick(row.title, locale)}
              detail={row.detail ? pick(row.detail, locale) : undefined}
              clients={row.clients}
              clientsLabel={dict.cv.clientsLabel}
            />
          ))}
        </Section>

        <Section title={dict.experience.title}>
          <p className="-mt-2 mb-6 max-w-2xl text-sm text-[var(--color-muted-foreground)]">
            {dict.experience.subtitle}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {experienceEntries.map((e) => (
              <Link
                key={e.slug}
                href={`/${locale}/projects/${e.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                    {e.year}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-[var(--color-muted-foreground)] transition-transform group-hover:rotate-45 group-hover:text-[var(--color-foreground)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    {e.role[locale]}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {e.summary[locale]}
                </p>
                {e.client && (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    <Badge>{e.client}</Badge>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </Section>

        <Section title={dict.cv.skills}>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <SkillGroup title={dict.skills.core} items={skills.core} />
            <SkillGroup title={dict.skills.working} items={skills.working} />
            <SkillGroup title={dict.skills.familiar} items={skills.familiar} />
          </div>
        </Section>

        <Section title={dict.cv.other}>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {dict.cv.languages}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {languages.map((l) => (
                  <li key={l.name.en} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
                    <span>{pick(l.name, locale)}</span>
                    <span className="text-[var(--color-muted-foreground)]">
                      {pick(l.level, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {dict.cv.driving}
              </p>
              <p className="mt-4 text-sm">{pick(driving, locale)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {dict.cv.misc}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {misc.map((m) => (
                  <Badge key={m.en}>{pick(m, locale)}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        {title}
      </h2>
      <div className="mt-6 border-t border-[var(--color-border)] pt-6">
        {children}
      </div>
    </section>
  );
}

function TimelineRow({
  period,
  title,
  detail,
  clients,
  clientsLabel,
}: {
  period: string;
  title: string;
  detail?: string;
  clients?: string[];
  clientsLabel: string;
}) {
  return (
    <div className="grid gap-2 border-b border-[var(--color-border)] py-5 last:border-b-0 md:grid-cols-[120px_1fr] md:gap-8">
      <p className="text-sm text-[var(--color-muted-foreground)]">{period}</p>
      <div>
        <p className="font-medium">{title}</p>
        {detail && (
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            {detail}
          </p>
        )}
        {clients && (
          <>
            <p className="mt-3 text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
              {clientsLabel}
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {clients.map((c) => (
                <li key={c}>
                  <Badge>{c}</Badge>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function SkillGroup({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
        {title}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
