import CookieHandler from "@/utils/CookieHandler";
import { Tema } from "@/app/_types/tema";
import { temaTilURL } from "@/utils/spørreundersøkelsesUtils";

export async function sendSvar({
  spørreundersøkelseId,
  tema,
  spørsmålId,
  svarId,
}: {
  spørreundersøkelseId: string;
  tema: Tema;
  spørsmålId: string;
  svarId: string;
}) {
  const res = await fetch(
    `/api/${spørreundersøkelseId}/deltaker/${temaTilURL(
      tema,
    )}/${spørsmålId}/svar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        svarId,
      }),
    },
  );
  if (res.status === 400 || res.status === 403) {
    throw new Error("Kunne ikke sende svar, prøv igjen");
  }
  if (!res.ok) {
    throw new Error("Noe gikk galt.");
  }
  CookieHandler.setSvarPåSpørsmålOgMarkerSomSisteSvarte(spørsmålId, svarId);
}
