import useSWR, { SWRResponse } from "swr";
import CookieHandler from "@/utils/CookieHandler";
import { SpørsmålDTO } from "@/app/_types/SpørsmålDTO";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  spørsmålId: string,
): SWRResponse<SpørsmålDTO> {
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
