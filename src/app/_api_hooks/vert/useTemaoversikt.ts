import useSWR, { SWRResponse } from "swr";
import { TemaoversiktDTO } from "@/app/_types/TemaoversiktDTO";

export function useTemaoversikt(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<TemaoversiktDTO[]> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste oversikt over temaer");
    }
    return res.json();
  };
  return useSWR<TemaoversiktDTO[]>(
    `/api/${spørreundersøkelseId}/vert/${vertId}`,
    fetcher,
  );
}
