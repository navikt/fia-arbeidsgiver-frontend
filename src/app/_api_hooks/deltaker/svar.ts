import CookieHandler from "@/utils/CookieHandler";

export function svar({
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
    if (res.status === 400 || res.status === 403) {
      throw new Error("Kunne ikke sende svar, prøv igjen");
    }
    if (!res.ok) {
      throw new Error("Noe gikk galt.");
    }
    cookieHandler.oppdaterSisteSvarteSpørsmål(spørsmålId);
  });
}
