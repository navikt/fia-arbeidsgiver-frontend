import { BliMedDto } from "@/app/_types/BliMedDto";
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
    JSON.parse((await cookies()).get(COOKIE_SESJONS_ID_KEY)?.value ?? "{}");

  if (
    sesjonsId !== undefined &&
    cookieSpørreundersøkelseId === spørreundersøkelseId
  ) {
    await setSesjonsIdCookie(sesjonsId, spørreundersøkelseId);
    return new Response(
      JSON.stringify({ spørreundersøkelseId, sesjonsId: "ok" }),
    );
  }

  try {
    const fetched = await fetcher();
    await setSesjonsIdCookie(fetched.sesjonsId, spørreundersøkelseId);

    return new Response(JSON.stringify({ ...fetched, sesjonsId: "ok" }));
  } catch (error) {
    if (error instanceof StatusPassthroughError) {
      return new Response(error.message, { status: error.statusCode });
    } else {
      return new Response("Ukjent feil", { status: 502 });
    }
  }
}

async function setSesjonsIdCookie(sesjonsId: string, spørreundersøkelseId: string) {
  (await cookies()).set(
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
    ).then((response) => {
      if (!response.ok) {
        throw new StatusPassthroughError(response.status);
      }
      return response.json() as Promise<BliMedDto>;
    });
}

class StatusPassthroughError extends Error {
  statusCode: number;
  constructor(statusCode: number) {
    super("Statuskode feil");
    this.statusCode = statusCode;
  }
}
