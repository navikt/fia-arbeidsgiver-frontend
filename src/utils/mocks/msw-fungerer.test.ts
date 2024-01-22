import { expect, test } from "bun:test";
import { http } from "msw";

import { setupServer } from "msw/node";

const handlers = [
  // Intercept the "GET /resource" request.
  http.get(`http://localhost:3000/harryPotter`, () => {
    return new Response(JSON.stringify({ harry: "potter" }));
  }),
];
const server = setupServer(...handlers);

server.listen();

test("yer a wizard", async () => {
  const hp = await fetch("http://localhost:3000/harryPotter");
  const json = await hp.json();
  expect(json).toEqual({ harry: "potter" });
});
