import { nesteSpørsmålDTO } from "@/app/_types/nesteSpørsmålDTO";
import CookieHandler from "@/utils/CookieHandler";
import React from "react";
import useSWR, { SWRResponse } from "swr";

export function useNesteSpørsmål(
  spørreundersøkelseId: string,
  nåværendeSpørsmålId: string,
): SWRResponse<nesteSpørsmålDTO> {
  const cookieHandler = new CookieHandler(spørreundersøkelseId);
  const sesjonsId = cookieHandler.sesjonsID;
  const random = React.useRef(Date.now()); // Vi bruker random for å stoppe SWR fra å cache.

  const fetcher = ([url]: [string]) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        sesjonsId,
        nåværendeSpørsmålId,
      }),
    }).then((res) => res.json());

  // Vi bruker random for å stoppe SWR fra å cache.
  return useSWR<nesteSpørsmålDTO>(["/api/neste-sporsmal", random], fetcher, {
    refreshInterval: 1000,
  });
}
