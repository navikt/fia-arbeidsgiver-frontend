import useSWR, { SWRResponse } from "swr";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";
import { Tema } from "@/app/_types/tema";
import { temaTilURL } from "@/utils/spørreundersøkelsesUtils";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  tema: Tema,
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
    `/api/${spørreundersøkelseId}/deltaker/${temaTilURL(tema)}/${spørsmålId}`,
    fetcher,
    {
      refreshInterval: 2000,
    },
  );
}
