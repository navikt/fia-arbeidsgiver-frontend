import { NextRequest } from "next/server";
import { COOKIE_SESJONS_ID_KEY } from "@/utils/consts";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

export async function POST(
  request: NextRequest,
  props: {
    params: Promise<{
      sporreundersokelseId: string;
      temaId: string;
      sporsmalId: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    sporreundersokelseId,
    temaId,
    sporsmalId
  } = params;

  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }
  const { svarIder } = await request.json();

  const fetcher = poster(
    `${sporreundersokelseId}/tema/${temaId}/sporsmal/${sporsmalId}/svar`,
    JSON.stringify({
      svarIder,
    }),
  );
  return fetcher();
}

function poster(endpoint: string, body: BodyInit) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;
  const { sesjonsId } = JSON.parse(
    (cookies() as unknown as UnsafeUnwrappedCookies).get(COOKIE_SESJONS_ID_KEY)?.value ?? "{}",
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
      `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/deltaker/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "nav-fia-kartlegging-sesjon-id": sesjonsId,
        },
        body: body,
      },
    );
}
