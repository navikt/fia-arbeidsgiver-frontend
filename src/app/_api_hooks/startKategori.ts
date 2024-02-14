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
    if (!res.ok) {
      throw new Error("Noe gikk galt ved start av kartlegging");
    }
  });
}
