import useSWR, { SWRResponse } from "swr";
import { spørreundersøkelseDTO } from "@/app/_types/sporreundersokelseDTO";

export function useVertSpørreundersøkelse(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<spørreundersøkelseDTO> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
        vertId,
      }),
    }).then((res) => {
      if (res.status === 403 || res.status === 400) {
        throw new Error("Ukjent spørreundersøkelse");
      }
      if (res.status === 410) {
        throw new Error("Spørreundersøkelse er avsluttet");
      }
      if (!res.ok) {
        throw new Error("Noe gikk galt.");
      }

      return res.json();
    });

  return useSWR<spørreundersøkelseDTO>("/api/vert/sporsmal-og-svar", fetcher);
}
