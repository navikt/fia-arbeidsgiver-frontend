import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import setupMSWForBrowser from "@/utils/mocks/setupMSWForBrowser";
import { antallDeltakereDTO } from "@/app/_types/antallDeltakereDTO";

export function useAntallDeltakere({
  vertId,
  spørreundersøkelseId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
}): SWRResponse<antallDeltakereDTO> {
  const fetcher = (url: string) => {
    return setupMSWForBrowser().then(() => {
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
    });
  };

  const swrConfig: SWRConfiguration = {
    refreshInterval: 2000,
    revalidateIfStale: true,
  };

  return useSWR<antallDeltakereDTO>(
    "/api/vert/antall-deltakere",
    fetcher,
    swrConfig
  );
}
