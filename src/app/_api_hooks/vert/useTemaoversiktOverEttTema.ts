import useSWR, { SWRResponse } from "swr";
import { TemaoversiktDto } from "@/app/_types/temaoversiktDto";

export function useTemaoversiktOverEttTema(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: string,
): SWRResponse<TemaoversiktDto> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Kunne ikke laste temaoversikt for tema ${temaId}`);
    }
    return res.json();
  };
  return useSWR<TemaoversiktDto>(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}`,
    fetcher,
  );
}
