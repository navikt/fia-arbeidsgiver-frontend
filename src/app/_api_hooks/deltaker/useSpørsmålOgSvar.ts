import useSWR, { SWRResponse } from "swr";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  temaId: string,
  spørsmålId: string,
  shouldPoll = false,
): SWRResponse<SpørsmålsoversiktDto> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (res.status === 202) {
        throw new Error("Spørsmål er ikke åpnet");
      }

      if (!res.ok) {
        throw new Error("Noe gikk galt.");
      }
      return res.json();
    });

  return useSWR(
    `/api/${spørreundersøkelseId}/deltaker/${temaId}/${spørsmålId}`,
    fetcher,
    shouldPoll
      ? {
          refreshInterval: 1000,
        }
      : {},
  );
}
