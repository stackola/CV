export type Dictionary = {
  meta: { title: string; description: string };
  nav: { work: string; cv: string; about: string; contact: string; privacy: string; imprint: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    availability: string;
    cta: string;
    secondary: string;
  };
  track: { eyebrow: string; cvLink: string };
  featured: { eyebrow: string; title: string; viewAll: string };
  skills: {
    title: string;
    frontend: string;
    backend: string;
    tools: string;
    core: string;
    working: string;
    familiar: string;
    other: string;
    languages: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewLive: string;
    viewRepo: string;
    back: string;
    tech: string;
    role: string;
    year: string;
    client: string;
    studie: string;
    wip: string;
    keyDecision: string;
    technicalDeepDive: string;
    technicalDeepDiveLead: string;
    jumpToTechnical: string;
    clientHeading: string;
    ownHeading: string;
  };
  cv: {
    title: string;
    subtitle: string;
    availability: string;
    download: string;
    clientsLabel: string;
    education: string;
    experience: string;
    skills: string;
    other: string;
    languages: string;
    driving: string;
    misc: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    back: string;
    readMore: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
  };
  footer: { rights: string; built: string; source: string };
  common: { theme: string; light: string; dark: string; system: string };
  chat: ChatDict;
};

export type ChatDict = {
  launcher: string;
  title: string;
  subtitle: string;
  greeting: string;
  starters: string[];
  placeholder: string;
  send: string;
  matchScore: string;
  overall: string;
  notRated: string;
  thinking: string;
  preparing: string;
  reset: string;
  close: string;
  submit: string;
  next: string;
  back: string;
  skip: string;
  privacy: string;
  consentText: string;
  consentAccept: string;
  textPlaceholder: string;
  disclaimer: string;
  dimensions: {
    tech_stack_fit: string;
    remote_flex: string;
    work_style: string;
  };
  errors: {
    rate_limited: string;
    too_long: string;
    unavailable: string;
    server_error: string;
    bad_request: string;
  };
};

export const de: Dictionary = {
  meta: {
    title: "Willi Krappen - Fullstack Product Engineer",
    description:
      "Portfolio und Lebenslauf von Willi Krappen, Fullstack Product Engineer aus Münster.",
  },
  nav: {
    work: "Projekte",
    cv: "Lebenslauf",
    about: "Über mich",
    contact: "Kontakt",
    privacy: "Datenschutz",
    imprint: "Impressum",
  },
  hero: {
    eyebrow: "Fullstack Product Engineer",
    title: "Ich baue Web-Produkte vom Konzept bis ins Detail.",
    subtitle:
      "Seit über zehn Jahren entwickle ich Software für Agenturen, Start-ups und Vereine. Schwerpunkt: TypeScript, React/Next.js, Node und 3D-Web.",
    availability: "Verfügbar für Teilzeit (20–25 Std./Woche) · Remote",
    cta: "Projekte ansehen",
    secondary: "Lebenslauf",
  },
  track: {
    eyebrow: "Auswahl an Kunden seit 2013",
    cvLink: "Vollständiger Lebenslauf",
  },
  featured: {
    eyebrow: "Ausgewählte Arbeiten",
    title: "Aktuelle Projekte",
    viewAll: "Alle Projekte ansehen",
  },
  skills: {
    title: "Stack & Skills",
    frontend: "Frontend",
    backend: "Backend",
    tools: "Tools & Skills",
    core: "Kern",
    working: "Aktiv im Einsatz",
    familiar: "Vorhanden",
    other: "Weitere Fähigkeiten",
    languages: "Sprachen",
  },
  projects: {
    title: "Projekte",
    subtitle:
      "Eine Auswahl an Arbeiten aus Festanstellung, Mitgründung und Kundenprojekten.",
    viewLive: "Live ansehen",
    viewRepo: "Repository",
    back: "Zurück zu allen Projekten",
    tech: "Technologien",
    role: "Rolle",
    year: "Jahr",
    client: "Kunde",
    studie: "Studie",
    wip: "WIP",
    keyDecision: "Schlüsselentscheidung",
    technicalDeepDive: "Technische Details",
    technicalDeepDiveLead: "Stack, Architektur, Trade-offs",
    jumpToTechnical: "Zu den technischen Details",
    clientHeading: "Kunden- & Firmenarbeit",
    ownHeading: "Eigene Produkte & Lab",
  },
  cv: {
    title: "Lebenslauf",
    subtitle: "Werdegang, Ausbildung und Fähigkeiten.",
    availability: "Verfügbar für Teilzeit (20–25 Std./Woche), remote. Auch als Freelance-Engagement.",
    download: "Lebenslauf als PDF",
    clientsLabel: "Kunden (Auswahl)",
    education: "Ausbildung",
    experience: "Erfahrung",
    skills: "Kenntnisse",
    other: "Weitere Fähigkeiten",
    languages: "Sprachen",
    driving: "Führerschein",
    misc: "Sonstiges",
  },
  experience: {
    eyebrow: "Berufliche Stationen",
    title: "Vita",
    subtitle:
      "Stationen aus Festanstellung und Mitgründung, vor dem aktuellen Produkt-Engineering-Fokus.",
    back: "Zurück zur Übersicht",
    readMore: "Mehr lesen",
  },
  contact: {
    title: "Kontakt",
    subtitle: "Sprich mich an für Projekte, Beratung oder einen Kaffee.",
    email: "E-Mail",
    phone: "Telefon",
    location: "Standort",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    built: "Gebaut mit Next.js und Tailwind.",
    source: "Quellcode auf GitHub",
  },
  common: {
    theme: "Theme",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
  },
  chat: {
    launcher: "Mit Willi-Bot chatten",
    title: "Willi-Bot",
    subtitle: "KI-Assistent · Antworten zu Willi & zur Passung",
    greeting:
      "Hi! Ich bin Willis KI-Assistent. Erzähl mir von deiner Rolle oder deinem Unternehmen, und ich sage dir ehrlich, wie gut Willi passt. Fragen zu seiner Erfahrung beantworte ich auch gern.",
    starters: [
      "Ich suche jemanden für eine Remote-React/Next.js-Stelle",
      "Welche Erfahrung hat Willi mit KI & Agenten?",
      "Welche Art von Arbeit sucht Willi gerade?",
    ],
    placeholder: "Beschreibe die Rolle oder stelle eine Frage …",
    send: "Senden",
    matchScore: "Match-Score",
    overall: "Gesamt",
    notRated: "Noch nicht bewertet",
    thinking: "Denkt nach …",
    preparing: "Frage wird vorbereitet …",
    reset: "Neu starten",
    close: "Schließen",
    submit: "Senden",
    next: "Weiter",
    back: "Zurück",
    skip: "Überspringen",
    privacy: "Datenschutz",
    consentText:
      "Bevor es losgeht: Deine Nachrichten werden zur Antwortgenerierung an Anthropic (USA) übermittelt. Diese Seite speichert den Chat nicht. Bitte keine sensiblen personenbezogenen Daten eingeben.",
    consentAccept: "Verstanden, Chat starten",
    textPlaceholder: "Deine Antwort …",
    disclaimer:
      "KI-Bot, Antworten können ungenau sein. Diese Seite speichert den Chat nicht, deine Nachrichten werden aber zur Antwortgenerierung an Anthropic (USA) übermittelt. Bitte keine sensiblen personenbezogenen Daten eingeben.",
    dimensions: {
      tech_stack_fit: "Tech-Stack-Passung",
      remote_flex: "Remote & Flexibilität",
      work_style: "Arbeitsweise & Kultur",
    },
    errors: {
      rate_limited: "Zu viele Nachrichten. Bitte versuche es später erneut.",
      too_long: "Diese Unterhaltung ist zu lang geworden. Bitte starte neu.",
      unavailable:
        "Der Chat ist gerade nicht verfügbar. Schreib Willi gern direkt eine E-Mail.",
      server_error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      bad_request: "Anfrage konnte nicht verarbeitet werden.",
    },
  },
};
