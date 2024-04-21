import useSWR, { SWRResponse } from "swr";
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";

export function useSpørsmålOgSvar(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: number,
  spørsmålId: string,
): SWRResponse<SpørsmåloversiktDTO> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (res.status === 202) {
        throw new Error("Spørsmål er ikke åpnet");
      }
      if (!res.ok) {
        throw new Error("Noe gikk galt");
      }
      return res.json();
    });

  return useSWR(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/${spørsmålId}`,
    fetcher,
  );
}
