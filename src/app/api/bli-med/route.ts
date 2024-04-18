import { bliMedDTO } from "@/app/_types/bliMedDTO";
import { COOKIE_MAX_AGE, COOKIE_SESJONS_ID_KEY } from "@/utils/consts";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;
  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }

  if (FIA_ARBEIDSGIVER_HOSTNAME === undefined) {
    return new Response(
      JSON.stringify({ error: "missing hostname in config" }),
      {
        status: 500,
      },
    );
  }

  const { spørreundersøkelseId } = await request.json();
  const fetcher = bliMedFetcher(
    "bli-med",
    JSON.stringify({
      spørreundersøkelseId,
    }),
  );

  const { sesjonsId, spørreundersøkelseId: cookieSpørreundersøkelseId } =
    JSON.parse(cookies().get(COOKIE_SESJONS_ID_KEY)?.value ?? "{}");

  if (
    sesjonsId !== undefined &&
    cookieSpørreundersøkelseId === spørreundersøkelseId
  ) {
    setSesjonsIdCookie(sesjonsId, spørreundersøkelseId);
    return new Response(
      JSON.stringify({ spørreundersøkelseId, sesjonsId: "ok" }),
    );
  }

  const fetched = await fetcher();
  setSesjonsIdCookie(fetched.sesjonsId, spørreundersøkelseId);

  return new Response(JSON.stringify({ ...fetched, sesjonsId: "ok" }));
}

function setSesjonsIdCookie(sesjonsId: string, spørreundersøkelseId: string) {
  cookies().set(
    COOKIE_SESJONS_ID_KEY,
    JSON.stringify({ sesjonsId, spørreundersøkelseId }),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE,
    },
  );
}

function bliMedFetcher(endpoint: string, body: BodyInit | null = null) {
  const { FIA_ARBEIDSGIVER_HOSTNAME } = process.env;

  return () =>
    fetch(
      `http://${FIA_ARBEIDSGIVER_HOSTNAME}/fia-arbeidsgiver/sporreundersokelse/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    ).then((response) => response.json() as Promise<bliMedDTO>);
}
