import { nesteSpørsmålDTO } from "@/app/_types/nesteSpørsmålDTO";
import useSWR, { SWRResponse } from "swr";
import React from "react";

export function useNesteSpørsmål(
  spørreundersøkelseId: string,
  nåværrendeSpørsmålId: string,
  vertId: string,
): SWRResponse<nesteSpørsmålDTO> {
  const random = React.useRef(Date.now()); // Vi bruker random for å stoppe SWR fra å cache.

  const fetcher = ([url]: [string]) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        nåværrendeSpørsmålId,
        vertId,
      }),
    }).then((res) => res.json());

  return useSWR<nesteSpørsmålDTO>(
    ["/api/vert/neste-sporsmal", random],
    fetcher,
    {
      refreshInterval: 1000,
    },
  );
}
