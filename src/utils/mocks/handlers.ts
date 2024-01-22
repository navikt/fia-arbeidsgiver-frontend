import { http } from "msw";

export const handlers = [
  // Intercept the "GET /resource" request.
  http.post(`http://localhost:3000/test`, () => {
    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
    return new Response(JSON.stringify({ test: "test" }));
  }),
];
