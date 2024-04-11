import useSWR, { SWRResponse } from "swr";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";
import React from "react";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  temaId: number,
  spørsmålId: string,
): SWRResponse<SpørsmålsoversiktDto> {
  const [harLastet, setHarLastet] = React.useState(false);
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (res.status === 202) {
        return undefined;
      }

      if (!res.ok) {
        throw new Error("Noe gikk galt.");
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
