"use client";

import { bliMedDTO } from "../_types/bliMedDTO";
import { setCookie } from "cookies-next";
import { COOKIE_MAX_AGE, SESSION_ID_STORAGE_KEY } from "@/utils/consts";

import { http } from "msw";

async function setupMSW() {
  if (typeof window !== "undefined") {
    const { setupWorker } = await import("msw/browser");

    const handlers = [
      // Intercept the "GET /resource" request.
      http.post(`http://localhost:3000/api/bli-med-ekte`, () => {
        return new Response(JSON.stringify({ harry: "potter" }));
      }),
    ];
    const worker = setupWorker(...handlers);

    worker.start();
  }
}

export function fetchBliMed(spørreundersøkelseId: string) {
  const fetcher = () =>
    fetch("/api/bli-med", {
      //Endre til /api/bli-med-ekte for å hente mocken.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
      }),
    })
      .then((res) => res.json())
      .then((data: bliMedDTO) => {
        const nySessionID = data.sesjonsId;
        setCookie(SESSION_ID_STORAGE_KEY, nySessionID, {
          maxAge: COOKIE_MAX_AGE,
        });
        return nySessionID;
      });

  return setupMSW().then(() => {
    return fetcher();
  });
}
