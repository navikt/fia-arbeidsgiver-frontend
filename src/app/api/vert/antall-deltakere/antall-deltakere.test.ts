/**
 * @jest-environment node
 */

import "@testing-library/jest-dom";
import { POST } from "@/app/api/vert/antall-deltakere/route";
import { NextRequest } from "next/server";

test("validerer content-type", async () => {
  const requestWithoutContentType = new NextRequest("http://test", {
    method: "POST",
    body: JSON.stringify({ spørreundersøkelseId: "1", vertId: "7" }),
  });

  const response = await POST(requestWithoutContentType);
  const body = await response.json();

  expect(response.status).toBe(400);
  expect(await body).toEqual({ error: "Invalid content-type" });
});
