import {
  spørreundersøkelseDTO,
  spørsmålIndeksDTO,
} from "../_types/sporreundersokelseDTO";
import useSWR, { SWRResponse } from "swr";
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
    }).then((res) => res.json());

  return useSWR<spørreundersøkelseDTO>("/api/sporsmal-og-svar", fetcher);
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
