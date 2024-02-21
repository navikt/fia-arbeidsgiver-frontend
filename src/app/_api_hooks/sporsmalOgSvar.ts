import {
  spørreundersøkelseDTO,
  spørsmålIndeksDTO,
  spørsmålOgSvarDTO,
} from "../_types/sporreundersokelseDTO";
import useSWR, { SWRResponse } from "swr";
import CookieHandler from "@/utils/CookieHandler";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  spørsmålId: string,
): SWRResponse<spørsmålOgSvarDTO> {
  const cookieHandler = new CookieHandler(spørreundersøkelseId);
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sesjonsId: cookieHandler.sesjonsID,
        spørreundersøkelseId,
      }),
    }).then((res) => res.json());

  return useSWR(`/api/sporsmal-og-svar/${spørsmålId}`, fetcher);
}

export function useVertSpørsmålIndeks(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<spørsmålIndeksDTO> {
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
    }).then((res) => res.json());

  return useSWR<spørsmålIndeksDTO>("/api/vert/gjeldende-sporsmal", fetcher);
}

export function postVertNesteSpørsmål(
  spørreundersøkelseId: string,
  vertId: string,
) {
  return fetch("/api/vert/neste-sporsmal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spørreundersøkelseId,
      vertId,
    }),
  }).then((res) => res.json());
}

export function useVertSpørreundersøkelse(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<spørreundersøkelseDTO> {
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
    }).then((res) => res.json());

  return useSWR<spørreundersøkelseDTO>("/api/vert/sporsmal-og-svar", fetcher);
}
