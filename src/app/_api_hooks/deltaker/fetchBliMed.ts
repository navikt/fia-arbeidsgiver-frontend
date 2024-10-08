"use client";

import CookieHandler from "@/utils/CookieHandler";
import { BliMedDto } from "@/app/_types/BliMedDto";

export function fetchBliMed(spørreundersøkelseId: string) {
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
          throw new Error("Spørreundersøkelsen er avsluttet.");
        }
        if (res.status === 403 || res.status === 400) {
          throw new Error(
            "Vi får ikke koblet til spørreundersøkelsen. Er du sikker på at du skrev inn riktig lenke?",
          );
        }
        if (!res.ok) {
          throw new Error(
            "Noe gikk galt. Er du sikker på at du skrev inn riktig lenke?",
          );
        }

        return res.json();
      })
      .then((data: BliMedDto) => {
        if (data.spørreundersøkelseId !== spørreundersøkelseId) {
          throw new Error("Feil spørreundersøkelseId");
        } else {
          CookieHandler.nyUndersøkelse(spørreundersøkelseId);
        }
      });

  return fetcher();
}
