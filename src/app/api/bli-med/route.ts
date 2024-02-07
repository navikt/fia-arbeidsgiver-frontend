import { arbeidsgiverApiFetcher } from "@/app/api/_arbeidsgiverApiFetcher";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }

  const { spørreundersøkelseId } = await request.json();
  const fetcher = arbeidsgiverApiFetcher(
    "bli-med",
    JSON.stringify({
      spørreundersøkelseId,
    }),
  );

  return fetcher();
}
