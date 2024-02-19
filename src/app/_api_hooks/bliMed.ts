"use client";

import { bliMedDTO } from "../_types/bliMedDTO";
import { KARTLEGGING_FERDIG_ERROR } from "@/utils/consts";
import CookieHandler from "@/utils/CookieHandler";

export function fetchBliMed(spørreundersøkelseId: string) {
  const cookieHandler = new CookieHandler(spørreundersøkelseId);

  const fetcher = () =>
    fetch("/api/bli-med", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
      }),
    })
      .then((res) => {
        if (res.status === 410) {
          throw new Error(KARTLEGGING_FERDIG_ERROR);
        }
        if (res.status === 403) {
          throw new Error(
            "Vi får ikke koblet til spørreundersøkelsen. Er du sikker på at du skrev inn riktig lenke?",
          );
        }
        if (!res.ok) {
          throw new Error("Noe gikk galt.");
        }

        return res.json();
      })
      .then((data: bliMedDTO) => {
        const nySessionID = data.sesjonsId;

        cookieHandler.nyUndersøkelse(nySessionID);

        return nySessionID;
      });

  return fetcher();
}
