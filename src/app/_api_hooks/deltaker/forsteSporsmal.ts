"use client";

import { StartDto } from "@/app/_types/nye-api/startDto";

export function fetchDeltakerForsteSporsmal(
  spørreundersøkelseId: string,
): Promise<StartDto> {
  const fetcher = () =>
    fetch(`/api/deltaker/${spørreundersøkelseId}`, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Noe gikk galt med henting av første spørsmål.");
      }

      return res.json();
    });

  return fetcher();
}
