"use client";

import { forsteSporsmalDTO } from "@/app/_types/nye-api/forsteSporsmalDTO";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_UNDERSØKELSE_URL } = require("@/utils/urls");

export function fetchDeltakerForsteSporsmal(
  spørreundersøkelseId: string,
): Promise<forsteSporsmalDTO> {
  const fetcher = () =>
    fetch(API_DELTAKER_UNDERSØKELSE_URL(spørreundersøkelseId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Noe gikk galt med henting av første spørsmål.");
      }

      return res.json();
    });

  return fetcher();
}
