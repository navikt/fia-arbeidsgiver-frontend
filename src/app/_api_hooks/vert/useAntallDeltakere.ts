import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { ETT_SEKUND_MS } from "@/utils/consts";

export function useAntallDeltakere({
  vertId,
  spørreundersøkelseId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
}): SWRResponse<number> {
  const fetcher = (url: string) => {
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
    `/api/${spørreundersøkelseId}/vert/${vertId}/antall-deltakere`,
    fetcher,
    swrConfig,
  );
}
