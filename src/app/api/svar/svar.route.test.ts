import { POST } from "@/app/api/svar/route";
import { expect, test } from "bun:test";
import { NextRequest } from "next/server";

test("validerer content-type", async () => {
  const requestWithoutContentType = new NextRequest("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify({
      spørreundersøkelseId: "1",
      sesjonsId: "1",
      spørsmålId: "1",
      svarId: "1",
    }),
  });

  const response = await POST(requestWithoutContentType);
  const body = await response.json();

  expect(response.status).toBe(400);
  expect(await body).toEqual({ error: "Invalid content-type" });
});
