import useSWR, { SWRResponse } from "swr";
import { TemaResultatDTO } from "@/app/_types/TemaResultatDTO";

export function useTemaResultat(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: number,
): SWRResponse<TemaResultatDTO> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste resultater over temaer");
    }
    return res.json();
  };
  return useSWR<TemaResultatDTO>(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/resultater`,
    fetcher,
  );
}
