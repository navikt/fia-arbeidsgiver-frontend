import useSWR, { SWRResponse } from "swr";
import { temastatusDTO } from "@/app/_types/sporreundersokelseDTO";
import CookieHandler from "@/utils/CookieHandler";
import { ETT_SEKUND_MS } from "@/utils/consts";

export function useTemastatus(
  spørreundersøkelseId: string,
): SWRResponse<temastatusDTO> {
  const cookieHandler = new CookieHandler(spørreundersøkelseId);
  const sesjonsId = cookieHandler.sesjonsID;
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        sesjonsId,
      }),
    }).then((res) => {
      if (res.status === 400 || res.status === 403) {
        throw new Error("Får ikke hentet status på spørreundersøkelsen"); //
      }
      if (res.status === 410) {
        throw new Error("Denne spørreundersøkelsen er avsluttet");
      }
      if (res.status === 500) {
        throw new Error("Kunne ikke hente tema: Mangler status");
      }
      if (!res.ok) {
        throw new Error(`Noe gikk galt. ${res.status}`);
      }

      return res.json();
    });

  return useSWR<temastatusDTO>("/api/temastatus", fetcher, {
    refreshInterval: ETT_SEKUND_MS,
  });
}
