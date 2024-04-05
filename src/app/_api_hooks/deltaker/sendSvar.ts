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
    `/api/${spørreundersøkelseId}/deltaker/${temaId}/${spørsmålId}/svar`,
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
  if (!res.ok) {
    throw new Error("Noe gikk galt.");
  }
  CookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte(spørsmålId, svarIder);
}
