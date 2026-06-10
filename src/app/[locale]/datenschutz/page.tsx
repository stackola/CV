import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternates } from "@/lib/seo";

/**
 * Privacy policy (Datenschutzerklärung).
 *
 * Operator details are filled in. Have the document legally reviewed before
 * relying on it as a production privacy policy.
 */

type Block = { p: string } | { ul: string[] };
type Section = { h: string; blocks: Block[] };
type Content = { title: string; intro: string; sections: Section[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "de" ? "Datenschutzerklärung" : "Privacy Policy";
  return { title, alternates: alternates(locale as Locale, "/datenschutz"), robots: { index: false } };
}

const content: Record<Locale, Content> = {
  de: {
    title: "Datenschutzerklärung",
    intro:
      "Diese Erklärung informiert über die Verarbeitung personenbezogener Daten auf dieser Website, insbesondere durch den KI-Chatbot „Willi-Bot“.",
    sections: [
      {
        h: "1. Verantwortlicher",
        blocks: [
          {
            p: "Verantwortlich im Sinne der DSGVO ist: Willi Krappen, Südstr. 43, 48153 Münster, Deutschland. E-Mail: wkrappen91@yahoo.de.",
          },
        ],
      },
      {
        h: "2. Hosting & Server-Logfiles",
        blocks: [
          {
            p: "Die Website wird auf einem Server von DigitalOcean (VPS) betrieben. Beim Aufruf werden technisch notwendige Zugriffsdaten (u. a. IP-Adresse, Datum/Uhrzeit, abgerufene Ressource, User-Agent) verarbeitet.",
          },
          {
            p: "Rechtsgrundlage ist mein berechtigtes Interesse am sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Server-Logs werden nach 14 Tagen gelöscht.",
          },
        ],
      },
      {
        h: "3. KI-Chatbot „Willi-Bot“",
        blocks: [
          {
            p: "Diese Website bietet einen KI-Chatbot, der Fragen zu Willi Krappen beantwortet und – auf Basis von dir eingegebener Angaben – die Passung zu einer Stelle einschätzt.",
          },
          {
            p: "Verarbeitete Daten: die von dir im Chat eingegebenen Texte und ausgewählten Antworten. Diese können personenbezogene Daten enthalten, wenn du solche eingibst. Bitte gib keine sensiblen Daten (z. B. Gesundheits- oder andere besondere Datenkategorien nach Art. 9 DSGVO) ein.",
          },
          {
            p: "Speicherung: Der Chatverlauf wird von dieser Website nicht gespeichert; er verbleibt nur in deinem Browser und ist nach dem Schließen bzw. Neuladen verloren.",
          },
          {
            p: "Missbrauchs-/Kostenschutz: Zur Ratenbegrenzung wird deine IP-Adresse kurzzeitig und ausschließlich im Arbeitsspeicher des Servers verwendet. Sie wird nicht dauerhaft gespeichert und nicht an Anthropic übermittelt.",
          },
          {
            p: "Übermittlung an Anthropic: Zur Erzeugung der Antworten werden deine Chat-Nachrichten an meinen Auftragsverarbeiter Anthropic PBC, San Francisco, USA übermittelt und dort mit dem Modell „Claude“ verarbeitet. Mit Anthropic besteht ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO.",
          },
          {
            p: "Nach den Bedingungen der Anthropic-API werden über die API übermittelte Ein- und Ausgaben standardmäßig nicht zum Training der Modelle verwendet. Anthropic speichert die Daten nur für einen begrenzten Zeitraum von bis zu 30 Tagen.",
          },
          {
            p: "Rechtsgrundlage: deine Einwilligung bzw. die Durchführung deiner Anfrage durch die Nutzung des Chats (Art. 6 Abs. 1 lit. a bzw. b DSGVO) sowie mein berechtigtes Interesse an Betrieb und Sicherheit (Art. 6 Abs. 1 lit. f DSGVO).",
          },
        ],
      },
      {
        h: "4. Drittlandübermittlung (USA)",
        blocks: [
          {
            p: "Anthropic verarbeitet Daten in den USA. Als geeignete Garantie für die Übermittlung in ein Drittland dienen die EU-Standardvertragsklauseln (SCCs), die Bestandteil des Auftragsverarbeitungsvertrags mit Anthropic sind.",
          },
        ],
      },
      {
        h: "5. Lokale Speicherung im Browser",
        blocks: [
          {
            p: "Der Chat nutzt den Browser-Speicher (sessionStorage) ausschließlich, um sich zu merken, ob du das Fenster geschlossen hast. Es werden hierfür keine Tracking- oder Marketing-Cookies gesetzt.",
          },
        ],
      },
      {
        h: "6. Deine Rechte",
        blocks: [
          {
            p: "Dir stehen nach der DSGVO folgende Rechte zu:",
          },
          {
            ul: [
              "Auskunft (Art. 15)",
              "Berichtigung (Art. 16)",
              "Löschung (Art. 17)",
              "Einschränkung der Verarbeitung (Art. 18)",
              "Datenübertragbarkeit (Art. 20)",
              "Widerspruch (Art. 21)",
              "Widerruf erteilter Einwilligungen (Art. 7 Abs. 3)",
            ],
          },
          {
            p: "Zur Ausübung wende dich an den oben genannten Verantwortlichen.",
          },
        ],
      },
      {
        h: "7. Beschwerderecht",
        blocks: [
          {
            p: "Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für meinen Sitz ist dies die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).",
          },
        ],
      },
      {
        h: "8. Stand",
        blocks: [{ p: "Stand dieser Erklärung: 9. Juni 2026." }],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    intro:
      "This notice explains how personal data is processed on this website, in particular by the “Willi-Bot” AI chatbot.",
    sections: [
      {
        h: "1. Controller",
        blocks: [
          {
            p: "The controller under the GDPR is: Willi Krappen, Südstr. 43, 48153 Münster, Germany. Email: wkrappen91@yahoo.de.",
          },
        ],
      },
      {
        h: "2. Hosting & server logs",
        blocks: [
          {
            p: "The website runs on a server provided by DigitalOcean (VPS). On access, technically necessary log data is processed (incl. IP address, date/time, requested resource, user agent).",
          },
          {
            p: "The legal basis is my legitimate interest in secure, stable operation (Art. 6(1)(f) GDPR). Server logs are deleted after 14 days.",
          },
        ],
      },
      {
        h: "3. AI chatbot “Willi-Bot”",
        blocks: [
          {
            p: "This website offers an AI chatbot that answers questions about Willi Krappen and, based on details you enter, estimates the fit for a role.",
          },
          {
            p: "Data processed: the text and selected answers you enter in the chat. These may contain personal data if you provide it. Please do not enter sensitive data (e.g. health or other special categories under Art. 9 GDPR).",
          },
          {
            p: "Storage: this website does not store the chat transcript; it stays only in your browser and is gone after you close or reload the page.",
          },
          {
            p: "Abuse/cost protection: for rate limiting, your IP address is used briefly and only in the server’s memory. It is not stored persistently and is not sent to Anthropic.",
          },
          {
            p: "Transfer to Anthropic: to generate replies, your chat messages are sent to my processor Anthropic PBC, San Francisco, USA and processed there with the “Claude” model. A Data Processing Agreement (DPA) under Art. 28 GDPR is in place with Anthropic.",
          },
          {
            p: "Under the Anthropic API terms, inputs/outputs submitted via the API are not used to train the models by default. Anthropic retains the data only for a limited period of up to 30 days.",
          },
          {
            p: "Legal basis: your consent or performance of your request through use of the chat (Art. 6(1)(a)/(b) GDPR), plus my legitimate interest in operation and security (Art. 6(1)(f) GDPR).",
          },
        ],
      },
      {
        h: "4. Transfer to a third country (USA)",
        blocks: [
          {
            p: "Anthropic processes data in the USA. The transfer relies on the EU Standard Contractual Clauses (SCCs), which form part of the Data Processing Agreement with Anthropic.",
          },
        ],
      },
      {
        h: "5. Local browser storage",
        blocks: [
          {
            p: "The chat uses browser storage (sessionStorage) only to remember whether you closed the window. No tracking or marketing cookies are set for this.",
          },
        ],
      },
      {
        h: "6. Your rights",
        blocks: [
          { p: "Under the GDPR you have the following rights:" },
          {
            ul: [
              "Access (Art. 15)",
              "Rectification (Art. 16)",
              "Erasure (Art. 17)",
              "Restriction of processing (Art. 18)",
              "Data portability (Art. 20)",
              "Objection (Art. 21)",
              "Withdrawal of consent (Art. 7(3))",
            ],
          },
          { p: "To exercise these, contact the controller named above." },
        ],
      },
      {
        h: "7. Right to complain",
        blocks: [
          {
            p: "You have the right to lodge a complaint with a data protection supervisory authority. For my location this is the State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia (LDI NRW).",
          },
        ],
      },
      {
        h: "8. Last updated",
        blocks: [{ p: "This policy was last updated: 9 June 2026." }],
      },
    ],
  },
};

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  getDictionary(locale); // validates locale shape is loaded (consistent with other pages)
  const c = content[locale] ?? content.de;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{c.title}</h1>
      <p className="mt-3 text-[var(--color-muted-foreground)]">{c.intro}</p>

      <div className="mt-10 space-y-8">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-semibold tracking-tight">{s.h}</h2>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--color-foreground)]">
              {s.blocks.map((b, i) =>
                "ul" in b ? (
                  <ul key={i} className="ml-5 list-disc space-y-1 text-[var(--color-muted-foreground)]">
                    {b.ul.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="text-[var(--color-muted-foreground)]">
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
