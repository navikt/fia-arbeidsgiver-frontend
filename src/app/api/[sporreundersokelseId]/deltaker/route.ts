import { arbeidsgiverApiFetcherDeltaker } from "@/app/api/_arbeidsgiverApiFetcherDeltaker";
import { NextRequest } from "next/server";

// GET /api/deltaker/[sporreundersokelseId] -> skal hente StartDto
export async function GET(
  _: NextRequest,
  { params }: { params: { sporreundersokelseId: string } },
) {
  const spørreundersøkelseId = params.sporreundersokelseId;
  const fetcher = arbeidsgiverApiFetcherDeltaker(
    `deltaker/${spørreundersøkelseId}`,
  );

  return fetcher();
}
