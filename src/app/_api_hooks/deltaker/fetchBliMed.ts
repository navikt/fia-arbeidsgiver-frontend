"use client";

import CookieHandler from "@/utils/CookieHandler";
import { bliMedDTO } from "@/app/_types/bliMedDTO";

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
        if (res.status === 403 || res.status === 400) {
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
