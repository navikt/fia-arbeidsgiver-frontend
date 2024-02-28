import { arbeidsgiverApiFetcher } from "@/app/api/_arbeidsgiverApiFetcher";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { spmId: string } },
) {
  if (request.headers.get("content-type") != "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content-type" }), {
      status: 400,
    });
  }

  const { spørreundersøkelseId, vertId } = await request.json();
  const fetcher = arbeidsgiverApiFetcher(
    `vert/sporsmal-og-svar/${params.spmId}`,
    JSON.stringify({
      spørreundersøkelseId,
      vertId,
    }),
  );

  return fetcher();
}
