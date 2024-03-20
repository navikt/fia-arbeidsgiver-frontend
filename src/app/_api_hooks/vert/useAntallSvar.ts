import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { ETT_SEKUND_MS } from "@/utils/consts";
import React from "react";

export function useAntallSvar({
  vertId,
  spørreundersøkelseId,
  temaId,
  spørsmålId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
  temaId: string;
  spørsmålId: string;
}): SWRResponse<number> {
  const random = React.useRef(Date.now()); // Vi bruker random for å stoppe SWR fra å cache.

  const fetcher = ([url]: [string]) => {
    return fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Kunne ikke laste antall svar");
      }
      return res.json();
    });
  };

  const swrConfig: SWRConfiguration = {
    refreshInterval: ETT_SEKUND_MS,
    revalidateIfStale: true,
  };
  return useSWR<number>(
    [
      `/api/vert/${spørreundersøkelseId}/${vertId}/${temaId}/${spørsmålId}/antall-svar`,
      random,
    ],
    fetcher,
    swrConfig,
  );
}
