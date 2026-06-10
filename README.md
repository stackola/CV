# prototyp.ms — CV & Portfolio

Bilingual (DE/EN) portfolio and CV of Willi Krappen, live at [prototyp.ms](https://prototyp.ms). Next.js 15 (App Router), React 19, TypeScript strict, Tailwind 4.

## Architecture

- **i18n** — compile-time dictionaries (`src/i18n/dictionaries/{de,en}.ts`), fully typed via a single `Dictionary` type. `middleware.ts` picks the locale (cookie → `Accept-Language` → `de`) and redirects unlocalized paths to `/{locale}/…`. No runtime lookups.
- **Content as data** — CV stations, skills and projects live in `src/data/{cv,projects,baseline}.ts` and feed the pages, the chat grounding and the printable PDF, so everything stays in sync from one source.
- **Willi-Bot chat** (`src/lib/chat/*`, `src/app/api/chat/route.ts`) — streaming chat over NDJSON using the Anthropic SDK (`claude-sonnet-4-6`). The CV/baseline grounding is serialized byte-stable and marked with an ephemeral `cache_control` breakpoint, so the whole tools+system prefix prompt-caches across requests. Two presentational tools (match scoring, question cards), no server-side execution. In-memory per-IP/per-session sliding-window rate limits plus a global daily budget (single PM2 instance by design).
- **SEO** — per-locale metadata, `hreflang` alternates (`src/lib/seo.ts`), JSON-LD person schema, sitemap/robots/manifest/OG image routes.

## Printable CV (PDF)

`/print/cv` renders a print-optimized German Lebenslauf from the same data files. Regenerate the downloadable PDF after content changes:

```sh
npm run build && npx next start -p 3199 &
chromium --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/Lebenslauf-Willi-Krappen.pdf \
  http://localhost:3199/print/cv
```

## Development

```sh
cp .env.example .env.local   # add ANTHROPIC_API_KEY
npm install
npm run dev
```

## Deployment

`./deploy.sh` builds the standalone bundle and rsyncs it to the VPS, where PM2 runs it behind nginx (`./deploy.sh -y` to skip the confirmation). A smoke test curls the live site afterwards.
