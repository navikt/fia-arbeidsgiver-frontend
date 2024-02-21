import { spørsmålOgSvarDTO } from "../_types/sporreundersokelseDTO";
import useSWR, { SWRResponse } from "swr";
import CookieHandler from "@/utils/CookieHandler";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  spørsmålId: string,
): SWRResponse<spørsmålOgSvarDTO> {
  const cookieHandler = new CookieHandler(spørreundersøkelseId);
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sesjonsId: cookieHandler.sesjonsID,
        spørreundersøkelseId,
      }),
    }).then((res) => res.json());

  return useSWR(`/api/sporsmal-og-svar/${spørsmålId}`, fetcher);
}
