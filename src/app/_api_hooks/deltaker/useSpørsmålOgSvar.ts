import useSWR, { SWRResponse } from "swr";
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";
import React from "react";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  temaId: number,
  spørsmålId: string,
): SWRResponse<SpørsmåloversiktDTO> {
  const [harLastet, setHarLastet] = React.useState(false);
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
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
    `/api/${spørreundersøkelseId}/deltaker/${temaId}/${spørsmålId}`,
    fetcher,
    {
      refreshInterval: harLastet ? undefined : 2000,
    },
  );
}
