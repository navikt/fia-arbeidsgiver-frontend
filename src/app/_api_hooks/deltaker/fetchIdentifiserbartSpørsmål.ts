"use client";

import { IdentifiserbartSpørsmålDTO } from "@/app/_types/SpørsmåloversiktDTO";

export function fetchIdentifiserbartSpørsmål(
  spørreundersøkelseId: string,
): Promise<IdentifiserbartSpørsmålDTO> {
  const fetcher = () =>
    fetch(`/api/${spørreundersøkelseId}/deltaker`, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Noe gikk galt med henting av første spørsmål.");
      }

      return res.json();
    });

  return fetcher();
}
