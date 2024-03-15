"use client";

import { forsteSporsmalDTO } from "@/app/_types/nye-api/forsteSporsmalDTO";

export function fetchDeltakerForsteSporsmal(
  spørreundersøkelseId: string,
  sesjonsId: string,
): Promise<forsteSporsmalDTO> {
  const fetcher = () =>
    fetch(`/api/deltaker/${spørreundersøkelseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sesjonsId,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Noe gikk galt med henting av første spørsmål.");
      }

      return res.json();
    });

  return fetcher();
}
