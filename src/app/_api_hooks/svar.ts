import { getCookie, setCookie } from "cookies-next";
import {
  SESSION_ID_STORAGE_KEY,
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
  COOKIE_MAX_AGE,
} from "@/utils/consts";
import setupMSWForBrowser from "@/utils/mocks/setupMSWForBrowser";

export function postEnkeltSvar({
  spørreundersøkelseId,
  spørsmålId,
  svarId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  svarId: string;
}) {
  setupMSWForBrowser();

  const sesjonsId = getCookie(SESSION_ID_STORAGE_KEY);
  const fetcher = () =>
    fetch("/api/svar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        sesjonsId,
        spørsmålId,
        svarId,
      }),
    }).then(() => {
      setCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY, spørsmålId, {
        maxAge: COOKIE_MAX_AGE,
      });
    });

  return fetcher();
}
