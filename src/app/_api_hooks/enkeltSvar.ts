import { getCookie, setCookie } from "cookies-next";
import { SESSION_ID_STORAGE_KEY } from "./bliMed";

export const SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY = "sisteSvarteID";

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
  setCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY, spørsmålId);
}
