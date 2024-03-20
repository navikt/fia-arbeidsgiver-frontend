import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { ETT_SEKUND_MS } from "@/utils/consts";
import React from "react";

export function useAntallDeltakere({
  vertId,
  spørreundersøkelseId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
}): SWRResponse<number> {
  const random = React.useRef(Date.now()); // Vi bruker random for å stoppe SWR fra å cache.

  const fetcher = ([url]: [string]) => {
    return fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Kunne ikke laste antall deltakere");
      }
      return res.json();
    });
  };

  const swrConfig: SWRConfiguration = {
    refreshInterval: ETT_SEKUND_MS,
    revalidateIfStale: true,
  };
  return useSWR<number>(
    [`/api/vert/${spørreundersøkelseId}/${vertId}/antall-deltakere`, random],
    fetcher,
    swrConfig,
  );
}
