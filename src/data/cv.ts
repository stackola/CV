import type { Locale } from "@/i18n/config";

type Bilingual = Record<Locale, string>;

export const personalInfo = {
  name: "Willi Krappen",
  role: { de: "Fullstack Product Engineer", en: "Fullstack Product Engineer" } satisfies Bilingual,
  birthDate: "1991-10-22",
  location: "Münster",
} as const;

export const education: Array<{
  period: string;
  title: Bilingual;
  detail?: Bilingual;
}> = [
  {
    period: "2015–2017",
    title: {
      de: "Studium Medieninformatik - TU Dresden",
      en: "Media Informatics studies - TU Dresden",
    },
    detail: {
      de: "2017 zugunsten der Berufspraxis beendet; Wechsel in die Festanstellung als Entwickler.",
      en: "Left in 2017 in favour of professional practice; moved into full-time development work.",
    },
  },
  {
    period: "2012",
    title: { de: "Abitur - Endnote 1,8", en: "Abitur (German university qualification) - final grade 1.8" },
  },
];

export const experience: Array<{
  period: string;
  title: Bilingual;
  detail?: Bilingual;
  clients?: string[];
}> = [
  {
    period: "2021–2024",
    title: {
      de: "Mitgründer & Technische Leitung - Lemonverse GmbH (Münster)",
      en: "Co-founder & technical lead - Lemonverse GmbH (Münster)",
    },
    clients: [
      "Windmöller & Hölscher",
      "Allwetterzoo Münster",
      "Pferdemuseum Münster",
      "Stiftsmuseum Asbeck",
    ],
    detail: {
      de: "Mitgründung einer spezialisierten Agentur für VR-, AR- und Mixed-Reality-Anwendungen mit Schwerpunkt Industrie-Schulungen (Hands-On-Trainings für Maschinenbedienung, Wartung, Sicherheit). VR-Trainings in Unreal Engine, öffentliche Web-Projekte in React und Three.js. Verantwortlich für Stack-Auswahl, Build-Pipelines, Engine-Arbeit und die Hardware-Inbetriebnahme vor Ort beim Kunden. Direkter Stakeholder-Kontakt vom Anforderungs-Workshop bis zur Schulung des internen Trainingspersonals.",
      en: "Co-founded a specialised agency for VR, AR and mixed-reality applications focused on industrial training (hands-on trainings for machine operation, maintenance, safety). VR trainings in Unreal Engine, public web projects in React and Three.js. Responsible for stack choice, build pipelines, engine work and on-site hardware setup at customer locations. Direct stakeholder contact from requirements workshops through to training internal trainers.",
    },
  },
  {
    period: "2017–2020",
    title: {
      de: "Frontend-Entwickler - OPOX GmbH (Dresden)",
      en: "Frontend developer - OPOX GmbH (Dresden)",
    },
    detail: {
      de: "Drei Jahre Festanstellung in einer Digital-Agentur. Hauptprojekt: Schichtplanungs-Software für einen Industriekunden mit intelligenter Arbeitsplatz-Zuweisung und automatischem Skill-Leveling aus der Einsatz-Historie. Daneben React-/TypeScript-Anwendungen für Kunden aus Industrie und öffentlicher Hand, in gemischten Scrum-Teams mit Stakeholder-Kommunikation im Sprint-Rhythmus.",
      en: "Three years of full-time employment at a digital agency. Main project: shift-planning software for an industrial client with smart workplace assignment and automatic skill leveling from deployment history. Alongside that, React/TypeScript applications for industry and public-sector clients, in mixed Scrum teams with stakeholder communication on sprint cadences.",
    },
    clients: ["Stadt Dresden", "BOSCH"],
  },
  {
    period: "seit 2013",
    title: { de: "Freiberuflicher Entwickler", en: "Freelance developer" },
    clients: [
      "Pfennigturm GmbH",
      "Coilinter GmbH",
      "COBE GmbH",
      "parsQube GmbH",
      "High Lights GmbH",
      "Drogenhilfe Deutschland",
      "INDRO e.V.",
    ],
    detail: {
      de: "Durchgehende Freelance-Praxis parallel zu Festanstellung und Mitgründung: Web-Produkte und Fach-Anwendungen für KMU, Vereine und öffentliche Hand, Schwerpunkt React/Next.js, TypeScript und Three.js. Laufende Kunden aktuell: INDRO e.V. (seit 2025) und Drogenhilfe Deutschland (seit 2026); daneben liegt der Fokus auf eigenen Produkten (pagebee.de als Multi-Tenant-SaaS) sowie auf Engineering-Studien zu agentischer KI (Multi-Agent-Systeme, KI-orchestrierte Editor-Werkzeuge, typisierte Tool-Loops).",
      en: "Continuous freelance practice running alongside the employment and the co-founded venture: web products and specialised applications for SMEs, non-profits and the public sector, focused on React/Next.js, TypeScript and Three.js. Current ongoing clients: INDRO e.V. (since 2025) and Drogenhilfe Deutschland (since 2026); the focus alongside that is on own products (pagebee.de as a multi-tenant SaaS) and engineering studies in agentic AI (multi-agent systems, AI-orchestrated editor tooling, typed tool loops).",
    },
  },
  {
    period: "2012",
    title: { de: "Praktikum - Onsult IT Services", en: "Internship - Onsult IT Services" },
    detail: {
      de: "Mitarbeit an Software für Autohäuser mit HTML, CSS und PHP.",
      en: "Worked on software for car dealerships using HTML, CSS and PHP.",
    },
  },
];

export const skills = {
  core: [
    "TypeScript",
    "React / Next.js",
    "Tailwind / shadcn",
    "Node",
    "Three.js / R3F",
    "Anthropic SDK",
    "Postgres / Prisma",
  ],
  working: [
    "Express / Hono",
    "BullMQ / Redis",
    "WebSockets / SSE",
    "Docker",
    "nginx / PM2",
    "Git / Scrum",
    "UNIX / Linux Serveradministration",
    "Windsurf / Cursor / Claude Code",
  ],
  familiar: ["Python", "PHP", "MongoDB", "Drizzle"],
} as const;

export const languages: Array<{ name: Bilingual; level: Bilingual }> = [
  { name: { de: "Deutsch", en: "German" }, level: { de: "Muttersprache", en: "Native" } },
  { name: { de: "Englisch", en: "English" }, level: { de: "C2", en: "C2" } },
  { name: { de: "Französisch", en: "French" }, level: { de: "A2", en: "A2" } },
];

export const driving: Bilingual = { de: "Klasse B", en: "Class B" };

export const misc: Bilingual[] = [
  { de: "3D-Druck / CAD", en: "3D printing / CAD" },
  { de: "EDA / Embedded-Programmierung", en: "EDA / embedded programming" },
  { de: "Platinendesign", en: "PCB design" },
  { de: "Drohnenflug (Cine / Race)", en: "Drone piloting (cine / race)" },
];

export function pick<T extends Bilingual>(b: T, locale: Locale): string {
  return b[locale];
}
