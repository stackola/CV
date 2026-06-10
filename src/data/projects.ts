import type { Locale } from "@/i18n/config";

type Bilingual = Record<Locale, string>;

export type TechGroup = {
  label: Bilingual;
  items: string[];
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  client?: string;
  role: Bilingual;
  summary: Bilingual;
  description: Bilingual;
  tech: string[];
  techGroups?: TechGroup[];
  keyDecision?: Bilingual;
  links?: { live?: string; repo?: string };
  extraLinks?: Array<{ label: Bilingual; href: string }>;
  video?: string;
  image?: string;
  screen?: string;
  accent: string;
  featured?: boolean;
  wip?: boolean;
  studie?: boolean;
};

export const projects: Project[] = [
  {
    slug: "pagebee",
    title: "pagebee.de",
    year: "2025",
    role: {
      de: "Eigenes SaaS - Konzept, Architektur, Implementierung, Betrieb",
      en: "Own SaaS - concept, architecture, implementation, operations",
    },
    summary: {
      de: "Multi-Tenant-SaaS, mit dem Unternehmen ihre Webseite per Chat mit einer KI individuell anpassen: eigenes Git-Repo pro Kunde, Vorschau, Netlify-Deploy auf Freigabe.",
      en: "Multi-tenant SaaS that lets businesses tailor their website by chatting with an AI: per-tenant git repo, preview, Netlify deploy on approval.",
    },
    description: {
      de: "Kleine Unternehmen können sich für jede geänderte Öffnungszeit oder jedes neue Hero-Foto keinen Entwickler leisten, brauchen aber trotzdem moderne, schnelle Webseiten. Pagebee löst das per Chat: im Editor genügt 'tausch das Hero-Foto und ändere die Öffnungszeiten auf 8-18', ein Orchestrator übersetzt das in Tool-Calls auf das eigene Git-Repo des Kunden, committet auf einen Draft-Branch, rendert eine Vorschau und wartet auf Freigabe. Jede Kundenseite bekommt ein isoliertes Repo, plan-basierte Sicherheitsregeln und eine vollständige Revisionshistorie. Fürs Onboarding gibt es außerdem eine eigene Claude-Code-Pipeline: Sie liest die bestehende Webseite eines Interessenten aus und baut daraus automatisch eine moderne React-Version. Läuft als Multi-Tenant-SaaS auf pagebee.de.",
      en: "Small businesses can't afford a developer for every opening-hour change or every new hero image, but they still need modern, fast websites. Pagebee solves that via chat: the owner writes 'swap the hero photo and update opening hours to 8-18', an orchestrator translates that into tool calls against the customer's own git repo, commits on a draft branch, renders a preview and waits for approval. Each customer has an isolated repo, plan-based safety rules and full revision history. For onboarding there is also a dedicated Claude Code pipeline: it reads a prospect's existing website and automatically builds a modern React version from it. Live as a multi-tenant SaaS at pagebee.de.",
    },
    tech: [
      "Next.js 14",
      "TypeScript",
      "Turborepo",
      "Postgres",
      "Prisma",
      "NextAuth",
      "Anthropic SDK",
      "OpenAI SDK",
      "Netlify API",
      "WebSockets",
      "Docker",
    ],
    techGroups: [
      {
        label: { de: "Runtime", en: "Runtime" },
        items: ["Next.js 14", "TypeScript", "Turborepo"],
      },
      {
        label: { de: "Modelle", en: "Models" },
        items: ["Anthropic SDK", "OpenAI SDK"],
      },
      {
        label: { de: "Storage", en: "Storage" },
        items: ["Postgres", "Prisma"],
      },
      {
        label: { de: "Auth", en: "Auth" },
        items: ["NextAuth"],
      },
      {
        label: { de: "Realtime", en: "Realtime" },
        items: ["WebSockets"],
      },
      {
        label: { de: "Infra", en: "Infra" },
        items: ["Netlify API", "Docker"],
      },
    ],
    links: { live: "https://pagebee.de" },
    image: "/projects/cards/pagebee.png",
    screen: "/projects/screens/pagebee.png",
    accent: "from-emerald-500/40 to-cyan-400/30",
    featured: true,
  },
  {
    slug: "lemonverse",
    title: "Lemonverse",
    year: "2021–2024",
    client: "Lemonverse GmbH",
    role: {
      de: "Mitgründer & Technische Leitung - Stack, Engine, Build-Pipeline, Hardware-Setup",
      en: "Co-founder & technical lead - stack, engine, build pipeline, hardware setup",
    },
    summary: {
      de: "Mitgründung einer Münsteraner Agentur für VR-Hands-On-Trainings für Industrie und Institutionen. Verantwortung von Konzept bis Hardware-Inbetriebnahme beim Kunden.",
      en: "Co-founded a Münster-based agency for industrial VR hands-on training. Responsibility from concept through to on-site hardware deployment.",
    },
    description: {
      de: "Industrielle Sicherheits-, Maschinen- und Wartungs-Schulungen finden traditionell am echten Gerät statt: riskant, teuer, schwer über Standorte skalierbar. Lemonverse hat genau das adressiert. Mitarbeitende setzen die VR-Brille auf und durchlaufen Tutorial-Modus, Hands-On-Szenarien und Prüfungsphase im virtuellen Twin der echten Anlage, umgesetzt in Unreal Engine. Daneben entstanden öffentliche Web-Projekte in React und Three.js. Als technischer Mitgründer verantwortlich für Stack-Auswahl, Build-Pipelines, Engine-Arbeit und Hardware-Setup vor Ort. Referenzen u. a.: VR-Wartungstraining für Windmöller & Hölscher, interaktive Besucher-App für den Allwetterzoo Münster, Kutschfahrt-Simulator für das Pferdemuseum Münster und ein digitaler Guide für das Stiftsdorf Asbeck.",
      en: "Industrial safety, machine-operation and maintenance training traditionally happens on the real equipment: risky, expensive, hard to scale across sites. Lemonverse addressed exactly that. Employees put on the headset and walk through tutorial mode, hands-on scenarios and an assessment phase against a virtual twin of the actual rig, built in Unreal Engine. Alongside that, public web projects were built in React and Three.js. As technical co-founder responsible for stack choice, build pipelines, engine work and on-site hardware setup. References include: VR maintenance training for Windmöller & Hölscher, an interactive visitor app for Allwetterzoo Münster, a carriage ride simulator for the Horse Museum Münster and a digital guide for the collegiate village of Asbeck.",
    },
    tech: [
      "Unreal Engine",
      "React",
      "TypeScript",
      "Three.js",
      "360° Video",
      "Node",
      "Netlify",
      "Microsoft Teams / Miro (Discovery)",
    ],
    techGroups: [
      {
        label: { de: "VR-Engine", en: "VR engine" },
        items: ["Unreal Engine"],
      },
      {
        label: { de: "Web-Projekte", en: "Web projects" },
        items: ["React", "TypeScript", "Three.js", "360° Video"],
      },
      {
        label: { de: "Infra", en: "Infra" },
        items: ["Node", "Netlify"],
      },
      {
        label: { de: "Prozess", en: "Process" },
        items: ["Microsoft Teams / Miro"],
      },
    ],
    links: { live: "https://lemonverse.de" },
    accent: "from-yellow-400/40 to-lime-400/30",
    featured: true,
  },
  {
    slug: "opox",
    title: "OPOX",
    year: "2017–2020",
    client: "OPOX GmbH",
    role: {
      de: "Frontend-Entwickler - Planungs-Software, Konfiguratoren, interne Tools",
      en: "Frontend developer - planning software, configurators, internal tools",
    },
    summary: {
      de: "Drei Jahre Produktentwicklung in einer Dresdner Digital-Agentur. Schwerpunkt: Schichtplanungs-Software für einen Industriekunden mit intelligenter Arbeitsplatz-Zuweisung und automatischem Skill-Leveling. Kunden u. a. Stadt Dresden und BOSCH.",
      en: "Three years of product development at a Dresden digital agency. Main focus: shift-planning software for an industrial client with smart workplace assignment and automatic skill leveling. Clients include the City of Dresden and BOSCH.",
    },
    description: {
      de: "Hauptprojekt war eine Schichtplanungs-Software für einen Industriekunden. Das System weist Beschäftigte intelligent Arbeitsplätzen zu und levelt Qualifikationen automatisch aus der Einsatz-Historie. Wer einen Arbeitsplatz oft genug besetzt hat, gilt als qualifiziert; wer wenig Erfahrung mitbringt, wird gezielt mit Anleitung eingeplant. Daneben React-/TypeScript-Anwendungen für weitere Kunden aus Industrie und öffentlicher Hand, von Konfiguratoren bis zu internen Tools, mit hohen Anforderungen an Accessibility und Wartbarkeit. Arbeit in gemischten Projektteams aus Design, Backend-Entwicklung und Projektleitung; Übergaben in Scrum-/Sprint-Zyklen.",
      en: "The main project was shift-planning software for an industrial client. The system assigns workers to workplaces intelligently and levels qualifications automatically from deployment history. Whoever has staffed a workplace often enough counts as qualified; whoever has little experience gets scheduled with guidance. Alongside that, React/TypeScript applications for further industry and public-sector clients, from configurators to internal tools, with high requirements around accessibility and maintainability. Work in mixed teams of design, backend engineering and project leads; delivery on Scrum/sprint cadences.",
    },
    tech: [
      "JavaScript / TypeScript",
      "React",
      "Redux",
      "HTML / CSS / SASS",
      "Webpack",
      "Node",
      "REST APIs",
      "Git / Scrum",
    ],
    links: {},
    accent: "from-sky-500/40 to-cyan-400/30",
    featured: true,
  },
  {
    slug: "drones",
    title: "Drone Show Designer",
    year: "2025",
    role: {
      de: "Persönliches Projekt - Konzept, Engine, UI, KI-Agent",
      en: "Personal project - concept, engine, UI, AI agent",
    },
    summary: {
      de: "Browserbasierter Node-Editor für Drohnen-Lichtshows: ein typisierter ShowGraph als Single Source of Truth, Live-3D-Preview im Main-Thread, deterministisches Bake mit voller Physik-Validierung im Web-Worker. Dazu ein KI-Agent mit 30+ Tools, der direkt am Graphen arbeitet. Live auf drones.prototyp.ms, in aktiver Entwicklung.",
      en: "Browser-based node editor for drone light shows: a typed ShowGraph as the single source of truth, live 3D preview on the main thread, deterministic bake with full physics validation in a Web Worker. Plus a Claude agent with 30+ tools working directly on the graph. Live at drones.prototyp.ms, under active development.",
    },
    description: {
      de: "Drohnen-Choreographie ist heute in Blender-Plugins und proprietäre Desktop-Programme eingesperrt: weder kollaborativ skriptbar, noch im Browser bearbeitbar, noch KI-zugänglich. Hier entsteht eine web-native Alternative, von Grund auf neu entwickelt: ein typisierter ShowGraph (launch → formation → transition → idle → land) ist die kanonische Zustandsquelle; React-Flow-Canvas, Three.js-Viewport, Inspector, Validator und Exporter sind allesamt abgeleitete Sichten. Ein Claude-Tool-Calling-Agent kann den Graphen direkt schreiben; jeder Schreibvorgang macht vorher einen Snapshot, sodass sich jede KI-Änderung mit Ctrl+Z rückgängig machen lässt. Eine Standalone-Variante daneben nimmt einen Text-Prompt und liefert ein Formation-JSON plus Blender-Import-Script. Aktuell live auf drones.prototyp.ms; Engine, Preview, Bake und KI-Agent stehen, neue Tools und Music-Sync landen laufend.",
      en: "Drone-show choreography today is locked into Blender plugins and proprietary desktop apps: none of them collaboratively scriptable, none of them browser-editable, none of them AI-addressable. This is a web-native alternative built from scratch: a typed ShowGraph (launch → formation → transition → idle → land) is the canonical state; the React Flow canvas, Three.js viewport, inspectors, validator and exporter are all derived views. A Claude tool-calling agent writes directly to the graph, with a history snapshot before every write so Ctrl+Z undoes any AI change. A standalone companion takes a text prompt and produces formation JSON plus a Blender import script. Live at drones.prototyp.ms; engine, preview, bake and AI agent are in place, new tools and music sync continue to land.",
    },
    tech: [
      "TypeScript",
      "React 18",
      "Three.js",
      "React Three Fiber",
      "React Flow",
      "Zustand",
      "Vite",
      "Web Workers",
      "Vitest",
      "Playwright",
      "Tailwind",
      "Anthropic SDK",
      "IndexedDB",
    ],
    techGroups: [
      {
        label: { de: "Runtime", en: "Runtime" },
        items: ["TypeScript", "Vite", "Web Workers"],
      },
      {
        label: { de: "UI / 3D", en: "UI / 3D" },
        items: ["React 18", "Three.js", "React Three Fiber", "React Flow", "Zustand", "Tailwind"],
      },
      {
        label: { de: "Modelle", en: "Models" },
        items: ["Anthropic SDK"],
      },
      {
        label: { de: "Storage", en: "Storage" },
        items: ["IndexedDB"],
      },
      {
        label: { de: "Tests", en: "Tests" },
        items: ["Vitest", "Playwright"],
      },
    ],
    keyDecision: {
      de: "Welcher Teil des Editors ist die Wahrheit? Der ShowGraph. Eine typisierte Datenstruktur (launch → formation → transition → idle → land), aus der Canvas, Three.js-Viewport, Inspector, Validator und Exporter allesamt abgeleitet werden. Das hält allen State an einer Stelle und zieht die unbequeme Konsequenz mit: Live-Preview darf approximieren, Bake darf das nicht. Diese Trennung steckt in zwei explizit verschiedenen Codepfaden, jeder mit eigenen Tests.",
      en: "Which part of the editor is the truth? The ShowGraph. One typed data structure (launch → formation → transition → idle → land) from which the canvas, Three.js viewport, inspector, validator and exporter are all derived. That keeps state in one place and carries one awkward consequence: live preview is allowed to approximate, bake is not. The split sits in two explicitly different code paths, each with its own tests.",
    },
    links: {
      live: "https://drones.prototyp.ms",
      repo: "https://github.com/stackola/Drone-Lightshow-Creator",
    },
    image: "/projects/cards/drones.png",
    screen: "/projects/screens/drones.png",
    accent: "from-sky-500/40 to-fuchsia-400/30",
    featured: true,
    wip: true,
  },
  {
    slug: "indro",
    title: "INDRO e.V.",
    year: "2025",
    client: "INDRO e.V.",
    role: {
      de: "Freiberuflich - interne Fach-Tools, Konzept bis Betrieb",
      en: "Freelance - internal tools, concept through operations",
    },
    summary: {
      de: "Zwei interne Fach-Tools für INDRO e.V. in Münster: Echtzeit-Dokumentation für den Drogenkonsumraum und eine Fragebogen-Plattform für die tägliche Einrichtungs-Statistik. Beide mit Auswertungs-Dashboard und Excel-Export.",
      en: "Two internal tools for INDRO e.V. in Münster: real-time documentation for the supervised consumption room and a survey platform for daily facility statistics. Both with reporting dashboards and Excel export.",
    },
    description: {
      de: "Laufendes freiberufliches Engagement für INDRO e.V. in Münster, eine Organisation der akzeptierenden Drogenarbeit. Das erste Tool dokumentiert den Drogenkonsumraum in Echtzeit: Platzbelegung auf Tablets, kollisionssicher bei parallelem Zugriff, dazu Konsum-Dokumentation und Notfall-Protokolle mit Verlauf. Der Excel-Export entspricht dem offiziellen Berichtsformat des Trägers. Das zweite Tool ist eine flexible Fragebogen-Plattform für die tägliche Einrichtungs-Statistik. Fragetypen sind konfigurierbar, Fragen werden versioniert und bleiben so historisch vergleichbar. Ein Analyse-Dashboard zeigt Zeitreihen und Heatmaps.",
      en: "Ongoing freelance engagement for INDRO e.V. in Münster, a harm-reduction organisation. The first tool documents the supervised drug-consumption room in real time: seat management on tablets, safe under concurrent access, plus consumption documentation and emergency protocols with timelines. The Excel export matches the organisation's official reporting format. The second tool is a flexible survey platform for daily facility statistics. Question types are configurable, and questions are versioned so results stay historically comparable. An analytics dashboard shows time series and heatmaps.",
    },
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "MongoDB", "Recharts"],
    links: {},
    accent: "from-rose-500/40 to-orange-400/30",
    featured: true,
  },
  {
    slug: "drogenhilfe",
    title: "Drogenhilfe Deutschland",
    year: "2026",
    client: "Drogenhilfe Deutschland",
    role: {
      de: "Freiberuflich - Konzeption & Entwicklung",
      en: "Freelance - concept & development",
    },
    summary: {
      de: "Substanzwarn-Plattform für Drogenhilfe Deutschland: öffentliches Warn-Dashboard nach Region und Substanzkategorie, Risiko-Engine über Meldungen von Partner-Organisationen, Benachrichtigungen per Web-Push und Telegram.",
      en: "Drug-alert platform for Drogenhilfe Deutschland: public warning dashboard by region and substance category, a risk engine fed by partner-organisation reports, notifications via web push and Telegram.",
    },
    description: {
      de: "Laufendes freiberufliches Engagement für Drogenhilfe Deutschland. Kernstück ist eine mehrmandantenfähige Substanzwarn-Plattform. Partner-Organisationen melden Kontaminations- und Überdosis-Signale über eine API. Eine Risiko-Engine mit konfigurierbarem Abkling-Modell verdichtet die Meldungen zu Warnstufen pro Region und Substanzkategorie. Die Öffentlichkeit erhält Warnungen über ein Status-Dashboard, Web-Push und einen Telegram-Bot, wahlweise diskret oder mit expliziter Substanznennung. Ein Admin-Bereich deckt manuelle Warnungen, mehrsprachige Inhalte und Audit-Logs ab.",
      en: "Ongoing freelance engagement for Drogenhilfe Deutschland. The centrepiece is a multi-tenant drug-alert platform. Partner organisations report contamination and overdose signals via an API. A risk engine with a configurable decay model condenses the reports into warning levels per region and substance category. The public receives alerts through a status dashboard, web push and a Telegram bot, either discreet or with explicit substance naming. An admin area covers manual alerts, multilingual content and audit logs.",
    },
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Web Push", "Telegram API"],
    links: {},
    accent: "from-violet-500/40 to-indigo-400/30",
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

const bySlug = (slugs: string[]): Project[] =>
  slugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

// Display order is reverse-chronological: newest engagements first.
export const clientWork = bySlug([
  "drogenhilfe",
  "indro",
  "lemonverse",
  "opox",
]);

// Self-initiated: the flagship SaaS, then the one lab piece.
export const ownWork = bySlug(["pagebee", "drones"]);

// Employment / co-founder stations shown in the CV "Vita" section — same
// canonical entries as the project pages, no duplicated data.
export const experience = bySlug(["lemonverse", "opox"]);
