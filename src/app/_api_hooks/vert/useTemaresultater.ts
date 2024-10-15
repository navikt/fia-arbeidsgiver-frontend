import useSWR, { SWRResponse } from "swr";
import { TemaResultatDto } from "@/app/_types/TemaResultatDto";

export function useTemaResultat(
  spørreundersøkelseId: string,
  temaId: number,
): SWRResponse<TemaResultatDto> {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste resultater for tema");
    }
    return res.json();
  };
  return useSWR<TemaResultatDto>(
    `/api/${spørreundersøkelseId}/vert/tema/${temaId}/resultater`,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Only retry up to 25 times.
        if (retryCount >= 25) return;
        
        // Retry with more and more time between retries.
        setTimeout(() => revalidate({ retryCount }), Math.min(250 * retryCount, 5000))
      }
    }
  );
}
