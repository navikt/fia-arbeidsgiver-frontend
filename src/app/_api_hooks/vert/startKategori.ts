import { KategoriType } from "@/app/_types/sporreundersokelseDTO";

export function startKategori(
  spørreundersøkelseId: string,
  vertId: string,
  kategori: KategoriType,
) {
  return fetch("/api/vert/start-kategori", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spørreundersøkelseId,
      vertId,
      kategori,
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
