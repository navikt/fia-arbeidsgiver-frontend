# fia-arbeidsgiver-frontend

Frontend for kartleggingsverktøy

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Forhåndskrav

### Installer bun

```shell
brew tap oven-sh/bun
brew install bun@1.0.23
```

(ikke installer 1.0.25, da denne er buggy)

### Sjekk minimum node versjon

`node -v` må være >= `18.17.x`

Oppdater til ny node ved å feks bruke `nvm`:

```shell
nvm install 18.18.2
nvm use 18.18.2
```

## Getting Started

1. Sett opp en miljøvariabel som heter `NODE_AUTH_TOKEN=<token-med-leserettigheter-i-gpr`.
2. Installer avhengigheter med `bun install`
3. Start utviklingsserveren med `./run.sh` eller `bun dev` og `bun run mocks` i separate terminaler (se under).
4. Åpne appen ved å gå til [http://localhost:3000](http://localhost:3000)

## run.sh eller separate terminaler?

Du kan velge mellom å kjøre både mocks og frontend med `./run.sh` og å kjøre dem separat.

### Separate terminaler (anbefalt)

Du kan også kjøre to terminaler, hvor du kjører mocks og frontend separat. Dette vil gi deg litt mer kontroll, og du vil ikke oppleve de samme problemene med prosesser som fremdeles kjører i bakgrunnen etter avslutning.
Frontend startes med `bun dev` og mocks startes med `bun run mocks`.

### run.sh

Å kjøre med run.sh er "enklere" men kan føre til noen problemer. Du vil kunne ende opp med prosesser som fremdeles kjører etter at du har avsluttet.
Du kan avslutte prosessene som kjører i bakgrunnen med `./run.sh -ke`.
