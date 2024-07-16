import CookieHandler from "@/utils/CookieHandler";

export async function sendSvar({
  spørreundersøkelseId,
  temaId,
  spørsmålId,
  svarIder,
}: {
  spørreundersøkelseId: string;
  temaId: number;
  spørsmålId: string;
  svarIder: string[];
}) {
  const res = await fetch(
    `/api/${spørreundersøkelseId}/deltaker/tema/${temaId}/sporsmal/${spørsmålId}/svar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        svarIder: svarIder,
      }),
    },
  );
  if (res.status === 400 || res.status === 403) {
    throw new Error("Kunne ikke sende svar, prøv igjen");
  }
  if (res.status === 303) {
    throw new Error("Tema stengt, hent nytt spørsmål");
  }
  if (!res.ok) {
    throw new Error("Noe gikk galt. Prøv å laste siden på nytt.");
  }
  CookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte(spørsmålId, svarIder);
}
