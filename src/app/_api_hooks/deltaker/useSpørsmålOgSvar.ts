import useSWR, { SWRResponse } from "swr";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  temaId: number,
  spørsmålId: string,
): SWRResponse<SpørsmålsoversiktDto> {
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
      return res.json();
    });

  return useSWR(
    `/api/${spørreundersøkelseId}/deltaker/${temaId}/${spørsmålId}`,
    fetcher,
    {
      refreshInterval: 2000,
    },
  );
}
