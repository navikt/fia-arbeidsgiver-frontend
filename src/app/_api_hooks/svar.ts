import CookieHandler from "@/utils/CookieHandler";

export function postEnkeltSvar({
  spørreundersøkelseId,
  spørsmålId,
  svarId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  svarId: string;
}) {
  const cookieHandler = new CookieHandler(spørreundersøkelseId);
  const sesjonsId = cookieHandler.sesjonsID;
  return fetch("/api/svar", {
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
  }).then((res) => {
    if (res.ok) {
      cookieHandler.oppdaterSisteSvarteSpørsmål(spørsmålId);
      return true;
    } else {
      return false;
    }
  });
}
