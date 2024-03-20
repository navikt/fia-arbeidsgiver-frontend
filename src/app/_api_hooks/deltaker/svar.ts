import CookieHandler from "@/utils/CookieHandler";

export function sendSvar({
  spørreundersøkelseId,
  temaId,
  spørsmålId,
  svarId,
}: {
  spørreundersøkelseId: string;
  temaId: string;
  spørsmålId: string;
  svarId: string;
}) {
  return fetch(
    `/api/deltaker/${spørreundersøkelseId}/${temaId}/${spørsmålId}/svar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        svarId,
      }),
    },
  ).then((res) => {
    if (res.status === 400 || res.status === 403) {
      throw new Error("Kunne ikke sende svar, prøv igjen");
    }
    if (!res.ok) {
      throw new Error("Noe gikk galt.");
    }
    CookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte(spørsmålId, svarId);
  });
}
