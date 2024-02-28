import useSWR, { SWRResponse } from "swr";
import { ETT_SEKUND_MS } from "@/utils/consts";
import { SpørreundersøkelseStatusDTO } from "@/app/_types/SpørreundersøkelseStatusDTO";

export function useKartleggingstatus(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<SpørreundersøkelseStatusDTO> {
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
    }).then((res) => {
      if (res.status === 400 || res.status === 403) {
        throw new Error("Får ikke hentet status på spørreundersøkelsen"); //
      }
      if (res.status === 410) {
        throw new Error("Denne spørreundersøkelsen er avsluttet");
      }
      if (res.status === 500) {
        throw new Error("Kunne ikke hente kategori: Mangler status");
      }
      if (!res.ok) {
        throw new Error(`Noe gikk galt. ${res.status}`);
      }

      return res.json();
    });

  return useSWR<SpørreundersøkelseStatusDTO>(
    "/api/vert/kartleggingstatus",
    fetcher,
    {
      refreshInterval: ETT_SEKUND_MS,
    },
  );
}
