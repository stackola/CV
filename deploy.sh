#!/usr/bin/env bash
#
# Deploy the CV/portfolio (Next.js standalone) over the existing production
# deployment at https://prototyp.ms.
#
# Flow: build locally -> rsync standalone + static + public + env -> pm2 restart.
# The app is NOT in git; this script is the deploy path.
#
# Usage:
#   ./deploy.sh            # build, confirm, deploy
#   ./deploy.sh -y         # skip the confirmation prompt
#   ./deploy.sh --skip-build   # deploy the existing .next build (no rebuild)
#
set -euo pipefail

# --- Config (matches the production VPS) -----------------------------------
HOST="root@plan.prototyp.ms"
APP_PATH="/opt/cv-portfolio"
PM2_NAME="cv-portfolio"
SITE_URL="https://prototyp.ms"

# --- Args ------------------------------------------------------------------
ASSUME_YES=0
SKIP_BUILD=0
for arg in "$@"; do
  case "$arg" in
    -y|--yes) ASSUME_YES=1 ;;
    --skip-build) SKIP_BUILD=1 ;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done

# Run from the repo root (this script's directory) regardless of CWD.
cd "$(dirname "$0")"

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
ok()   { printf '\033[32m✓ %s\033[0m\n' "$1"; }
warn() { printf '\033[33m! %s\033[0m\n' "$1"; }
die()  { printf '\033[31m✗ %s\033[0m\n' "$1" >&2; exit 1; }

# --- Pre-flight ------------------------------------------------------------
[ -f package.json ] || die "package.json not found — run from the repo root."
command -v rsync >/dev/null || die "rsync is required but not installed."
command -v ssh   >/dev/null || die "ssh is required but not installed."

bold "Deploying to ${HOST}:${APP_PATH} (${SITE_URL})"

if [ "$ASSUME_YES" -ne 1 ]; then
  read -r -p "This overwrites the LIVE site. Continue? [y/N] " reply
  case "$reply" in [yY]|[yY][eE][sS]) ;; *) die "Aborted." ;; esac
fi

# --- Build -----------------------------------------------------------------
if [ "$SKIP_BUILD" -eq 1 ]; then
  warn "Skipping build (--skip-build); deploying existing .next/"
else
  bold "Building (next build, standalone output)…"
  npm run build
fi

[ -f .next/standalone/server.js ] || die ".next/standalone/server.js missing — is output:'standalone' set and the build run?"
ok "Standalone build present"

# --- Sync ------------------------------------------------------------------
# Order matters: the standalone sync uses --delete-after and would remove
# .next/static, public/ and .env.local from the server (they aren't part of
# the standalone bundle), so we re-sync those AFTER it.
bold "Syncing standalone server…"
rsync -az --delete-after .next/standalone/ "${HOST}:${APP_PATH}/"
ok "server.js + node_modules synced"

bold "Syncing static assets…"
rsync -az --delete-after .next/static/ "${HOST}:${APP_PATH}/.next/static/"
ok ".next/static synced"

bold "Syncing public/…"
rsync -az --delete-after public/ "${HOST}:${APP_PATH}/public/"
ok "public synced"

# Runtime secrets: the /api/chat route needs ANTHROPIC_API_KEY at runtime.
# Next loads .env.local from the app's working directory on the server.
if [ -f .env.local ]; then
  bold "Syncing .env.local (runtime secrets)…"
  rsync -az .env.local "${HOST}:${APP_PATH}/.env.local"
  ok ".env.local synced"
else
  warn ".env.local not found locally — the chat API will be disabled (503) on the server."
fi

# --- Restart ---------------------------------------------------------------
bold "Restarting PM2 process '${PM2_NAME}'…"
ssh "${HOST}" "pm2 restart ${PM2_NAME} --update-env"
ok "PM2 restarted"

# --- Smoke test ------------------------------------------------------------
bold "Smoke test…"
sleep 2
code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "${SITE_URL}/en" || echo 000)"
if [ "$code" = "200" ]; then
  ok "${SITE_URL}/en -> 200"
else
  warn "${SITE_URL}/en -> ${code} (check 'ssh ${HOST} pm2 logs ${PM2_NAME}')"
fi

bold "Done. Live at ${SITE_URL}"
