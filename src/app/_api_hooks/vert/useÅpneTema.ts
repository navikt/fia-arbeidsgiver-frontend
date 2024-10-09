export function useÅpneTema(spørreundersøkelseId: string, temaId: number) {
  return async () => {
    const res = await fetch(
      `/api/${spørreundersøkelseId}/vert/tema/${temaId}/start`,
      {
        method: "POST",
      },
    );
    if (!res.ok) {
      throw new Error("Kunne ikke åpne tema");
    }
  };
}
