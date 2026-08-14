// Peker Texas-endepunktene mot mock-serveren (`pnpm mocks`) i lokal utvikling.
// Aktiveres kun i Node.js-runtime under development — aldri i prod eller e2e,
// der endepunktene settes av Nais / docker-compose.e2e.yaml.
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    const texas = "http://127.0.0.1:3100/texas";
    process.env.NAIS_TOKEN_INTROSPECTION_ENDPOINT = `${texas}/token/introspect`;
    process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT = `${texas}/token/exchange`;
    process.env.NAIS_TOKEN_ENDPOINT = `${texas}/token/m2m`;

    console.log("[dev] Texas-endepunkter peker mot mock-serveren på 3100");
  }
}
