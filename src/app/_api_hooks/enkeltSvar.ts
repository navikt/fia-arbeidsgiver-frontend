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
  const sesjonsId = localStorage.getItem(SESSION_ID_STORAGE_KEY);
  console.log("postEnkeltSvar", {
    spørreundersøkelseId,
    sesjonsId,
    spørsmålId,
    svarId,
  });
  localStorage.setItem(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY, spørsmålId);
}
