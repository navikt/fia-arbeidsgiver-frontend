import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { antallDeltakereDTO } from "@/app/_types/antallDeltakereDTO";
import { ETT_SEKUND_MS } from "@/utils/consts";

export function useAntallDeltakere({
  vertId,
  spørreundersøkelseId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
}): SWRResponse<antallDeltakereDTO> {
  const fetcher = (url: string) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        vertId,
      }),
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

  return useSWR<antallDeltakereDTO>(
    "/api/vert/antall-deltakere",
    fetcher,
    swrConfig,
  );
}
