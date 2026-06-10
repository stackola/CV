"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        Error
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
        Etwas ist schiefgelaufen · Something went wrong
      </h1>
      <button
        onClick={reset}
        className="mt-8 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
      >
        Erneut versuchen · Try again
      </button>
    </div>
  );
}
