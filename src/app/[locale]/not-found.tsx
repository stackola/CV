import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
        Seite nicht gefunden · Page not found
      </h1>
      <p className="mt-3 max-w-md text-[var(--color-muted-foreground)]">
        Diese Seite existiert nicht. · This page doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
      >
        ← Startseite · Home
      </Link>
    </div>
  );
}
