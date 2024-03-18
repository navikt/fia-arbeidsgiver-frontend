import useSWR, { SWRResponse } from "swr";
import { sporsmalOgSvarDTO } from "@/app/_types/nye-api/sporsmalOgSvarDTO";
import React from "react";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  temaId: string,
  spørsmålId: string,
  shouldPoll = false,
): SWRResponse<sporsmalOgSvarDTO> {
  const random = React.useRef(Date.now()); // Vi bruker random for å stoppe SWR fra å cache.

  const fetcher = ([url]: [string]) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (res.status === 202) {
        throw "Spørsmål er ikke åpnet";
      }
      return res.json();
    });

  return useSWR(
    [`/api/deltaker/${spørreundersøkelseId}/${temaId}/${spørsmålId}`, random],
    fetcher,
    shouldPoll
      ? {
          refreshInterval: 1000,
        }
      : {},
  );
}
