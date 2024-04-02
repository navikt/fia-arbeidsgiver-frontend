import useSWR, { SWRResponse } from "swr";
import { TemaoversiktDto } from "@/app/_types/temaoversiktDto";

export function useTemaoversikt(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<TemaoversiktDto[]> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste oversikt over temaer");
    }
    return res.json();
  };
  return useSWR<TemaoversiktDto[]>(
    `/api/${spørreundersøkelseId}/vert/${vertId}`,
    fetcher,
  );
}
