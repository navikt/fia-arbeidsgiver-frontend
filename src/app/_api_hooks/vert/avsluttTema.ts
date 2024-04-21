export function avsluttTema(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: number,
) {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error("Kunne ikke laste resultater over temaer");
    }
    return res;
  };

  return fetcher(
    `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/avslutt`,
  );
}
