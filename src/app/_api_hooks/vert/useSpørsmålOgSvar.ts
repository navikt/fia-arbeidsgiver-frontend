import useSWR, { SWRResponse } from "swr";
import { SpørsmålDTO } from "@/app/_types/SpørsmålDTO";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  spørsmålId: string,
  vertId: string,
): SWRResponse<SpørsmålDTO> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        vertId,
      }),
    }).then((res) => res.json());

  return useSWR(`/api/vert/sporsmal-og-svar/${spørsmålId}`, fetcher);
}
