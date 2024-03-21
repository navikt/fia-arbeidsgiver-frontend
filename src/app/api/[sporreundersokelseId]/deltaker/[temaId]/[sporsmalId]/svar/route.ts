import { NextRequest } from "next/server";
import CookieHandler from "@/utils/CookieHandler";

export async function POST(
  request: NextRequest,
  {
    params: { sporreundersokelseId, temaId, sporsmalId },
  }: {
    params: {
      sporreundersokelseId: string;
      temaId: string;
      sporsmalId: string;
    };
  },
) {
  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }
  const { svarId } = await request.json();

  const fetcher = poster(
    `deltaker/${sporreundersokelseId}/${temaId}/${sporsmalId}/svar`,
    JSON.stringify({
      svarId,
    }),
  );
  return fetcher();
}

function poster(endpoint: string, body: BodyInit) {
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "nav-fia-kartlegging-sesjon-id": CookieHandler.sesjonsID,
        },
        body: body,
      },
    );
}
