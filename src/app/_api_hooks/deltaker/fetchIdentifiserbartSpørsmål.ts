"use client";

import { IdentifiserbartSpørsmålDto } from "@/app/_types/IdentifiserbartSpørsmålDto";

export function fetchIdentifiserbartSpørsmål(
  spørreundersøkelseId: string,
): Promise<IdentifiserbartSpørsmålDto> {
  const fetcher = () =>
    fetch(`/api/${spørreundersøkelseId}/deltaker`, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Noe gikk galt med henting av neste spørsmål.");
      }

      return res.json();
    });

  return fetcher();
}
