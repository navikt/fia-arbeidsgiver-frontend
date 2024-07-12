import useSWR, { SWRResponse } from "swr";
import { TemaDto } from "@/app/_types/TemaDto";

export function useTemaoversikter(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<TemaDto[]> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste oversikt over temaer");
    }
    return res.json();
  };
  return useSWR<TemaDto[]>(
    `/api/${spørreundersøkelseId}/vert/${vertId}`,
    fetcher,
  );
}
