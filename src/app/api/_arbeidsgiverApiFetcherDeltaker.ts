import { COOKIE_SESJONS_ID_KEY } from "@/utils/consts";
import { cookies } from "next/headers";

export function arbeidsgiverApiFetcherDeltaker(endpoint: string) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;
  const { sesjonsId } = JSON.parse(
    cookies().get(COOKIE_SESJONS_ID_KEY)?.value ?? "{}",
  );

  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing hostname in config" }), {
        status: 500,
      });
  }

  if (sesjonsId === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing session id in cookie" }), {
        status: 401,
      });
  }

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
