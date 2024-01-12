// Her i denne fila må vi gjøre kall mot bli-med
// Det gir oss en sesjonsId, som vi må(?) lagre i localStorage.
// Når veileder trykker på "start" skal endepunktet "spørsmål-og-svar" bli kalt, da trenger vi å sende inn sesjonsId i body.
// Mer enn det er ikke laget enda.

// sesjonID lages av bliMed-endepunktet
// settes sikert i localstorage
// sesjonsID må sendes som body i spørsmål-og-svar-endepunktet

import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "@/utils/tokenx-utils";

// Denne forventer en body av typen.
//   {
//      val spørreundersøkelseId: String,
//      val pinkode: String
//    }
export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { spørreundersøkelse: string } },
) {
  const kartleggingId = params.spørreundersøkelse;

  if (!kartleggingId) {
    return res.status(400).json("Mangler ID til kartleggingen");
  }

  const { FIA_ARBEIDSGIVER_AUDIENCE, FIA_ARBEIDSGIVER_HOSTNAME } = process.env;
  if (!(FIA_ARBEIDSGIVER_HOSTNAME && FIA_ARBEIDSGIVER_AUDIENCE)) {
    return res.status(500).json("Authorization failed");
  }

  return await proxyRequestWithTokenExchange({
    request: req,
    response: res,
    audience: FIA_ARBEIDSGIVER_AUDIENCE,
    hostname: FIA_ARBEIDSGIVER_HOSTNAME,
    path: "/fia-arbeidsgiver/kartlegging/bli-med",
  });
}
