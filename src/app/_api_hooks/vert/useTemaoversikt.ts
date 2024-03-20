import useSWR, { SWRResponse } from "swr";
import { TemaoversiktDto } from "@/app/_types/temaoversiktDto";

export function useTemaoversikt(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<TemaoversiktDto[]> {
  const fetcher = (url: string) => {
    return fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Kunne ikke laste temaoversikt");
      }
      return res.json();
    });
  };

  return useSWR<TemaoversiktDto[]>(
    `/api/vert/${spørreundersøkelseId}/${vertId}`,
    fetcher,
  );
}
