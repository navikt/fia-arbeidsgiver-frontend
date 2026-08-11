#!/usr/bin/env bash
#
# Lokal wrapper for å kjøre Playwright E2E-testene i det pinnede
# Playwright-imaget (docker-compose.e2e.yaml). Rendering skjer i samme
# browser/fonter som i CI, slik at baseline-skjermbildene under
# tests/__snapshots__/<arch>/ matcher CI pikselvis.
#
# Baseline-skjermbilder lagres per arkitektur (amd64/arm64), siden de to
# rendrer med subpiksel-forskjeller.
#
# Bruk:
#   ./scripts/e2e.sh                 # kjør mot amd64-baseline (som CI)
#   ./scripts/e2e.sh --arm           # kjør på native arm64 (raskt på Apple Silicon)
#   ./scripts/e2e.sh --update        # generer/oppdater baseline for gjeldende arkitektur
#   ./scripts/e2e.sh --update --arm  # generer/oppdater arm64-baseline
#   ./scripts/e2e.sh --update --all  # generer/oppdater baseline for både amd64 og arm64
set -euo pipefail

cd "$(dirname "$0")/.."

COMPOSE_FILE="docker-compose.e2e.yaml"
UPDATE=""
ARM=""
ALL=""

for arg in "$@"; do
  case "$arg" in
    --update|-u)
      UPDATE="1"
      ;;
    --arm|-a)
      ARM="1"
      ;;
    --all)
      ALL="1"
      ;;
    *)
      echo "Ukjent argument: $arg" >&2
      echo "Bruk: ./scripts/e2e.sh [--update] [--arm] [--all]" >&2
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

# --all genererer baseline for begge arkitekturer og innebærer --update.
if [[ -n "${ALL}" ]]; then
  UPDATE="1"
fi

export E2E_UPDATE="${UPDATE}"

# Hver arkitektur får sitt eget compose-prosjekt slik at de arkitektur-
# spesifikke volumene (node_modules/.next/pnpm) holdes adskilt.
STARTED_PROJECTS=()

cleanup() {
  echo "==> Rydder opp (docker compose down)"
  for project in "${STARTED_PROJECTS[@]:-}"; do
    [[ -n "${project}" ]] || continue
    docker compose -p "${project}" -f "${COMPOSE_FILE}" down --remove-orphans || true
  done
}
trap cleanup EXIT

# run_suite <platform> <arch>: starter stacken for én arkitektur, følger
# playwright-loggen og returnerer containerens exit-kode.
run_suite() {
  local platform="$1" arch="$2"
  local project="fia-arbeidsgiver-frontend-e2e-${arch}"
  STARTED_PROJECTS+=("${project}")

  export E2E_PLATFORM="${platform}"
  export E2E_ARCH="${arch}"

  echo "==> Kjører E2E (platform=${platform}, arch=${arch})"

  # Start stacken detached. Healthchecks i compose sørger for at wonderwall og
  # playwright venter til authserver er klar, slik at en oppstarts-race ikke
  # river ned kjøringen.
  docker compose -p "${project}" -f "${COMPOSE_FILE}" up -d

  # Følg loggen fra playwright-containeren mens testene kjører.
  docker compose -p "${project}" -f "${COMPOSE_FILE}" logs -f --no-log-prefix playwright &
  local logs_pid=$!

  # Vent på at playwright-containeren blir ferdig og hent exit-koden derfra.
  local code
  code="$(docker wait "$(docker compose -p "${project}" -f "${COMPOSE_FILE}" ps -q playwright)")"

  kill "${logs_pid}" 2>/dev/null || true

  # Rydd opp denne arkitekturens stack før en eventuell neste kjøring.
  docker compose -p "${project}" -f "${COMPOSE_FILE}" down --remove-orphans

  echo "==> Playwright (arch=${arch}) avsluttet med kode ${code}"
  return "${code}"
}

if [[ -n "${ALL}" ]]; then
  echo "==> Genererer/oppdaterer baseline-skjermbilder for både amd64 og arm64"
  OVERALL=0
  run_suite "linux/amd64" "amd64" || OVERALL=$?
  run_suite "linux/arm64" "arm64" || OVERALL=$?
  echo "==> Ferdig (samlet exit-kode ${OVERALL})"
  exit "${OVERALL}"
fi

if [[ -n "${ARM}" ]]; then
  # Native arm64 -> ingen emulering (QEMU/Rosetta), raskt på Apple Silicon.
  case "$(uname -m)" in
    arm64|aarch64) PLATFORM="linux/arm64"; ARCH="arm64" ;;
    *)
      echo "ADVARSEL: verten er ikke arm64 ($(uname -m)); bruker amd64." >&2
      PLATFORM="linux/amd64"; ARCH="amd64"
      ;;
  esac
else
  # amd64 er standard for pikselmatch mot CI.
  PLATFORM="linux/amd64"; ARCH="amd64"
fi

if [[ -n "${UPDATE}" ]]; then
  echo "==> Genererer/oppdaterer baseline-skjermbilder (arch=${ARCH})"
else
  echo "==> Kjører E2E-tester mot committede baseline-skjermbilder (arch=${ARCH})"
fi

run_suite "${PLATFORM}" "${ARCH}"
