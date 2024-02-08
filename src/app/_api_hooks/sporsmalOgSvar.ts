import {
  spørreundersøkelseDTO,
  spørsmålIndeksDTO,
} from "../_types/sporreundersokelseDTO";
import { getCookie } from "cookies-next";
import { SESSION_ID_STORAGE_KEY } from "@/utils/consts";
import useSWR, { SWRResponse } from "swr";
import setupMSWForBrowser from "@/utils/mocks/setupMSWForBrowser";

export function useSpørreundersøkelse(
  spørreundersøkelseId: string,
): SWRResponse<spørreundersøkelseDTO> {
  const sesjonsId = getCookie(SESSION_ID_STORAGE_KEY);
  const fetcher = (url: string) =>
    setupMSWForBrowser().then(() =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spørreundersøkelseId,
          sesjonsId,
        }),
      }).then((res) => res.json()),
    );

  return useSWR<spørreundersøkelseDTO>("/api/sporsmal-og-svar", fetcher);
}

export function useSpørsmålIndeks(
  spørreundersøkelseId: string,
): SWRResponse<spørsmålIndeksDTO> {
  const sesjonsId = getCookie(SESSION_ID_STORAGE_KEY);
  const fetcher = (url: string) =>
    setupMSWForBrowser().then(() =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spørreundersøkelseId,
          sesjonsId,
        }),
      }).then((res) => res.json()),
    );

  return useSWR<spørsmålIndeksDTO>("/api/gjeldende-sporsmal", fetcher, {
    refreshInterval: 1000,
  });
}

export function useVertSpørsmålIndeks(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<spørsmålIndeksDTO> {
  const fetcher = (url: string) =>
    setupMSWForBrowser().then(() =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spørreundersøkelseId,
          vertId,
        }),
      }).then((res) => res.json()),
    );

  return useSWR<spørsmålIndeksDTO>("/api/vert/gjeldende-sporsmal", fetcher);
}

export function postVertNesteSpørsmål(
  spørreundersøkelseId: string,
  vertId: string,
) {
  return setupMSWForBrowser().then(() =>
    fetch("/api/vert/neste-sporsmal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        vertId,
      }),
    }).then((res) => res.json()),
  );
}

export function useVertSpørreundersøkelse(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<spørreundersøkelseDTO> {
  const fetcher = (url: string) =>
    setupMSWForBrowser().then(() =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spørreundersøkelseId,
          vertId,
        }),
      }).then((res) => res.json()),
    );

  return useSWR<spørreundersøkelseDTO>("/api/vert/sporsmal-og-svar", fetcher);
}
