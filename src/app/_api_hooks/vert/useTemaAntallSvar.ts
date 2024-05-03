import useSWR, { SWRResponse } from "swr";

export function useTemaAntallSvar({
  spørreundersøkelseId,
  vertId,
  temaId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId?: number;
}): SWRResponse<number> {
  const fetcher = (url: string) => {
    return fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Kunne ikke laste antall svar for tema ${temaId}`);
      }
      return res.json();
    });
  };

  return useSWR<number>(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/antall-svar`,
    fetcher,
  );
}
