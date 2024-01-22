// Her i denne fila må vi gjøre kall mot bli-med
// Det gir oss en sesjonsId, som vi må(?) lagre i localStorage.
// Når veileder trykker på "start" skal endepunktet "spørsmål-og-svar" bli kalt, da trenger vi å sende inn sesjonsId i body.
// Mer enn det er ikke laget enda.

// sesjonID lages av bliMed-endepunktet
// settes sikert i localstorage
// sesjonsID må sendes som body i spørsmål-og-svar-endepunktet

import { NextApiRequest } from "next";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@/utils/tokenx-utils";

// Denne forventer en body av typen.
//   {
//      val spørreundersøkelseId: String,
//    }
export async function POST(request: NextApiRequest) {
  const { FIA_ARBEIDSGIVER_AUDIENCE, FIA_ARBEIDSGIVER_HOSTNAME } = process.env;

  if (FIA_ARBEIDSGIVER_AUDIENCE === undefined) {
    return new Response(
      JSON.stringify({ error: "authentication failed: missing audience" }),
      { status: 500 }
    );
  }
  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return new Response(
      JSON.stringify({ error: "missing hostname in config" }),
      { status: 500 }
    );
  }

  const newAuthToken = await exchangeIdportenSubjectToken(
    request,
    FIA_ARBEIDSGIVER_AUDIENCE
  );

  if (isInvalidToken(newAuthToken)) {
    return new Response(
      JSON.stringify({ error: "authentication failed: invalid auth token" }),
      { status: 401 }
    );
  }

  return fetch(
    `${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/kartlegging/bli-med`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAuthToken}`,
      },
      body: JSON.stringify({
        spørreundersøkelseId: request.body.spørreundersøkelseId,
      }),
    }
  );
}
