export async function inkrementerSpørsmål(
  spørreundersøkelseId: string,
  vertId: string,
) {
  const res = await fetch("/api/vert/inkrementer-sporsmal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spørreundersøkelseId,
      vertId,
    }),
  });
  if (res.status === 400 || res.status === 403) {
    throw new Error("Kunne ikke gå til neste, prøv igjen");
  }
  if (res.status === 409) {
    throw new Error("Kunne ikke gå til neste: I feil status");
  }
  if (res.status === 500) {
    throw new Error("Kunne ikke gå til neste: Mangler status");
  }
  if (!res.ok) {
    throw new Error("Noe gikk galt.");
  }
  return res.json();
}
