import { COOKIE_SESJONS_ID_KEY } from "@/utils/consts";
import { cookies } from "next/headers";

export async function arbeidsgiverApiFetcherDeltaker(endpoint: string) {
  const { sesjonsId } = JSON.parse(
    (await cookies()).get(COOKIE_SESJONS_ID_KEY)?.value ?? "{}",
  );

  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;
  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing hostname in config" }), {
        status: 500,
      });
  }
  const url = `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/deltaker/${endpoint}`;

  if (sesjonsId === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing session id in cookie" }), {
        status: 401,
      });
  }

  return () =>
    fetch(url, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "nav-fia-kartlegging-sesjon-id": sesjonsId,
      },
    });
}
