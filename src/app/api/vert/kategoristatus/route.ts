import { arbeidsgiverApiFetcher } from "@/app/api/_arbeidsgiverApiFetcher";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }

  const { spørreundersøkelseId, vertId } = await request.json();
  const fetcher = arbeidsgiverApiFetcher(
    "vert/kategoristatus",
    JSON.stringify({
      spørreundersøkelseId,
      vertId,
    }),
  );

  return fetcher();
}