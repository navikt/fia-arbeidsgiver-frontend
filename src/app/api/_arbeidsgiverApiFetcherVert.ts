import { NextRequest } from "next/server";
import { _exchangeToken } from "@/app/api/_exchangeToken";

export function arbeidsgiverApiFetcherVert(
  endpoint: string,
  req: NextRequest,
) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;
  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing hostname in config" }), {
        status: 500,
      });
  }
  const url = `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/vert/${endpoint}`;

  return async () => {
    const exchangeResult = await _exchangeToken(req);
    if (exchangeResult.error) {
      return new Response(JSON.stringify(exchangeResult.error), {
        status: exchangeResult.error.code,
      });
    }
    return fetch(url, {
      cache: "no-cache",
      method: "GET",
      headers: {
        Authorization: `Bearer ${exchangeResult.obo.token}`,
      },
    });
  };
}
