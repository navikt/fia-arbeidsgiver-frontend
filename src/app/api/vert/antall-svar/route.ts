import { arbeidsgiverApiFetcher } from "@/app/api/_arbeidsgiverApiFetcher";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }

  const { spørreundersøkelseId, spørsmålId, vertId } = await request.json();
  const fetcher = arbeidsgiverApiFetcher(
    "vert/antall-svar",
    JSON.stringify({
      spørreundersøkelseId,
      spørsmålId,
      vertId,
    }),
  );

  return fetcher();
}
