import useSWR, { SWRResponse } from "swr";
import CookieHandler from "@/utils/CookieHandler";
import { sporsmalOgSvarDTO } from "@/app/_types/nye-api/sporsmalOgSvarDTO";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  temaId: string,
  spørsmålId: string,
  shouldPoll = false,
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
    }).then((res) => {
      if (res.status === 202) {
        throw "Spørsmål er ikke åpnet";
      }
      return res.json();
    });

  return useSWR(
    `/api/deltaker/${spørreundersøkelseId}/${temaId}/${spørsmålId}`,
    fetcher,
    shouldPoll
      ? {
          refreshInterval: 1000,
        }
      : {},
  );
}
