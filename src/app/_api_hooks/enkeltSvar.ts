import { getCookie, setCookie } from "cookies-next";
import {
  SESSION_ID_STORAGE_KEY,
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
  COOKIE_MAX_AGE,
} from "@/utils/consts";

export function postEnkeltSvar({
  spørreundersøkelseId,
  spørsmålId,
  svarId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  svarId: string;
}) {
  const sesjonsId = getCookie(SESSION_ID_STORAGE_KEY);
  console.log("postEnkeltSvar", {
    spørreundersøkelseId,
    sesjonsId,
    spørsmålId,
    svarId,
  });

  const fetcher = () =>
    fetch("/api/enkelt-svar", {
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