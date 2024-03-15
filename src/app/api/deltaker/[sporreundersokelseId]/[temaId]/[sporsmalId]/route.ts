import { arbeidsgiverApiFetcher } from "@/app/api/_arbeidsgiverApiFetcher";
import { NextRequest } from "next/server";

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
  const { sesjonsId } = await request.json();

  const fetcher = arbeidsgiverApiFetcher(
    `deltaker/v2/${sporreundersokelseId}/${temaId}/${sporsmalId}`,
    JSON.stringify({
      sesjonsId,
    }),
  );

  return fetcher();
}
