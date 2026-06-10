import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowDown, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProject, projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { richContent } from "@/components/project-content";
import { cn } from "@/lib/utils";
import { alternates } from "@/lib/seo";

const NARRATIVE_ONLY_SLUGS = new Set(["lemonverse", "opox"]);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary[locale as Locale],
    alternates: alternates(locale as Locale, `/projects/${slug}`),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const project = getProject(slug);
  if (!project) notFound();
  const dict = getDictionary(locale);
  const RichBody = richContent[project.slug];
  const showFold = !NARRATIVE_ONLY_SLUGS.has(project.slug) && !!RichBody;

  return (
    <article>
      <div className="mx-auto max-w-4xl px-6 pt-12">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.projects.back}
        </Link>
      </div>

      <header className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            {project.title}
          </h1>
          {project.wip && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-foreground)]">
              {dict.projects.wip}
            </span>
          )}
          {project.studie && (
            <span className="inline-flex items-center rounded-full border border-[var(--color-accent)]/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
              {dict.projects.studie}
            </span>
          )}
        </div>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted-foreground)]">
          {project.summary[locale]}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button variant="accent">
                <ExternalLink className="h-4 w-4" />
                {dict.projects.viewLive}
              </Button>
            </a>
          )}
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button variant="outline">
                <Github className="h-4 w-4" />
                {dict.projects.viewRepo}
              </Button>
            </a>
          )}
          {project.extraLinks?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm transition-colors hover:bg-[var(--color-muted)]"
            >
              {l.label[locale]}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
          {showFold && (
            <a
              href="#technical"
              className="ml-auto inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-accent)]"
            >
              <ArrowDown className="h-3.5 w-3.5" />
              {dict.projects.jumpToTechnical}
            </a>
          )}
        </div>

        {project.links?.repo && (
          <p className="mt-4 text-xs text-[var(--color-muted-foreground)]">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 hover:text-[var(--color-accent)]"
            >
              <Github className="h-3 w-3" />
              {project.links.repo.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
      </header>

      <div className="mx-auto max-w-4xl px-6">
        {project.video ? (
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black">
            <video
              className="block w-full"
              src={project.video}
              controls
              preload="metadata"
              playsInline
              muted
            />
          </div>
        ) : project.screen ? (
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)]">
            <Image
              src={project.screen}
              alt={project.title}
              width={1600}
              height={900}
              sizes="(min-width: 896px) 832px, 100vw"
              className="block h-auto w-full"
              priority
            />
          </div>
        ) : (
          <div
            className={cn(
              "relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br",
              project.accent
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)] opacity-20 dark:opacity-10" />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/30 px-3 py-1 text-xs uppercase tracking-widest text-white backdrop-blur-md">
              {project.year}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-lg leading-relaxed text-[var(--color-foreground)] md:text-xl">
          {project.description[locale]}
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6 -mt-8 pb-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--color-border)]/60 pt-6 text-sm text-[var(--color-muted-foreground)]">
          <span>
            <span className="uppercase tracking-widest text-[10px] text-[var(--color-muted-foreground)]/70 mr-2">
              {dict.projects.year}
            </span>
            {project.year}
          </span>
          {project.client && (
            <>
              <span aria-hidden className="text-[var(--color-muted-foreground)]/40">·</span>
              <span>
                <span className="uppercase tracking-widest text-[10px] text-[var(--color-muted-foreground)]/70 mr-2">
                  {dict.projects.client}
                </span>
                {project.client}
              </span>
            </>
          )}
          <span aria-hidden className="text-[var(--color-muted-foreground)]/40">·</span>
          <span>
            <span className="uppercase tracking-widest text-[10px] text-[var(--color-muted-foreground)]/70 mr-2">
              {dict.projects.role}
            </span>
            {project.role[locale]}
          </span>
        </div>
      </div>

      {project.keyDecision && (
        <div className="mx-auto max-w-4xl px-6 pb-16">
          <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {dict.projects.keyDecision}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-foreground)] md:text-lg">
              {project.keyDecision[locale]}
            </p>
          </div>
        </div>
      )}

      {showFold && (
        <FoldDivider
          eyebrow={dict.projects.technicalDeepDive}
          lead={dict.projects.technicalDeepDiveLead}
        />
      )}

      {(showFold || !RichBody) && (
        <TechGroupsBlock project={project} locale={locale} dict={dict} />
      )}

      {RichBody && (
        <div className="mx-auto max-w-4xl px-6 pb-24">
          <RichBody locale={locale} />
        </div>
      )}
    </article>
  );
}

function FoldDivider({ eyebrow, lead }: { eyebrow: string; lead: string }) {
  return (
    <section id="technical" className="mx-auto max-w-4xl px-6 py-16">
      <div className="border-t border-[var(--color-border)]/60" />
      <div className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          {eyebrow}
        </p>
        <p className="mt-3 text-base text-[var(--color-muted-foreground)]">
          {lead}
        </p>
      </div>
      <div className="mt-12 border-b border-[var(--color-border)]/60" />
    </section>
  );
}

function TechGroupsBlock({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
}) {
  if (project.techGroups && project.techGroups.length > 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 pb-12">
        <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
          {dict.projects.tech}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.techGroups.map((g) => (
            <div
              key={g.label.en}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
            >
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {g.label[locale]}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pb-12">
      <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
        {dict.projects.tech}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </div>
  );
}
