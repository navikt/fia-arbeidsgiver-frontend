// Her i denne fila må vi gjøre kall mot bli-med
// Det gir oss en sesjonsId, som vi må(?) lagre i localStorage.
// Når veileder trykker på "start" skal endepunktet "spørsmål-og-svar" bli kalt, da trenger vi å sende inn sesjonsId i body.
// Mer enn det er ikke laget enda.

// sesjonID lages av bliMed-endepunktet
// sesjonsID må sendes som body i spørsmål-og-svar-endepunktet

import { NextRequest } from "next/server";

// Denne forventer en body av typen.
//   {
//      val spørreundersøkelseId: String,
//    }
export async function POST(request: NextRequest) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;

  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return new Response(
      JSON.stringify({ error: "missing hostname in config" }),
      { status: 500 }
    );
  }

  const { spørreundersøkelseId } = await request.json();

  return fetch(
    `${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/kartlegging/bli-med`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spørreundersøkelseId,
      }),
    }
  );
}
