import { arbeidsgiverApiFetcherDeltaker } from "@/app/api/_arbeidsgiverApiFetcherDeltaker";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sporreundersokelseId: string } },
) {
  const spørreundersøkelseId = params.sporreundersokelseId;

  const fetcher = arbeidsgiverApiFetcherDeltaker(`${spørreundersøkelseId}`);

  return fetcher();
}
