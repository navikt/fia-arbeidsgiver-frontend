import useSWR, { SWRResponse } from "swr";
import { TemaoversiktDTO } from "@/app/_types/TemaoversiktDTO";

export function useTemaoversiktOverEttTema(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: number,
): SWRResponse<TemaoversiktDTO> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Kunne ikke laste tema ${temaId}`);
    }
    return res.json();
  };
  return useSWR<TemaoversiktDTO>(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}`,
    fetcher,
  );
}
