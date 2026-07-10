#!/usr/bin/env bash
#
# Kjøres INNE i den pinnede Playwright-containeren (docker-compose.e2e.yaml).
# Installerer avhengigheter for linux/amd64, venter på at auth-stacken er oppe,
# og kjører Playwright-testene. Selve Next.js- og mocks-serveren startes av
# Playwright sin webServer-konfig.
set -euo pipefail

# GitHub Packages-auth for @navikt-pakker (token sendes inn som miljøvariabel).
if [[ -n "${NODE_AUTH_TOKEN:-}" ]]; then
  echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >"${HOME}/.npmrc"
fi

corepack enable
corepack prepare pnpm@11.6.0 --activate

echo "==> Installerer avhengigheter (linux/amd64)"
pnpm install --frozen-lockfile

echo "==> Venter på authserver (localhost:6969)"
for _ in $(seq 1 60); do
  if curl -sf -o /dev/null \
    http://localhost:6969/azure/.well-known/openid-configuration; then
    echo "authserver er oppe"
    break
  fi
  sleep 1
done

echo "==> Kjører Playwright-tester"
if [[ -n "${E2E_UPDATE:-}" ]]; then
  exec pnpm exec playwright test --update-snapshots
else
  exec pnpm exec playwright test
fi
