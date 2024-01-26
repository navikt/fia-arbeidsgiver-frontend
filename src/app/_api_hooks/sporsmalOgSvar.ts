import { spørreundersøkelseDTO } from "../_types/sporreundersokelseDTO";
import { getCookie } from "cookies-next";
import { SESSION_ID_STORAGE_KEY } from "@/utils/consts";
import useSWR, { SWRResponse } from "swr";
import setupMSWForBrowser from "@/utils/mocks/setupMSWForBrowser";

export function useSpørreundersøkelse(
  spørreundersøkelseId: string
): SWRResponse<spørreundersøkelseDTO> {
  setupMSWForBrowser();

  const sesjonsId = getCookie(SESSION_ID_STORAGE_KEY);
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
    }).then((res) => res.json());

  return useSWR<spørreundersøkelseDTO>("/api/sporsmal-og-svar", fetcher);
}
