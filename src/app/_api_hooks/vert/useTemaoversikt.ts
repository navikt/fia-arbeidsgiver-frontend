import useSWR, { SWRResponse } from "swr";
import { TemaDto } from "@/app/_types/TemaDto";

export function useTemaoversikt(
  spørreundersøkelseId: string,
  temaId: number,
): SWRResponse<TemaDto> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Kunne ikke laste tema ${temaId}`);
    }
    return res.json();
  };
  return useSWR<TemaDto>(
    `/api/${spørreundersøkelseId}/vert/tema/${temaId}`,
    fetcher,
  );
}
