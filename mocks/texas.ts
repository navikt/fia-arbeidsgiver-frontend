// MSW-mock av Texas-sidecar for lokal utvikling.
// Brukes av instrumentation.ts — aldri i prod eller e2e.
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

function mockJwt(sub: string): string {
  const header = Buffer.from(
    JSON.stringify({ alg: "none", typ: "JWT" }),
  ).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({ sub, exp: Math.floor(Date.now() / 1000) + 3600 }),
  ).toString("base64url");
  return `${header}.${payload}.mock`;
}

export const server = setupServer(
  http.post("http://texas-local/api/v1/token/exchange", () =>
    HttpResponse.json({
      access_token: mockJwt("mock-obo"),
      expires_in: 3600,
      token_type: "Bearer",
    }),
  ),
  http.post("http://texas-local/api/v1/token", () =>
    HttpResponse.json({
      access_token: mockJwt("mock-m2m"),
      expires_in: 3600,
      token_type: "Bearer",
    }),
  ),
  http.post("http://texas-local/api/v1/introspect", () =>
    HttpResponse.json({ active: true }),
  ),
);
