import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { antallDeltakereDTO } from "@/app/_types/antallDeltakereDTO";

const ONE_SECOND_MS = 1000;

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
    }).then((res) => res.json());
  };

  const swrConfig: SWRConfiguration = {
    refreshInterval: ONE_SECOND_MS,
    revalidateIfStale: true,
  };

  return useSWR<antallDeltakereDTO>(
    "/api/vert/antall-deltakere",
    fetcher,
    swrConfig,
  );
}
