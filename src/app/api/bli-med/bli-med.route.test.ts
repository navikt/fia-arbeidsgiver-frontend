/**
 * @jest-environment node
 */
import { POST } from "@/app/api/bli-med/route";
import { NextRequest } from "next/server";

test("validerer content-type", async () => {
  const requestWithoutContentType = new NextRequest("http://test", {
    method: "POST",
    body: JSON.stringify({ spørreundersøkelseId: "1" }),
  });

  const response = await POST(requestWithoutContentType);
  const body = await response.json();

  expect(response.status).toBe(400);
  expect(await body).toEqual({ error: "Invalid content-type" });
});
