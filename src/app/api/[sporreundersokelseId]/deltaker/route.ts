import { arbeidsgiverApiFetcherDeltaker } from "@/app/api/_arbeidsgiverApiFetcherDeltaker";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ sporreundersokelseId: string }> }
) {
  const params = await props.params;
  const spørreundersøkelseId = params.sporreundersokelseId;

  const fetcher = await arbeidsgiverApiFetcherDeltaker(`${spørreundersøkelseId}`);

  return fetcher();
}
