import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { ETT_SEKUND_MS } from "@/utils/consts";

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
  const fetcher = (url: string) => {
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
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/${spørsmålId}/antall-svar`,
    fetcher,
    swrConfig,
  );
}
