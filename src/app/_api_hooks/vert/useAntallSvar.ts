import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { antallSvarDTO } from "@/app/_types/antallDeltakereDTO";
import { ETT_SEKUND_MS } from "@/utils/consts";

export function useAntallSvar({
  spørreundersøkelseId,
  spørsmålId,
  vertId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  vertId: string;
}): SWRResponse<antallSvarDTO> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        spørsmålId,
        vertId,
      }),
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste antall deltakere");
    }
    return res.json();
  };

  const swrConfig: SWRConfiguration = {
    refreshInterval: ETT_SEKUND_MS,
    revalidateIfStale: true,
  };

  return useSWR<antallSvarDTO>("/api/vert/antall-svar", fetcher, swrConfig);
}
