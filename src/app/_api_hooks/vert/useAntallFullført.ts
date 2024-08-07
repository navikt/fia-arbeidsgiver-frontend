import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { ETT_SEKUND_MS } from "@/utils/consts";

/**
 * Hent antall brukere som har fullført (svart på alle spørsmål)
 *  enten på spørreundersøkelse eller tema (hvis temaId)
 * @param spørreundersøkelseId
 * @param temaId (optional)
 */

export function useAntallFullført({
  spørreundersøkelseId,
  temaId,
}: {
  spørreundersøkelseId: string;
  temaId?: number;
}): SWRResponse<number> {
  const fetcher = (url: string) => {
    return fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          temaId
            ? `Kunne ikke laste antall fullført for tema med id '${temaId}'`
            : `Kunne ikke laste antall fullført for spørreundersøkelse med id '${spørreundersøkelseId}'`,
        );
      }
      return res.json();
    });
  };

  const swrConfig: SWRConfiguration = {
    refreshInterval: ETT_SEKUND_MS,
    revalidateIfStale: true,
  };

  const endepunkt = temaId
    ? `/api/${spørreundersøkelseId}/vert/tema/${temaId}/antall-svar`
    : `/api/${spørreundersøkelseId}/vert/antall-fullfort`;

  return useSWR<number>(endepunkt, fetcher, swrConfig);
}
