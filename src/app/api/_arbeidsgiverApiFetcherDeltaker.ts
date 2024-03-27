import { NextRequest } from "next/server";
import { COOKIE_STORAGE_KEY } from "@/utils/consts";

export function arbeidsgiverApiFetcherDeltaker(
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

  const cookie = req.cookies.get(COOKIE_STORAGE_KEY);
  const parsetCookie = cookie ? JSON.parse(cookie.value) : undefined;

  const sesjonsId: string = parsetCookie.sesjonsID;
  return () =>
    fetch(
      `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/${endpoint}`,
      {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "nav-fia-kartlegging-sesjon-id": sesjonsId,
        },
      },
    );
}
