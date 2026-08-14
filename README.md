# fia-arbeidsgiver-frontend

Frontend for kartleggingsverktøy

## Forhåndskrav

### Installer pnpm

```shell
brew install pnpm
```

Eller med npm:

```shell
npm install -g pnpm
```

### Sjekk minimum node versjon

`node -v` må være >= `18.17.x`

Oppdater til ny node ved å feks bruke `nvm`:

```shell
nvm install 18.18.2
nvm use 18.18.2
```

## Getting Started

1. Sett opp en miljøvariabel som heter `NODE_AUTH_TOKEN=<token-med-leserettigheter-i-gpr`.
2. Installer avhengigheter med `pnpm install`
3. Start utviklingsserveren med `./run.sh` eller ved å kjøre mock server og dev server i separate terminaler (se under).
4. Åpne appen ved å gå til [http://localhost:2222](http://localhost:2222)

## run.sh eller separate terminaler?

Du kan velge mellom å kjøre både mocks og frontend med `./run.sh` og å kjøre dem separat.

### Separate terminaler (anbefalt)

Du kan også kjøre to terminaler, hvor du kjører mocks og frontend separat. Dette vil gi deg litt mer kontroll, og du vil ikke oppleve de samme problemene med prosesser som fremdeles kjører i bakgrunnen etter avslutning.
Først startes wonderwall med `docker-compose up -d`. Så startes frontend med `pnpm dev` og mocks startes med `pnpm mocks`.

### run.sh

Å kjøre med run.sh er "enklere" men kan føre til noen problemer. Du vil kunne ende opp med prosesser som fremdeles kjører etter at du har avsluttet.
Du kan avslutte prosessene som kjører i bakgrunnen med `./run.sh -ke`.
Det vil også være vanskeligere å se logg fra de forskjellige prosessene.

## Testing

- Enhetstester (Jest): `pnpm test`
- E2E-tester (Playwright): `./scripts/e2e.sh`

E2E-testene kjøres i et pinnet Playwright-image (`docker-compose.e2e.yaml`) så rendering matcher CI pikselvis. Skjermbilder lagres per arkitektur i `tests/__snapshots__/<arch>/`.

```shell
./scripts/e2e.sh            # kjør mot amd64-baseline (som CI)
./scripts/e2e.sh --arm      # kjør på native arm64 (raskt på Apple Silicon)
./scripts/e2e.sh --update   # oppdater baseline for gjeldende arkitektur (--all for begge)
```

CI bruker amd64-baseline, så oppdater og commit amd64-bildene når du endrer noe som påvirker utseendet. Testene kjøres også i CI via `.github/workflows/build-deploy.yaml`.

## Mocks

`pnpm mocks` starter en enkel Express-server (`mocks/server.ts`) på port 3100, som mocker backend-API-et frontend snakker med.

Rutene ligger i `mocks/routes/deltaker` og `mocks/routes/vert`. Hver rute har en `id`, en `url`, en HTTP-`method` og en liste med `variants`. Hver variant har en egen `id` og beskriver et mulig svar (f.eks. `success`, `feil-i-uuid`, `ukjent-spørreundersøkelse`). Som standard returnerer serveren varianten med `id: "success"` for hver rute.

### Admin-side i nettleser

Du kan også bytte variant fra en enkel nettside: [http://localhost:3100/\_\_mock/admin](http://localhost:3100/__mock/admin) viser alle ruter med en nedtrekksmeny for hver, der du kan velge hvilken variant ruten skal returnere.

### Bytte hvilken variant som returneres

Du kan bytte hvilken variant en rute skal returnere mens mock-serveren kjører, uten å restarte den.

List opp alle ruter og se hvilken variant som er aktiv:

```shell
curl http://localhost:3100/__mock/routes
```

Bytt aktiv variant for en rute:

```shell
curl -X PUT http://localhost:3100/__mock/<routeId>/<variantId>
```

For eksempel, for å få `vert-virksomhetsnavn`-ruten til å returnere feilvarianten `feil-i-uuid`:

```shell
curl -X PUT http://localhost:3100/__mock/vert-virksomhetsnavn/feil-i-uuid
```

Bytt tilbake til standardvarianten igjen:

```shell
curl -X PUT http://localhost:3100/__mock/vert-virksomhetsnavn/success
```
