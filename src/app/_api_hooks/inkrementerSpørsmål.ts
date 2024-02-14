export function inkrementerSpørsmål(
  spørreundersøkelseId: string,
  vertId: string,
) {
  return fetch("/api/vert/inkrementer-sporsmal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spørreundersøkelseId,
      vertId,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Noe gikk galt ved start av kartlegging");
    }

    res.json();
  });
}
