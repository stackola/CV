import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/data/projects";
import { getDictionary } from "@/i18n/get-dictionary";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  locale,
  className,
}: {
  project: Project;
  locale: Locale;
  className?: string;
}) {
  const dict = getDictionary(locale);
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
          project.accent
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)] opacity-20 dark:opacity-10" />
        )}
        {project.studie && (
          <div className="absolute inset-x-0 top-0 flex justify-start p-5">
            <span className="rounded-full border border-white/40 bg-black/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-md">
              {dict.projects.studie}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex justify-end p-5">
          {project.wip && (
            <span className="rounded-full bg-[var(--color-accent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-accent-foreground)] shadow-md">
              {dict.projects.wip}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <span className="rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-md">
            {project.year}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold leading-tight tracking-tight">
            {project.title}
          </h3>
          {project.client && (
            <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
              {project.client}
            </p>
          )}
        </div>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {project.summary[locale]}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
