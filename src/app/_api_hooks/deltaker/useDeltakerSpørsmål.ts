import useSWR, { SWRResponse } from "swr";
import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";
import React from "react";

export function useDeltakerSpørsmål(
  spørreundersøkelseId: string,
  temaId: number,
  spørsmålId: string,
): SWRResponse<DeltakerSpørsmålDto> {
  const [harLastet, setHarLastet] = React.useState(false);
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (res.status === 410) {
        throw new Error("Spørreundersøkelsen er avsluttet.");
      }
      if (!res.ok) {
        throw new Error("Noe gikk galt. Prøv å laste siden på nytt.");
      }

      if (res.status === 202) {
        return undefined;
      }

      setHarLastet(true);
      return res.json();
    });

  return useSWR(
    `/api/${spørreundersøkelseId}/deltaker/tema/${temaId}/sporsmal/${spørsmålId}`,
    fetcher,
    {
      refreshInterval: harLastet ? undefined : 2000,
    },
  );
}
