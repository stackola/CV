import type { Locale } from "@/i18n/config";
import { Badge } from "@/components/ui/badge";

type Phase = {
  name: string;
  body: Record<Locale, string>;
};

const processPhases: Phase[] = [
  {
    name: "1. Discovery",
    body: {
      de: "Gemeinsam mit den Fachleuten des Kunden Materialien und Ideen sammeln, Lern-Ziele klären, Storyboard erstellen, Projektplan und Budget passen.",
      en: "Collect materials and ideas with subject-matter experts, clarify learning objectives, build a storyboard, match a project plan to budget.",
    },
  },
  {
    name: "2. Capture",
    body: {
      de: "Aufnahmen für 360°-Material und 3D-Inhalte am Kundenstandort, mit Originalmaschinen oder Schulungsumgebungen.",
      en: "Capture 360° footage and 3D content on-site with the customer, using real machines or training environments.",
    },
  },
  {
    name: "3. Engine Build",
    body: {
      de: "Aufbau der VR-Szene in Unreal Engine, mit Tutorial-Modus, Hands-On-Übungen und Prüfungs-Phase. Öffentliche Web-Projekte wie die Zoo-App und die Museums-Guides entstanden separat in React und Three.js.",
      en: "Build the VR scene in Unreal Engine, with a tutorial mode, hands-on exercises and an assessment phase. Public web projects such as the zoo app and the museum guides were built separately in React and Three.js.",
    },
  },
  {
    name: "4. Workshops & Iteration",
    body: {
      de: "Regelmäßige Workshops mit dem Kunden über Teams und Miro; Anregungen und Korrekturen fließen in terminierte Meilensteine ein.",
      en: "Regular workshops with the customer over Teams and Miro; feedback and corrections flow into scheduled milestones.",
    },
  },
  {
    name: "5. Deployment & Hardware",
    body: {
      de: "Inbetriebnahme der VR-Hardware vor Ort beim Kunden, Schulung des internen Personals, damit VR-Expertise dauerhaft im Haus ist.",
      en: "On-site setup of VR hardware at customer locations, training internal staff so a VR expert is always available in-house.",
    },
  },
  {
    name: "6. Tracking",
    body: {
      de: "Lernfortschritte pro Person landen in einem Dashboard mit Abschluss-Raten und Verlauf, sichtbar für die HR- oder Schulungsabteilung.",
      en: "Per-person learning progress lands in a dashboard with completion rates and history, visible to HR or the training team.",
    },
  },
];

const references: Record<Locale, { title: string; body: string }[]> = {
  de: [
    {
      title: "Windmöller & Hölscher - VR-Wartungstraining",
      body: "Training für Wartungs- und Rüstprozesse am virtuellen Maschinen-Twin in Unreal Engine. Abläufe lassen sich gefahrlos üben, ohne eine echte Anlage stillzulegen.",
    },
    {
      title: "Allwetterzoo Münster - interaktive Besucher-App",
      body: "Web-App in React und Three.js: Tier- und Gehege-Infos, 360°-Inhalte und Lernspiele, vom CO₂-Spar-Spiel bis zum Tier-Sammel- und Bestimmungsspiel.",
    },
    {
      title: "Pferdemuseum Münster - Kutschfahrt-Simulator",
      body: "Hardware-Software-Kombination fürs Westfälische Pferdemuseum: In einer virtuellen Pferdekutsche geht es durch eine Landschaft. Die Zügel sind mechanisch mit einem Joystick verbunden, das Lenken fühlt sich dadurch wie echtes Kutschfahren an. Simulation in Unreal Engine.",
    },
    {
      title: "Stiftsdorf Asbeck - interaktiver Guide",
      body: "Digitaler Rundgang durch das historische Stiftsdorf Asbeck (Legden) und sein Stiftsmuseum, umgesetzt als Web-Projekt.",
    },
  ],
  en: [
    {
      title: "Windmöller & Hölscher - VR maintenance training",
      body: "Training for maintenance and changeover procedures on a virtual machine twin in Unreal Engine. Procedures can be practised safely without taking a real production line offline.",
    },
    {
      title: "Allwetterzoo Münster - interactive visitor app",
      body: "Web app in React and Three.js: animal and enclosure info, 360° content and learning games, from a CO₂-saving game to an animal identification and collection game.",
    },
    {
      title: "Horse Museum Münster - carriage ride simulator",
      body: "A hardware and software combination for the Westphalian Horse Museum: a virtual horse-drawn carriage rides through a landscape. The reins are mechanically linked to a joystick, so steering feels like really driving a carriage. Simulation built in Unreal Engine.",
    },
    {
      title: "Collegiate village of Asbeck - interactive guide",
      body: "Digital tour through the historic collegiate village of Asbeck (Legden) and its museum, delivered as a web project.",
    },
  ],
};

const myRole: Record<Locale, string[]> = {
  de: [
    "Mitgründer der Lemonverse GmbH (Münster, 2021).",
    "Technische Leitung über die Lebensspanne der Firma: Stack-Auswahl, Build-Pipelines, Engine-Arbeit.",
    "VR-Engine-Arbeit in Unreal Engine für die Schulungsprojekte; Web-Projekte (Zoo-App, Museums-Guides) in React und Three.js.",
    "Aufbau des Lern-Fortschritts-Dashboards (React-Frontend + Tracking-Backend), das mit den Schulungsprojekten mitgeliefert wurde.",
    "Hardware-Inbetriebnahme bei Kunden inklusive Schulung des internen Trainingspersonals.",
    "Direkt-Kontakt mit Industrie- und Forschungs-Stakeholdern: Anforderungs-Workshops, Storyboarding, Milestone-Reviews.",
  ],
  en: [
    "Co-founder of Lemonverse GmbH (Münster, 2021).",
    "Technical lead across the company's lifespan: stack choice, build pipelines, engine work.",
    "VR engine work in Unreal Engine for the training projects; web projects (zoo app, museum guides) in React and Three.js.",
    "Built the learning-progress dashboard (React frontend + tracking backend) shipped with the training projects.",
    "On-site hardware setup at customer locations, including training of internal trainers.",
    "Direct contact with industry and research stakeholders: requirements workshops, storyboarding, milestone reviews.",
  ],
};

const labels = {
  de: {
    aboutTitle: "Über die Firma",
    aboutBody:
      "Lemonverse war eine Münsteraner Agentur, spezialisiert auf VR-, AR- und Mixed-Reality-Anwendungen mit Schwerpunkt Industrie-Schulungen. Die Umsetzung lief von Storyboard bis zur VR-Brille im Werk.",
    referencesTitle: "Referenz-Projekte",
    referencesLead:
      "Eine Auswahl ausgelieferter Projekte, von der Industrie-Schulung bis zur Museums-Installation.",
    processTitle: "Prozess: von der Idee zur Brille",
    processLead:
      "Sechs Phasen, von Workshop bis Hardware-Setup. Regelmäßige Meilensteine.",
    roleTitle: "Meine Rolle",
    deploymentTitle: "Hinweis zur Firma",
    deploymentBody:
      "Lemonverse wurde 2024 abgewickelt. lemonverse.de ist eine reduzierte Marketing-Site aus der aktiven Zeit; sie zeigt das Produktportfolio von damals und ist hier nur als Referenz verlinkt. Kunden-Materialien stehen unter NDA und sind auf der Live-Site nicht öffentlich.",
  },
  en: {
    aboutTitle: "About the company",
    aboutBody:
      "Lemonverse was a Münster agency specialised in VR, AR and mixed-reality applications focused on industrial training. Delivery ran from storyboard to the VR headset on the factory floor.",
    referencesTitle: "Selected projects",
    referencesLead:
      "A selection of delivered projects, from industrial training to museum installations.",
    processTitle: "Process: from idea to headset",
    processLead:
      "Six phases, from workshop to hardware setup. Regular milestones.",
    roleTitle: "My role",
    deploymentTitle: "Note on the company",
    deploymentBody:
      "Lemonverse was wound down in 2024. lemonverse.de is a reduced marketing site from the active period; it shows the product portfolio of the time and is linked here for reference only. Customer materials are under NDA and not public on the live site.",
  },
};

export function LemonverseContent({ locale }: { locale: Locale }) {
  const l = labels[locale];

  return (
    <div className="space-y-20">
      <Section title={l.aboutTitle}>
        <p className="text-base leading-relaxed text-[var(--color-muted-foreground)]">
          {l.aboutBody}
        </p>
      </Section>

      <Section title={l.referencesTitle} lead={l.referencesLead}>
        <div className="grid gap-4 md:grid-cols-2">
          {references[locale].map((item) => (
            <NoteCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>

      <Section title={l.processTitle} lead={l.processLead}>
        <ol className="space-y-3">
          {processPhases.map((p) => (
            <li
              key={p.name}
              className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
            >
              <Badge className="shrink-0">{p.name.split(".")[0]}</Badge>
              <div>
                <p className="text-sm font-semibold tracking-tight">
                  {p.name.replace(/^[0-9]+\.\s*/, "")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {p.body[locale]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={l.roleTitle}>
        <ul className="space-y-2">
          {myRole[locale].map((line, idx) => (
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
