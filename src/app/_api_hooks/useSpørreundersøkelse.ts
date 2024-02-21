import useSWR, { SWRResponse } from "swr";
import { spørreundersøkelseDTO } from "@/app/_types/sporreundersokelseDTO";
import CookieHandler from "@/utils/CookieHandler";

export function useSpørreundersøkelse(
  spørreundersøkelseId: string,
): SWRResponse<spørreundersøkelseDTO> {
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
      if (!res.ok) {
        throw new Error("Noe gikk galt.");
      }

      return res.json();
    });

  return useSWR<spørreundersøkelseDTO>("/api/sporsmal-og-svar", fetcher);
}
