export function arbeidsgiverApiFetcherVert(endpoint: string, vertId: string) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;

  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return () =>
      new Response(JSON.stringify({ error: "missing hostname in config" }), {
        status: 500,
      });
  }

  const input = `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/${endpoint}`;
  return () =>
    fetch(input, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "nav-fia-kartlegging-vert-id": vertId,
      },
    });
}
