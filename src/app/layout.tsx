import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prototyp.ms"),
  title: {
    default: "Willi Krappen - Fullstack Product Engineer",
    template: "%s - Willi Krappen",
  },
  description:
    "Portfolio and CV of Willi Krappen, fullstack product engineer based in Münster, Germany.",
  openGraph: {
    type: "website",
    siteName: "Willi Krappen",
    title: "Willi Krappen - Fullstack Product Engineer",
    description:
      "Portfolio and CV of Willi Krappen, fullstack product engineer based in Münster, Germany.",
    url: "https://prototyp.ms",
    locale: "de_DE",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Willi Krappen - Fullstack Product Engineer",
    description:
      "Portfolio and CV of Willi Krappen, fullstack product engineer based in Münster, Germany.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
