import { NextRequest } from "next/server";
import { getToken, requestOboToken, validateToken } from "@navikt/oasis";

export function arbeidsgiverApiFetcherVert(
  endpoint: string,
  vertId: string,
  req: NextRequest,
) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;

  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing hostname in config" }), {
        status: 500,
      });
  }

  const input = `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/${endpoint}`;
  return async () => {
    const exchangeResult = await exchangeToken(req);

    if (exchangeResult.error) {
      return new Response(JSON.stringify(exchangeResult.error), {
        status: exchangeResult.error.code,
      });
    }
    return fetch(input, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "nav-fia-kartlegging-vert-id": vertId,
        Authorization: `Bearer ${exchangeResult.obo.token}`,
      },
    });
  };
}

async function exchangeToken(req: NextRequest) {
  const token = getToken(req);
  if (!token) {
    return { error: { tokenError: "No token found", code: 401 } };
  }

  const validation = await validateToken(token);
  if (!validation.ok) {
    /* håndter valideringsfeil */
    return {
      error: {
        validationError: validation.error,
        code: 401,
      },
    };
  }

  const obo = await requestOboToken(
    token,
    `${process.env.NAIS_CLUSTER_NAME}:pia:fia-arbeidsgiver`,
  );
  if (!obo.ok) {
    /* håndter OBO-feil */
    return {
      error: {
        oboError: obo.error,
        code: 500,
      },
    };
  }

  return { obo };
}
