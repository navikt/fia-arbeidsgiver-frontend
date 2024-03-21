"use client";

import { IdentifiserbartSpørsmål } from "@/app/_types/identifiserbartSpørsmål";

export function fetchIdentifiserbartSpørsmål(
  spørreundersøkelseId: string,
): Promise<IdentifiserbartSpørsmål> {
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
