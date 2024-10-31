"use client";

import { SpørreundersøkelseInfoDto } from "@/app/_types/SpørreundersøkelseInfoDto";
import { SWRResponse } from "swr";
import useSWRImmutable from "swr/immutable";

export function useSpørreundersøkelseInfo(
  spørreundersøkelseId: string,
): SWRResponse<SpørreundersøkelseInfoDto> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Kunne ikke hente virksomhetsnavn for spørreundersøkelse med id '${spørreundersøkelseId}'`,
        );
      }
      return res.json();
    });

  return useSWRImmutable<SpørreundersøkelseInfoDto>(
    `/api/${spørreundersøkelseId}/vert/kontekst`,
    fetcher,
  );
}
