import { arbeidsgiverApiFetcher } from "@/app/api/_arbeidsgiverApiFetcher";
import { NextRequest } from "next/server";

// Denne forventer en body av typen.
//   {
//     spørreundersøkelseId,
//     sesjonsId,
//     spørsmålId,
//     svarId,
//   }
export async function POST(request: NextRequest) {

  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }

  const { spørreundersøkelseId, sesjonsId, spørsmålId, svarId } =
    await request.json();
  const fetcher = arbeidsgiverApiFetcher(
    "svar",
    JSON.stringify({
      spørreundersøkelseId,
      sesjonsId,
      spørsmålId,
      svarId,
    })
  );

  return fetcher();
}
