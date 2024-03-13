import { TemaType } from "@/app/_types/temaDTO";

export function startTema(
  spørreundersøkelseId: string,
  vertId: string,
  tema: TemaType,
) {
  return fetch("/api/vert/start-tema", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spørreundersøkelseId,
      vertId,
      tema,
    }),
  }).then((res) => {
    if (res.status === 400 || res.status === 403) {
      throw new Error("Kunne ikke starte spørreundersøkelse, prøv igjen");
    }
    if (res.status === 409) {
      console.log("Denne kartleggingen er allerede startet");
      return; // er allerede startet, men burde kunne fortsette?
    }
    if (res.status === 500) {
      throw new Error("Kunne ikke starte spørreundersøkelse: Mangler status");
    }
    if (!res.ok) {
      throw new Error("Noe gikk galt.");
    }
  });
}
