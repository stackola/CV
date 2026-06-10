import type { Locale } from "@/i18n/config";
import { WEIGHTS } from "@/lib/chat/protocol";

type Bilingual = Record<Locale, string>;
type BilingualList = Record<Locale, string[]>;

/**
 * Willi's ideal-fit profile — the yardstick the chatbot scores a recruiter's
 * role against. Authored collaboratively (not derivable from the public CV).
 * Compensation is intentionally absent: the bot never discusses or scores pay.
 */
export const baseline = {
  /** Weights for the overall match score; sum to 1. work_style is the priority. */
  weights: WEIGHTS,

  capabilities: {
    en: "Fullstack product engineer with 10+ years shipping web products end-to-end, solo or as technical lead. Core stack: TypeScript, React/Next.js, Tailwind, Node, Postgres/Prisma, Three.js / React Three Fiber. Strong on agentic AI: typed tool-loops, multi-agent systems and AI-orchestrated editor tooling with the Anthropic SDK. Comfortable across the whole stack incl. WebSockets/SSE, BullMQ/Redis, Docker, nginx/PM2 and Linux server administration. Also hardware-adjacent: 3D printing/CAD, PCB design and embedded programming.",
    de: "Fullstack Product Engineer mit über 10 Jahren Erfahrung, Web-Produkte end-to-end zu liefern, allein oder als technische Leitung. Kern-Stack: TypeScript, React/Next.js, Tailwind, Node, Postgres/Prisma, Three.js / React Three Fiber. Stark in agentischer KI: typisierte Tool-Loops, Multi-Agent-Systeme und KI-orchestrierte Editor-Werkzeuge mit dem Anthropic SDK. Souverän über den gesamten Stack inkl. WebSockets/SSE, BullMQ/Redis, Docker, nginx/PM2 und Linux-Serveradministration. Außerdem hardwarenah: 3D-Druck/CAD, Platinendesign und Embedded-Programmierung.",
  } satisfies Bilingual,

  idealRole: {
    en: "Owning web products end-to-end in a small, experienced team: from concept and architecture down to the shipped detail. Plays best as a product engineer with real autonomy, low process overhead and direct stakeholder contact, especially on agentic-AI and 3D-web problems.",
    de: "Web-Produkte end-to-end in einem kleinen, erfahrenen Team verantworten: von Konzept und Architektur bis ins ausgelieferte Detail. Am stärksten als Product Engineer mit echter Autonomie, wenig Prozess-Overhead und direktem Stakeholder-Kontakt, besonders bei agentischer KI und 3D-Web.",
  } satisfies Bilingual,

  /** How to talk about level. The bot must follow this exactly. */
  seniority: {
    en: "Do NOT assign Willi a seniority label, rate his own level, or say things like 'Willi sees himself as…'. Willi is open to both mid-level and senior roles. If asked about level, share concrete facts (10+ years shipping web products end-to-end, co-founder & technical-lead experience, ships solo across the full stack) and that he's open to mid and senior positions. Then let the recruiter judge the fit for their role.",
    de: "Weise Willi KEINE Senioritätsstufe zu, bewerte sein Level nicht selbst und sage nichts wie 'Willi sieht sich als …'. Willi ist offen für Mid-Level- und Senior-Rollen. Bei Fragen zum Level: nenne konkrete Fakten (10+ Jahre Web-Produkte end-to-end, Mitgründer- & Tech-Lead-Erfahrung, liefert allein über den gesamten Stack) und dass er für Mid- und Senior-Positionen offen ist. Überlasse die Einschätzung dem Gegenüber.",
  } satisfies Bilingual,

  lookingFor: {
    en: "Actively looking for a part-time role, 20–25 hours per week, fully remote. Most interested in high-autonomy, high-ownership work with a small, experienced team and a stable, long-term engagement. Both part-time employment and a freelance/contractor arrangement (he is a registered freelancer with a VAT ID) work equally well; a full-time role is possible for an exceptional fit, at mid-level or senior scope.",
    de: "Aktiv auf der Suche nach einer Teilzeit-Rolle, 20–25 Stunden pro Woche, vollständig remote. Am meisten interessiert an Arbeit mit hoher Autonomie und Ownership in einem kleinen, erfahrenen Team und einer stabilen, langfristigen Zusammenarbeit. Teilzeit-Anstellung und Freelance-/Contractor-Modell (er ist eingetragener Freiberufler mit USt-IdNr.) funktionieren gleichermaßen; Vollzeit ist bei außergewöhnlich gutem Fit möglich, auf Mid-Level- oder Senior-Niveau.",
  } satisfies Bilingual,

  /**
   * Capacity / concurrent commitments — the first question any employer asks a
   * 20–25h hire. The bot should answer this proactively and confidently.
   */
  capacity: {
    en: "Willi has reliable capacity for 20–25 hours per week. His two ongoing freelance clients (Drogenhilfe Deutschland, INDRO e.V.) are maintenance engagements amounting to a few hours per month, and pagebee and the drone-show editor are his own products built in his own time. None of it conflicts with a part-time role, and he is transparent about side activities (Nebentätigkeit) from day one.",
    de: "Willi hat verlässlich Kapazität für 20–25 Stunden pro Woche. Seine beiden laufenden Freelance-Kunden (Drogenhilfe Deutschland, INDRO e.V.) sind Wartungs-Engagements im Umfang weniger Stunden pro Monat; pagebee und der Drone-Show-Editor sind eigene Produkte in eigener Zeit. Nichts davon kollidiert mit einer Teilzeit-Rolle, und Nebentätigkeiten legt er von Anfang an transparent offen.",
  } satisfies Bilingual,

  preferences: {
    remote: "remote-only",
    locationBase: "Münster, Germany",
    relocation: false,
    hoursFlexibility: "high",
    employmentTypes: ["freelance", "part-time-employment", "full-time-employment"],
    teamSize: "small-experienced",
    weeklyHours: "20–25",
    availability: {
      en: "Available for part-time (20–25 h/week), remote, with a flexible start.",
      de: "Verfügbar für Teilzeit (20–25 Std./Woche), remote, mit flexiblem Start.",
    } satisfies Bilingual,
  },

  dealbreakers: {
    en: [
      "Onsite-only roles / no remote",
      "Big-corp bureaucracy: heavy process, many layers, no ownership or autonomy",
    ],
    de: [
      "Reine Vor-Ort-Tätigkeit / kein Remote",
      "Konzern-Bürokratie: viel Prozess, viele Ebenen, kein Ownership bzw. keine Autonomie",
    ],
  } satisfies BilingualList,

  interests: {
    en: [
      "Agentic AI: multi-agent systems and typed tool-loops",
      "3D / immersive web (Three.js / React Three Fiber)",
      "Product-led startups & own SaaS (pagebee)",
      "Developer tooling & DX",
    ],
    de: [
      "Agentische KI: Multi-Agent-Systeme und typisierte Tool-Loops",
      "3D / immersives Web (Three.js / React Three Fiber)",
      "Produktgetriebene Startups & eigenes SaaS (pagebee)",
      "Developer-Tooling & DX",
    ],
  } satisfies BilingualList,

  /** How the model maps evidence to a 0–10 score per dimension. */
  rubric: {
    en: [
      "Score each dimension 0–10 against this baseline. If there is no evidence yet for a dimension, omit it entirely. Do NOT guess.",
      "- tech_stack_fit: 10 = core stack (TypeScript, React/Next, Node, Three.js, agentic-AI / Anthropic SDK); 6 = adjacent JS/TS web; 3 = some overlap, different primary stack; 0 = no TypeScript or legacy-only.",
      "- remote_flex: 10 = fully remote; 5 = hybrid; 1 = onsite-only (also a dealbreaker). Add credit for genuine schedule flexibility.",
      "- work_style: 10 = high autonomy, real ownership, small experienced team, low process; 5 = mixed; 1 = big-corp bureaucracy with no ownership (dealbreaker).",
    ].join("\n"),
    de: [
      "Bewerte jede Dimension von 0–10 gegen diese Baseline. Liegt für eine Dimension noch keine Evidenz vor, lasse sie ganz weg. NICHT raten.",
      "- tech_stack_fit: 10 = Kern-Stack (TypeScript, React/Next, Node, Three.js, agentische KI / Anthropic SDK); 6 = angrenzendes JS/TS-Web; 3 = etwas Überschneidung, anderer Haupt-Stack; 0 = kein TypeScript oder nur Legacy.",
      "- remote_flex: 10 = voll remote; 5 = hybrid; 1 = nur vor Ort (zugleich Ausschlusskriterium). Pluspunkte für echte zeitliche Flexibilität.",
      "- work_style: 10 = hohe Autonomie, echtes Ownership, kleines erfahrenes Team, wenig Prozess; 5 = gemischt; 1 = Konzern-Bürokratie ohne Ownership (Ausschlusskriterium).",
    ].join("\n"),
  } satisfies Bilingual,
} as const;
