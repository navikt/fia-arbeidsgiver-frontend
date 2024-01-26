"use client";

import { bliMedDTO } from "../_types/bliMedDTO";
import { setCookie } from "cookies-next";
import { COOKIE_MAX_AGE, SESSION_ID_STORAGE_KEY } from "@/utils/consts";
import setupMSWForBrowser from "@/utils/mocks/setupMSWForBrowser";

export function fetchBliMed(spørreundersøkelseId: string) {
  setupMSWForBrowser();

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
      .then((res) => res.json())
      .then((data: bliMedDTO) => {
        const nySessionID = data.sesjonsId;
        setCookie(SESSION_ID_STORAGE_KEY, nySessionID, {
          maxAge: COOKIE_MAX_AGE,
        });
        return nySessionID;
      });

  return fetcher();
}
