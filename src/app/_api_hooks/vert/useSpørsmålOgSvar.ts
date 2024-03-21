import useSWR, { SWRResponse } from "swr";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: string,
  spørsmålId: string,
): SWRResponse<SpørsmålsoversiktDto> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (res.status === 202) {
        throw new Error(
          "Spørsmål er ikke åpnet Dette burde ikke skje for vert, noe er galt",
        );
      }
      return res.json();
    });

  return useSWR(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/${spørsmålId}`,
    fetcher,
  );
}
