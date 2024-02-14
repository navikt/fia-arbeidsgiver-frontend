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
3. Start utviklingsserveren med `./run.sh` eller `bun dev` og `bun run mocks` i separate terminaler.
4. Åpne appen ved å gå til [http://localhost:3000](http://localhost:3000)
