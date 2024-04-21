import { NextRequest } from "next/server";
import { getToken, requestAzureOboToken, validateToken } from "@navikt/oasis";

export async function _exchangeToken(req: NextRequest) {
  const token = getToken(req);
  if (!token) {
    return { error: { tokenError: "No token found", code: 401 } };
  }

  const validation = await validateToken(token);
  if (!validation.ok) {
    return {
      error: {
        validationError: validation.error,
        code: 401,
      },
    };
  }

  const obo = await requestAzureOboToken(
    token,
    `api://${process.env.NAIS_CLUSTER_NAME}.pia.fia-arbeidsgiver/.default`,
  );
  if (!obo.ok) {
    return {
      error: {
        oboError: obo.error,
        code: 500,
      },
    };
  }

  return { obo };
}
