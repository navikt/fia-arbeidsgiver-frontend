import CookieHandler from "@/utils/CookieHandler";

export function arbeidsgiverApiFetcherDeltaker(endpoint: string) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;

  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing hostname in config" }), {
        status: 500,
      });
  }
  return () =>
    fetch(
      `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "nav-fia-kartlegging-sesjon-id": CookieHandler.sesjonsID,
        },
      },
    );
}
