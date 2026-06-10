import type { Metadata } from "next";
import {
  driving,
  education,
  experience,
  languages,
  misc,
  personalInfo,
  skills,
} from "@/data/cv";

/**
 * Print source for the German Lebenslauf PDF. Rendered to
 * public/Lebenslauf-Willi-Krappen.pdf via headless Chromium (see README),
 * so the PDF always stays in sync with the data in src/data/cv.ts.
 */
export const metadata: Metadata = {
  title: "Lebenslauf - Willi Krappen",
  robots: { index: false, follow: false },
};

const CONTACT = {
  address: ["Südstraße 43", "48153 Münster"],
  born: "geb. 22. Oktober 1991",
  email: "wkrappen91@yahoo.de",
  phone: "01577-140-79-81",
  web: "prototyp.ms",
  github: "github.com/stackola",
};

const AVAILABILITY =
  "Verfügbar: Teilzeit (20–25 Std./Woche) · Remote · Anstellung oder Freelance";

const LINKS = ["prototyp.ms", "pagebee.de", "drones.prototyp.ms", "github.com/stackola"];

const ACCENT = "#e02d20";

export default function PrintCVPage() {
  return (
    <div className="bg-white font-sans text-[10pt] leading-snug text-neutral-900">
      <style>{`
        /* The site defaults to dark mode; the printed canvas must stay light. */
        html { color-scheme: light !important; background: #fff !important; }
        body { background: #fff !important; }
        @page { size: A4; margin: 14mm 16mm; }
        @media print {
          a { color: inherit; text-decoration: none; }
        }
      `}</style>
      <div className="mx-auto max-w-[180mm] py-8 print:py-0">
        <header className="flex items-start justify-between gap-8">
          <div>
            <h1
              className="text-[26pt] font-bold uppercase leading-none tracking-[0.08em]"
              style={{ color: ACCENT }}
            >
              Willi
              <br />
              Krappen
            </h1>
            <p className="mt-2 text-[11pt] text-neutral-700">
              Fullstack Product Engineer
            </p>
          </div>
          <div className="text-right text-[9pt] leading-relaxed text-neutral-700">
            {CONTACT.address.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p>{CONTACT.born}</p>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.phone}</p>
            <p className="font-medium" style={{ color: ACCENT }}>
              {CONTACT.web}
            </p>
            <p>{CONTACT.github}</p>
          </div>
        </header>

        <p
          className="mt-5 rounded border px-3 py-1.5 text-[9.5pt] font-medium"
          style={{ borderColor: ACCENT, color: ACCENT }}
        >
          {AVAILABILITY}
        </p>

        <PrintSection title="Ausbildung">
          {education.map((e) => (
            <Row key={e.period} period={e.period} title={e.title.de} detail={e.detail?.de} />
          ))}
        </PrintSection>

        <PrintSection title="Erfahrung">
          {experience.map((e) => (
            <Row
              key={e.period}
              period={e.period}
              title={e.title.de}
              detail={e.detail?.de}
              clients={e.clients}
            />
          ))}
        </PrintSection>

        <PrintSection title="Kenntnisse">
          <div className="grid grid-cols-3 gap-6">
            <SkillCol title="Kern" items={skills.core} />
            <SkillCol title="Aktiv im Einsatz" items={skills.working} />
            <SkillCol title="Vorhanden" items={skills.familiar} />
          </div>
        </PrintSection>

        <PrintSection title="Weitere Fähigkeiten">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <ColTitle>Sprachen</ColTitle>
              <ul className="mt-1.5 space-y-0.5 text-[9.5pt]">
                {languages.map((l) => (
                  <li key={l.name.de}>
                    {l.name.de} - {l.level.de}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ColTitle>Führerschein</ColTitle>
              <p className="mt-1.5 text-[9.5pt]">{driving.de}</p>
            </div>
            <div>
              <ColTitle>Sonstiges</ColTitle>
              <ul className="mt-1.5 space-y-0.5 text-[9.5pt]">
                {misc.map((m) => (
                  <li key={m.de}>{m.de}</li>
                ))}
              </ul>
            </div>
          </div>
        </PrintSection>

        <footer className="mt-6 border-t border-neutral-300 pt-3 text-[9pt] text-neutral-600">
          <p>
            Web: {LINKS.join(" · ")}. Projekte, Code-Beispiele und technische
            Deep-Dives auf prototyp.ms.
          </p>
          <p className="mt-1">
            {personalInfo.location}, {new Date().getFullYear()}, {personalInfo.name}
          </p>
        </footer>
      </div>
    </div>
  );
}

function PrintSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid-page">
      <h2
        className="border-b pb-1 text-[11pt] font-bold uppercase tracking-[0.12em]"
        style={{ color: ACCENT, borderColor: ACCENT }}
      >
        {title}
      </h2>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function Row({
  period,
  title,
  detail,
  clients,
}: {
  period: string;
  title: string;
  detail?: string;
  clients?: string[];
}) {
  return (
    <div className="mb-2.5 grid grid-cols-[26mm_1fr] gap-4 break-inside-avoid">
      <p className="text-[9.5pt] text-neutral-500">{period}</p>
      <div>
        <p className="text-[10pt] font-semibold">{title}</p>
        {detail && <p className="mt-0.5 text-[9.5pt] text-neutral-700">{detail}</p>}
        {clients && (
          <p className="mt-0.5 text-[9.5pt] text-neutral-600">
            Kunden (Auswahl): {clients.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[9.5pt] font-bold text-neutral-800">{children}</p>;
}

function SkillCol({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <ColTitle>{title}</ColTitle>
      <ul className="mt-1.5 space-y-0.5 text-[9.5pt]">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
