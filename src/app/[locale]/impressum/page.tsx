import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternates } from "@/lib/seo";

/**
 * Legal notice (Impressum) per § 5 DDG / § 18 MStV.
 * Operator details are filled in. Get it legally reviewed before relying on it.
 */

type Block = { p: string } | { ul: string[] };
type Section = { h: string; blocks: Block[] };
type Content = { title: string; sections: Section[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "de" ? "Impressum" : "Legal notice";
  return { title, alternates: alternates(locale as Locale, "/impressum"), robots: { index: false } };
}

const content: Record<Locale, Content> = {
  de: {
    title: "Impressum",
    sections: [
      {
        h: "Angaben gemäß § 5 DDG",
        blocks: [{ p: "Willi Krappen\nSüdstr. 43\n48153 Münster\nDeutschland" }],
      },
      {
        h: "Kontakt",
        blocks: [{ p: "E-Mail: wkrappen91@yahoo.de" }],
      },
      {
        h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        blocks: [{ p: "Willi Krappen\nSüdstr. 43\n48153 Münster" }],
      },
      {
        h: "Umsatzsteuer-Identifikationsnummer",
        blocks: [{ p: "USt-IdNr. gemäß § 27a UStG: DE323016980" }],
      },
      {
        h: "EU-Streitschlichtung",
        blocks: [
          {
            p: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Meine E-Mail-Adresse findest du oben.",
          },
          {
            p: "Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
          },
        ],
      },
      {
        h: "Haftung für Inhalte und Links",
        blocks: [
          {
            p: "Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität wird jedoch keine Gewähr übernommen. Für Inhalte verlinkter externer Seiten ist stets deren jeweiliger Anbieter verantwortlich.",
          },
        ],
      },
    ],
  },
  en: {
    title: "Legal notice",
    sections: [
      {
        h: "Information pursuant to § 5 DDG",
        blocks: [{ p: "Willi Krappen\nSüdstr. 43\n48153 Münster\nGermany" }],
      },
      {
        h: "Contact",
        blocks: [{ p: "Email: wkrappen91@yahoo.de" }],
      },
      {
        h: "Responsible for content (§ 18(2) MStV)",
        blocks: [{ p: "Willi Krappen\nSüdstr. 43\n48153 Münster" }],
      },
      {
        h: "VAT identification number",
        blocks: [{ p: "VAT ID under § 27a UStG: DE323016980" }],
      },
      {
        h: "EU dispute resolution",
        blocks: [
          {
            p: "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. My email address is above.",
          },
          {
            p: "I am not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
          },
        ],
      },
      {
        h: "Liability for content and links",
        blocks: [
          {
            p: "The contents of these pages were created with the greatest care. However, no guarantee is given for accuracy, completeness or timeliness. The respective provider is always responsible for the content of linked external sites.",
          },
        ],
      },
    ],
  },
};

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  getDictionary(locale);
  const c = content[locale] ?? content.de;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{c.title}</h1>

      <div className="mt-10 space-y-8">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-semibold tracking-tight">{s.h}</h2>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {s.blocks.map((b, i) =>
                "ul" in b ? (
                  <ul key={i} className="ml-5 list-disc space-y-1">
                    {b.ul.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="whitespace-pre-line">
                    {b.p}
                  </p>
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
