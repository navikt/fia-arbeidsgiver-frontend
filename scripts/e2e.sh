#!/usr/bin/env bash
#
# Lokal wrapper for å kjøre Playwright E2E-testene i det pinnede
# Playwright-imaget (docker-compose.e2e.yaml). Rendering skjer i samme
# browser/fonter som i CI, slik at baseline-skjermbildene under
# tests/__snapshots__/ matcher CI pikselvis.
#
# Bruk:
#   ./scripts/e2e.sh            # kjør testene mot committede baseline-bilder
#   ./scripts/e2e.sh --update   # generer/oppdater baseline-bilder
set -euo pipefail

cd "$(dirname "$0")/.."

COMPOSE_FILE="docker-compose.e2e.yaml"
UPDATE=""

for arg in "$@"; do
  case "$arg" in
    --update|-u)
      UPDATE="1"
      ;;
    *)
      echo "Ukjent argument: $arg" >&2
      echo "Bruk: ./scripts/e2e.sh [--update]" >&2
      exit 2
      ;;
  esac
done

# GitHub Packages-token for @navikt-pakker. docker compose substituerer
# NODE_AUTH_TOKEN fra miljøet inn i compose-fila, og container-scriptet skriver
# den til .npmrc inne i containeren.
if [[ -z "${NODE_AUTH_TOKEN:-}" ]]; then
  echo "ADVARSEL: NODE_AUTH_TOKEN er ikke satt. Installasjon av @navikt-pakker kan feile." >&2
fi

export E2E_UPDATE="${UPDATE}"

cleanup() {
  echo "==> Rydder opp (docker compose down)"
  docker compose -f "${COMPOSE_FILE}" down --remove-orphans
}
trap cleanup EXIT

if [[ -n "${UPDATE}" ]]; then
  echo "==> Genererer/oppdaterer baseline-skjermbilder"
else
  echo "==> Kjører E2E-tester mot committede baseline-skjermbilder"
fi

# Start stacken detached. Healthchecks i compose sørger for at wonderwall og
# playwright venter til authserver er klar, slik at en oppstarts-race ikke
# river ned kjøringen.
docker compose -f "${COMPOSE_FILE}" up -d

# Følg loggen fra playwright-containeren mens testene kjører.
docker compose -f "${COMPOSE_FILE}" logs -f --no-log-prefix playwright &
LOGS_PID=$!

# Vent på at playwright-containeren blir ferdig og hent exit-koden derfra.
EXIT_CODE="$(docker wait "$(docker compose -f "${COMPOSE_FILE}" ps -q playwright)")"

kill "${LOGS_PID}" 2>/dev/null || true

echo "==> Playwright avsluttet med kode ${EXIT_CODE}"
exit "${EXIT_CODE}"
