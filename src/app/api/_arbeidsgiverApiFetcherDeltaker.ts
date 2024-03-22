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

  console.log("req.cookies:", req.cookies);
  const cookie = req.cookies.get(COOKIE_STORAGE_KEY);
  console.log("cookie:", cookie);
  const parsetCookie = cookie ? JSON.parse(cookie.value) : undefined;

  const sesjonsId: string = parsetCookie.sesjonsID;
  console.log("sesjonId:", sesjonsId);
  return () =>
    fetch(
      `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/${endpoint}`,
      {
        cache: "no-cache", //TODO: Dobbelsjekk at dette brukes rett
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "nav-fia-kartlegging-sesjon-id": sesjonsId,
        },
      },
    );
}
