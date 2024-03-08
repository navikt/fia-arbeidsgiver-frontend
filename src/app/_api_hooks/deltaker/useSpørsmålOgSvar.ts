import useSWR, { SWRResponse } from "swr";
import CookieHandler from "@/utils/CookieHandler";
import { spørsmålOgSvarDTO } from "@/app/_types/sporreundersokelseDTO";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  spørsmålId: string,
): SWRResponse<spørsmålOgSvarDTO> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sesjonsId: CookieHandler.sesjonsID,
        spørreundersøkelseId,
      }),
    }).then((res) => res.json());

  return useSWR(`/api/sporsmal-og-svar/${spørsmålId}`, fetcher);
}
