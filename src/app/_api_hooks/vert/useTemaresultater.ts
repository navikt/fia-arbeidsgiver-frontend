import useSWR, { SWRResponse } from "swr";
import { TemaResultatDto } from "@/app/_types/TemaResultatDto";

export function useTemaResultat(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: number,
): SWRResponse<TemaResultatDto> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste resultater for tema");
    }
    return res.json();
  };
  return useSWR<TemaResultatDto>(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/resultater`,
    fetcher,
  );
}
