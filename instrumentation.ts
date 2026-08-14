// Texas-mock for lokal utvikling.
// Aktiveres kun i Node.js-runtime under development — aldri i prod eller e2e.
// Samme mønster som oasis sin egen example-app:
// https://github.com/navikt/oasis/blob/main/example-app/instrumentation.ts
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    process.env.NAIS_TOKEN_INTROSPECTION_ENDPOINT =
      "http://texas-local/api/v1/introspect";
    process.env.NAIS_TOKEN_EXCHANGE_ENDPOINT =
      "http://texas-local/api/v1/token/exchange";
    process.env.NAIS_TOKEN_ENDPOINT =
      "http://texas-local/api/v1/token";

    const { server } = await import("./mocks/texas");
    server.listen({ onUnhandledRequest: "bypass" });

    console.log("[dev] Texas mock aktivert");
  }
}
