export function useÅpneTema(
  spørreundersøkelseId: string,
  vertId: string,
  temaId: number,
) {
  return async () => {
    const res = await fetch(
      `/api/${spørreundersøkelseId}/vert/${vertId}/${temaId}/start`,
      {
        method: "POST",
      },
    );
    if (!res.ok) {
      throw new Error("Kunne ikke åpne tema");
    }
  };
}
