import useSWR, { SWRResponse } from "swr";

export function useVirksomhetsnavn(
  spørreundersøkelseId: string,
  vertId: string,
): SWRResponse<string> {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Kunne ikke hente virksomhetsnavn for spørreundersøkelse med id '${spørreundersøkelseId}'`,
        );
      }
      return res.text();
    });

  return useSWR<string>(
    `/api/${spørreundersøkelseId}/vert/${vertId}/virksomhetsnavn`,
    fetcher,
  );
}
