import type { Locale } from "@/i18n/config";

type ClientCard = {
  name: string;
  segment: Record<Locale, string>;
  what: Record<Locale, string>;
};

const clients: ClientCard[] = [
  {
    name: "Stadt Dresden",
    segment: { de: "Öffentliche Hand", en: "Public sector" },
    what: {
      de: "Frontend-Arbeit an Web-Anwendungen für die Stadt Dresden, mit den entsprechenden Anforderungen an Barrierefreiheit, Datenschutz und Browser-Reichweite.",
      en: "Frontend work on web applications for the City of Dresden, with the corresponding requirements around accessibility, data protection and browser reach.",
    },
  },
  {
    name: "BOSCH",
    segment: { de: "Industrie / Enterprise", en: "Industry / enterprise" },
    what: {
      de: "Frontend-Beiträge zu BOSCH-Projekten innerhalb eines gemischten Agentur-Teams: Komponenten, Integrationen, Stakeholder-Übergaben in Scrum-Cadences.",
      en: "Frontend contributions to BOSCH projects within a mixed agency team: components, integrations, stakeholder handoffs on Scrum cadences.",
    },
  },
];

const featuredProject: Record<Locale, { title: string; body: string }> = {
  de: {
    title: "Schichtplanung für einen Industriekunden",
    body: "Das System weist Beschäftigte intelligent Arbeitsplätzen zu und levelt Qualifikationen automatisch aus der Einsatz-Historie. Wer einen Arbeitsplatz oft genug besetzt hat, gilt als qualifiziert; wer wenig Erfahrung mitbringt, wird gezielt mit erfahrener Begleitung eingeplant. Umgesetzt in React/TypeScript, im gemischten Projektteam in Scrum-Zyklen.",
  },
  en: {
    title: "Shift planning for an industrial client",
    body: "The system assigns workers to workplaces intelligently and levels qualifications automatically from deployment history. Whoever has staffed a workplace often enough counts as qualified; whoever has little experience gets scheduled alongside experienced guidance. Built in React/TypeScript, in a mixed project team on Scrum cycles.",
  },
};

const focusAreas: Record<Locale, { title: string; body: string }[]> = {
  de: [
    {
      title: "Produktions-Anwendungen mit React + TypeScript",
      body: "Komponenten, State-Management, Routing, API-Integration. Code, der mehrere Releases übersteht und mehrere Kunden-Iterationen ohne Neuschreibung mitmacht.",
    },
    {
      title: "Accessibility & Performance",
      body: "Für Public-Sector-Kunden waren WCAG-Konformität und schnelle Initial-Loads keine Kür, sondern Akzeptanz-Kriterium für die Abnahme.",
    },
    {
      title: "Arbeit im Agentur-Setup",
      body: "Gemischte Teams aus Design, Backend-Entwicklung und Projektleitung. Enge Iteration mit Kunden-Stakeholdern, Übergaben in Sprint-Reviews, Code-Reviews quer durch das Team.",
    },
    {
      title: "Build-Pipelines & Deployment",
      body: "Webpack-basierte Setups, CI/CD-Integration, Übergaben in Staging- und Production-Stages mit Branch-Workflows.",
    },
  ],
  en: [
    {
      title: "Production applications with React + TypeScript",
      body: "Components, state management, routing, API integration. Code that survives multiple releases and multiple client iterations without rewrites.",
    },
    {
      title: "Accessibility & performance",
      body: "For public-sector clients WCAG conformance and fast initial loads weren't a nice-to-have; they were an acceptance criterion for delivery.",
    },
    {
      title: "Work in an agency setting",
      body: "Mixed teams of designers, backend engineers and project leads. Tight iteration with client stakeholders, sprint-review handoffs, code review across the team.",
    },
    {
      title: "Build pipelines & deployment",
      body: "Webpack-based setups, CI/CD integration, handoffs into staging and production stages with branch-based workflows.",
    },
  ],
};

const takeaways: Record<Locale, string[]> = {
  de: [
    "Drei Jahre direkte Erfahrung mit Enterprise-Anwendungen in Scrum-Teams, von Konzept bis Production.",
    "Kunden-Stakeholder-Kommunikation im Sprint-Rhythmus, inklusive Review-Meetings und Demos.",
    "Erste fundierte Praxis in modernem TypeScript / React-Stack, die später Lemonverse und die eigenen Produkte trägt.",
    "Verständnis dafür, dass die Wartbarkeit eines Frontends mehr zählt als die Attraktivität des nächsten Frameworks.",
  ],
  en: [
    "Three years of hands-on experience with enterprise applications in Scrum teams, from concept to production.",
    "Client-stakeholder communication on sprint cadences, including review meetings and demos.",
    "First in-depth practice with modern TypeScript / React, which later carries Lemonverse and the personal products.",
    "Understanding that frontend maintainability matters more than the coolness of the next framework.",
  ],
};

const labels = {
  de: {
    contextTitle: "Kontext",
    contextBody:
      "Station zwischen Studium und Lemonverse-Mitgründung: Festanstellung als Frontend-Entwickler bei der OPOX GmbH, vor dem heutigen Produkt-Engineering-Fokus.",
    featureTitle: "Schwerpunkt-Projekt",
    clientsTitle: "Kunden (Auswahl)",
    clientsLead:
      "Das Kundenspektrum reichte von öffentlicher Hand über Industrie bis zum Mittelstand. Sichtbar herausstechen, und damit auch hier nennbar, sind:",
    focusTitle: "Schwerpunkte",
    takeawaysTitle: "Was bleibt",
    privacyTitle: "Hinweis",
    privacyBody:
      "Konkrete Projekt-Outputs gehören den jeweiligen Auftraggebern. Details zu einzelnen Anwendungen unterliegen den entsprechenden Vereinbarungen und werden hier nicht öffentlich aufgeschlüsselt. Auf Anfrage gerne mündlich.",
  },
  en: {
    contextTitle: "Context",
    contextBody:
      "The station between university and co-founding Lemonverse: full-time employment as a frontend developer at OPOX GmbH, before the current product-engineering focus.",
    featureTitle: "Main project",
    clientsTitle: "Clients (selection)",
    clientsLead:
      "The client base ranged from public sector through industry to mid-market. The ones visibly recognisable, and so listable here, are:",
    focusTitle: "Focus areas",
    takeawaysTitle: "What stuck",
    privacyTitle: "Note",
    privacyBody:
      "Concrete project outputs belong to the respective clients. Details on individual applications are subject to the relevant agreements and are not broken down publicly here. Happy to walk through specifics on request.",
  },
};

export function OpoxContent({ locale }: { locale: Locale }) {
  const l = labels[locale];

  return (
    <div className="space-y-20">
      <Section title={l.contextTitle}>
        <p className="text-base leading-relaxed text-[var(--color-muted-foreground)]">
          {l.contextBody}
        </p>
      </Section>

      <Section title={l.featureTitle}>
        <NoteCard
          title={featuredProject[locale].title}
          body={featuredProject[locale].body}
        />
      </Section>

      <Section title={l.clientsTitle} lead={l.clientsLead}>
        <div className="grid gap-4 md:grid-cols-2">
          {clients.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
            >
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {c.segment[locale]}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                {c.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {c.what[locale]}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={l.focusTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {focusAreas[locale].map((item) => (
            <NoteCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>

      <Section title={l.takeawaysTitle}>
        <ul className="space-y-2">
          {takeaways[locale].map((line, idx) => (
            <li
              key={idx}
              className="flex gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-sm"
            >
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={l.privacyTitle}>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {l.privacyBody}
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        {title}
      </h2>
      {lead && (
        <p className="mt-3 max-w-2xl text-base text-[var(--color-muted-foreground)]">
          {lead}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function NoteCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        {body}
      </p>
    </div>
  );
}
