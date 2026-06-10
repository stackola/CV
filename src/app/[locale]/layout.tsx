import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollGlow } from "@/components/scroll-glow";
import { LangSync } from "@/components/lang-sync";
import { ChatWidget } from "@/components/chat/chat-widget";
import { personalInfo, skills, education } from "@/data/cv";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const OG_LOCALE: Record<Locale, string> = { de: "de_DE", en: "en_US" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const og = OG_LOCALE[locale as Locale] ?? "de_DE";
  return {
    openGraph: {
      locale: og,
      alternateLocale: locales
        .map((l) => OG_LOCALE[l])
        .filter((l) => l !== og),
    },
  };
}

function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.role[locale],
      url: `https://prototyp.ms/${locale}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: personalInfo.location,
        addressCountry: "DE",
      },
      alumniOf: education.map((e) => ({
        "@type": "EducationalOrganization",
        name: e.title[locale],
      })),
      knowsAbout: [...skills.core, ...skills.working],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(locale as Locale)),
        }}
      />
      <LangSync locale={locale as Locale} />
      <ScrollGlow />
      <Nav locale={locale as Locale} dict={dict} />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
      <ChatWidget locale={locale as Locale} dict={dict.chat} />
    </>
  );
}
