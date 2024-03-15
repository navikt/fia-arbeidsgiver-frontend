import useSWR, { SWRResponse } from "swr";
import CookieHandler from "@/utils/CookieHandler";
import { sporsmalOgSvarDTO } from "@/app/_types/nye-api/sporsmalOgSvarDTO";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  temaId: string,
  spørsmålId: string,
): SWRResponse<sporsmalOgSvarDTO> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sesjonsId: CookieHandler.sesjonsID,
      }),
    }).then((res) => res.json());

  return useSWR(
    `/api/deltaker/${spørreundersøkelseId}/${temaId}/${spørsmålId}`,
    fetcher,
  );
}
