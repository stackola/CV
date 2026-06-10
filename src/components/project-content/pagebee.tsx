import type { Locale } from "@/i18n/config";
import { Badge } from "@/components/ui/badge";

type Tool = {
  name: string;
  desc: Record<Locale, string>;
};

const tools: Tool[] = [
  {
    name: "list_project_files",
    desc: {
      de: "Listet Dateien des Projekts, optional mit Glob-Filter.",
      en: "Lists project files, optionally filtered by glob.",
    },
  },
  {
    name: "search_files",
    desc: {
      de: "Volltextsuche durch das Tenant-Repo.",
      en: "Full-text search through the tenant repo.",
    },
  },
  {
    name: "read_project_file",
    desc: {
      de: "Liest eine Datei relativ zum Project-Root.",
      en: "Reads a file relative to project root.",
    },
  },
  {
    name: "edit_file",
    desc: {
      de: "Gezielte String-Ersetzung in einer existierenden Datei.",
      en: "Targeted string replacement in an existing file.",
    },
  },
  {
    name: "write_project_file",
    desc: {
      de: "Schreibt eine Datei (neu oder überschreiben).",
      en: "Writes a file (new or overwrite).",
    },
  },
  {
    name: "delete_project_file",
    desc: {
      de: "Löscht eine Datei aus dem Repo.",
      en: "Deletes a file from the repo.",
    },
  },
  {
    name: "summarize_project_changes",
    desc: {
      de: "Aggregierter Diff: geänderte Dateien, +/-Zeilen.",
      en: "Aggregated diff: changed files, +/- lines.",
    },
  },
  {
    name: "finalize_edit_with_commit",
    desc: {
      de: "Schließt die Session: validiert Komplexitätsregeln, committet, deployt die Vorschau.",
      en: "Closes the session: validates complexity rules, commits, deploys preview.",
    },
  },
];

const flowSteps: Record<Locale, string[]> = {
  de: [
    "Im Editor-Chat landet der Auftrag: 'tausch das Hero-Foto und ändere die Öffnungszeiten auf 8-18'.",
    "Edit-Request landet in der Postgres-Queue mit Status PENDING → RUNNING.",
    "Orchestrator initialisiert eine Session mit Site-Kontext, Plan-Regeln und Tool-Set.",
    "Tool-Loop: AI exploriert das Repo, liest Content-Dateien, editiert gezielt. Live-Events fließen per WebSocket in die UI.",
    "AI ruft finalize_edit_with_commit; Komplexitätsregeln werden gegen den Plan validiert.",
    "Bei OK: Commit auf Draft-Branch, Netlify-Preview, Revision-Record erstellt.",
    "Preview prüfen, Deploy drücken → Push auf main, Netlify-Production-Build.",
  ],
  en: [
    "Owner writes in the editor: 'swap the hero photo and change opening hours to 8-18'.",
    "Edit request lands in the Postgres queue with status PENDING → RUNNING.",
    "Orchestrator initialises a session with site context, plan rules and tool set.",
    "Tool loop: AI explores the repo, reads content files, edits surgically. Live events stream to the UI over WebSocket.",
    "AI calls finalize_edit_with_commit; complexity rules are validated against the plan.",
    "If OK: commit to a draft branch, Netlify preview, revision record created.",
    "Owner sees the preview, hits deploy → push to main, Netlify production build.",
  ],
};

const pipelinePhases: Record<
  Locale,
  Array<{ name: string; what: string; cost: string }>
> = {
  de: [
    {
      name: "1. Scrape & Analyze",
      what: "Bestehende Webseite mit eigenem Scraper extrahieren: Text, Bilder, Farben, Fonts, Struktur.",
      cost: "niedrig (scripted)",
    },
    {
      name: "2. Research & Plan",
      what: "Branchen-Recherche, Sitemap, Design-Richtung.",
      cost: "mittel",
    },
    {
      name: "3. Content & Design",
      what: "Pro-Seiten-Copy, Design-Tokens, Bild-Auswahl.",
      cost: "mittel",
    },
    {
      name: "4. Implement",
      what: "Aus reichem Template Header / Footer / Forms / SEO; nur Seiten-Inhalte werden neu geschrieben.",
      cost: "hoch",
    },
    {
      name: "5. QA & Verify Build",
      what: "npm run build muss grün sein; Lint und Visual-Checks.",
      cost: "niedrig",
    },
    {
      name: "6. Sales Pitch",
      what: "Generiert ein Verkaufsgespräch-Skript für Cold-Outreach.",
      cost: "niedrig",
    },
  ],
  en: [
    {
      name: "1. Scrape & Analyze",
      what: "Extract the existing site with a custom scraper: text, images, colors, fonts, structure.",
      cost: "low (scripted)",
    },
    {
      name: "2. Research & Plan",
      what: "Industry research, sitemap, design direction.",
      cost: "medium",
    },
    {
      name: "3. Content & Design",
      what: "Per-page copy, design tokens, image selection.",
      cost: "medium",
    },
    {
      name: "4. Implement",
      what: "Rich template ships header / footer / forms / SEO; only page content gets newly written.",
      cost: "high",
    },
    {
      name: "5. QA & Verify Build",
      what: "npm run build must be green; lint and visual checks.",
      cost: "low",
    },
    {
      name: "6. Sales Pitch",
      what: "Generates a sales-call script for cold outreach.",
      cost: "low",
    },
  ],
};

const decisions: Record<Locale, { title: string; body: string }[]> = {
  de: [
    {
      title: "Tenant-isolierte Git-Repos statt DB-Strings",
      body: "Jede Kundenseite ist ein echter Git-Repo unter repos/{slug}. Revisionen, Rollbacks und Previews sind dadurch reine git-Operationen: kein eigener Versionsmechanismus, kein Custom-Diff.",
    },
    {
      title: "Provider-agnostischer Tool-Loop",
      body: "Claude und OpenAI teilen sich ein einziges Tool-Schema und einen gemeinsamen Event-Stream. Der Provider ist pro Edit-Request umschaltbar: environment-default, request-override.",
    },
    {
      title: "Token-Budget strikt durchgesetzt",
      body: "Datei-Inhalte, Suchergebnisse und Konversationshistorie werden auf harte Limits getrimmt, bevor sie an den Provider gehen. Kosten bleiben auf Basic-Plänen vorhersagbar; der Orchestrator wird nicht zur Kostenfalle.",
    },
    {
      title: "Plan-basierte Sicherheitsregeln",
      body: "Pro Plan konfigurierbar: maxFilesChanged, maxLinesChanged, maxTotalDiffBytes, allowedPaths, allowLayoutChanges. Basic-Pläne sehen nur content/** und public/uploads/**, Pro-Pläne haben Layout-Zugriff. Validierung läuft beim Abschluss-Schritt, nicht bei jedem Tool-Call.",
    },
    {
      title: "Live-Activity-Stream über WebSocket",
      body: "Tool-Calls und Modell-Deltas werden in Echtzeit an die Editor-UI gestreamt. Im Editor sichtbar: 'KI liest content/hero.md', 'editiert ...', 'commit'. Keine Blackbox, kein wortloser Spinner.",
    },
    {
      title: "Onboarding-Pipeline als separater Prozess",
      body: "Die 6-Phasen-Pipeline läuft NICHT als Studio-Subprozess. Sie ist ein eigenes Claude-Code-Setup mit eigenen Skills (skills/) und kann unabhängig vom Studio betrieben werden. Telegram-Bot triggert. Sauberer Schnitt zwischen Onboarding-Tooling und Laufzeit-SaaS.",
    },
  ],
  en: [
    {
      title: "Tenant-isolated git repos, not DB strings",
      body: "Every customer site is a real git repo under repos/{slug}. Revisions, rollbacks and previews become plain git operations: no custom version mechanism, no custom diff.",
    },
    {
      title: "Provider-agnostic tool loop",
      body: "Claude and OpenAI share a single tool schema and a common event stream. Provider is swappable per edit request: environment default, request override.",
    },
    {
      title: "Hard-enforced token budget",
      body: "File reads, search results and conversation history get trimmed to hard limits before they go to the provider. Cost stays predictable on basic plans; the orchestrator doesn't become a cost trap.",
    },
    {
      title: "Plan-gated safety rules",
      body: "Configurable per plan: maxFilesChanged, maxLinesChanged, maxTotalDiffBytes, allowedPaths, allowLayoutChanges. Basic plans only see content/** and public/uploads/**, pro plans get layout access. Validation runs at the finalize step, not per tool call.",
    },
    {
      title: "Live activity stream over WebSocket",
      body: "Tool calls and model deltas push to the editor UI in real time. The owner sees 'AI reads content/hero.md', 'edits ...', 'commit'. No black-box waiting spinner.",
    },
    {
      title: "Onboarding pipeline as a separate process",
      body: "The 6-phase pipeline does NOT run as a studio subprocess. It is its own Claude Code setup with its own skills (skills/), runnable independently of the studio. Telegram bot triggers it. Clean cut between onboarding tooling and runtime SaaS.",
    },
  ],
};

const tradeoffs: Record<Locale, { title: string; body: string }[]> = {
  de: [
    {
      title: "Tenant-Repo statt DB-Versionen",
      body: "Eigenes Git-Repo pro Kunde macht Revisionen, Rollbacks und Vorschauen zu reinen git-Operationen. Im Gegenzug: mehr Disk-I/O, Backup-Komplexität pro Kunde, nicht-trivialer Storage-Footprint. Bewusst bezahlt, um keine eigene Versionsverwaltungs-Schicht bauen und pflegen zu müssen.",
    },
    {
      title: "Validierung beim Abschluss, nicht pro Tool-Call",
      body: "Komplexitätsregeln werden am Ende gegen den aggregierten Diff geprüft, nicht bei jedem einzelnen Tool-Aufruf. Folge: die KI verbrennt gelegentlich Tokens auf Arbeit, die der finalize-Step dann abweist. Gewinn auf der anderen Seite: die Editor-UX bleibt durchgehend ruhig. Kein zickiges Tool, das mitten in einer Aktion 'BLOCKED' wirft.",
    },
    {
      title: "Provider-agnostischer Tool-Loop (Claude + OpenAI)",
      body: "Beide Provider arbeiten gegen dasselbe Tool-Schema und denselben Event-Stream. Das heißt im Klartext: keine extended-thinking-Modi, kein provider-spezifisches Prompt-Caching, kein Vision-Input. Was übrig bleibt, sind ein stabiles Datenmodell und der erste Modell-Wechsel als reine Config-Änderung statt als Migration.",
    },
    {
      title: "Hartes Token-Budget pro Edit-Request",
      body: "Datei-Inhalte, Suchergebnisse und Konversationshistorie werden vor jedem Provider-Aufruf auf harte Limits getrimmt. Konsequenz: die KI wird gelegentlich mitten im Gedanken abgeschnitten und muss neu ansetzen. Dafür bleiben die Kosten auf Basic-Plänen vorhersagbar; der Orchestrator wird nicht zur Kostenfalle.",
    },
    {
      title: "Onboarding-Pipeline als eigener Prozess",
      body: "Die 6-Phasen-Pipeline für Neukunden läuft nicht im Studio-Runtime, sondern als eigenes Claude-Code-Setup mit eigenen Skills. Was fehlt: ein gemeinsames Fortschritts-UI und ein geteilter Auth-Kontext. Was zählt: Onboarding-Tooling und Laufzeit-SaaS deployen sich nicht gegenseitig und lasten sich nicht gegenseitig aus.",
    },
  ],
  en: [
    {
      title: "Tenant git repos instead of DB versions",
      body: "A real git repo per customer turns revisions, rollbacks and previews into plain git operations. In exchange: more disk I/O, per-customer backup complexity, a non-trivial storage footprint. Paid deliberately to avoid building and maintaining a custom versioning layer.",
    },
    {
      title: "Validate at finalize, not per tool call",
      body: "Complexity rules check the aggregated diff at the end, not each tool call. Consequence: the AI occasionally burns tokens on work that the finalize step then rejects. The upside is that editor UX stays calm throughout. No flaky tool that throws 'BLOCKED' mid-action.",
    },
    {
      title: "Provider-agnostic tool loop (Claude + OpenAI)",
      body: "Both providers work against the same tool schema and the same event stream. Plainly: no extended-thinking modes, no provider-specific prompt caching, no vision input. What remains is a stable data model and a model switch that's a config change rather than a migration.",
    },
    {
      title: "Hard token budget per edit request",
      body: "File contents, search results and conversation history get trimmed to hard limits before every provider call. The cost is real: the AI sometimes gets cut off mid-thought and has to restart. The benefit is that basic plans stay cost-predictable; the orchestrator doesn't become a cost trap.",
    },
    {
      title: "Onboarding pipeline as its own process",
      body: "The 6-phase pipeline for new customers does not run inside the studio runtime; it's a separate Claude Code setup with its own skills. Missing: a shared progress UI and a shared auth context. Gained: onboarding tooling and runtime SaaS don't deploy each other and don't load each other down.",
    },
  ],
};

const labels = {
  de: {
    flowTitle: "Vom Chat zum Deploy",
    flowLead:
      "Eine Session, sieben Schritte. Alles wartet auf eine Freigabe vor dem Live-Push: Preview-First by default.",
    toolsTitle: "Tool-Loop - 8 Tools",
    toolsLead:
      "Der Loop ist provider-agnostisch: Claude (Default) und OpenAI teilen sich exakt dieses Tool-Schema und einen gemeinsamen Event-Stream.",
    toolCol: "Tool",
    descCol: "Beschreibung",
    pipelineTitle: "Onboarding-Pipeline - 6 Phasen",
    pipelineLead:
      "Eigener Claude-Code-Prozess fürs Onboarding: Er liest die bestehende Webseite eines Interessenten aus und baut daraus automatisch eine moderne React-Version. Vite + React 18 + Tailwind, Netlify-Forms und -Hosting.",
    phaseCol: "Phase",
    workCol: "Arbeit",
    costCol: "Credits",
    decisionsTitle: "Schlüsselentscheidungen",
    tradeoffsTitle: "Trade-offs",
    tradeoffsLead:
      "Wo das System Reibung verursacht, und wofür.",
    deploymentTitle: "Deployment",
    deploymentBody:
      "Docker-Compose für lokales Postgres; Studio läuft als Next.js-App. Netlify übernimmt das eigentliche Hosting der Kundenseiten, sowohl Previews als auch Production-Builds. nginx-Preview-Konfiguration für selbst-gehostete Vorschauen ist als Fallback dabei.",
  },
  en: {
    flowTitle: "From chat to deploy",
    flowLead:
      "One session, seven steps. Everything waits for approval before the live push: preview-first by default.",
    toolsTitle: "Tool loop - 8 tools",
    toolsLead:
      "The loop is provider-agnostic: Claude (default) and OpenAI share exactly this tool schema and a common event stream.",
    toolCol: "Tool",
    descCol: "Description",
    pipelineTitle: "Onboarding pipeline - 6 phases",
    pipelineLead:
      "A dedicated Claude Code process for onboarding: it reads a prospect's existing website and automatically builds a modern React version from it. Vite + React 18 + Tailwind, Netlify Forms and hosting.",
    phaseCol: "Phase",
    workCol: "Work",
    costCol: "Credits",
    decisionsTitle: "Key engineering decisions",
    tradeoffsTitle: "Trade-offs",
    tradeoffsLead:
      "Where the system pushes back, and what for.",
    deploymentTitle: "Deployment",
    deploymentBody:
      "Docker Compose for local Postgres; studio runs as a Next.js app. Netlify handles actual hosting for customer sites, both previews and production builds. An nginx preview config is bundled as a fallback for self-hosted previews.",
  },
};

export function PagebeeContent({ locale }: { locale: Locale }) {
  const l = labels[locale];

  return (
    <div className="space-y-20">
      <Section title={l.flowTitle} lead={l.flowLead}>
        <ol className="space-y-3">
          {flowSteps[locale].map((step, idx) => (
            <li
              key={idx}
              className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-semibold text-[var(--color-accent-foreground)]">
                {idx + 1}
              </span>
              <p className="text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

            <Section title={l.decisionsTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {decisions[locale].map((item) => (
            <NoteCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>

      <Section title={l.tradeoffsTitle} lead={l.tradeoffsLead}>
        <div className="grid gap-4 md:grid-cols-2">
          {tradeoffs[locale].map((item) => (
            <NoteCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>

            <Section title={l.toolsTitle} lead={l.toolsLead}>
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-muted)]/40 text-left">
                <Th>{l.toolCol}</Th>
                <Th>{l.descCol}</Th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr
                  key={t.name}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                  <Td className="font-mono text-xs">{t.name}</Td>
                  <Td className="text-[var(--color-muted-foreground)]">
                    {t.desc[locale]}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

            <Section title={l.pipelineTitle} lead={l.pipelineLead}>
        <div className="grid gap-3 md:grid-cols-2">
          {pipelinePhases[locale].map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-tight">
                  {p.name}
                </h3>
                <Badge>{p.cost}</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {p.what}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={l.deploymentTitle}>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {l.deploymentBody}
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

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 align-top ${className ?? ""}`}>{children}</td>
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
