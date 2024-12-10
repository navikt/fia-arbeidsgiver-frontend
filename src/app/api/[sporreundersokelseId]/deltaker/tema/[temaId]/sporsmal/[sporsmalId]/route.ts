import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherDeltaker } from "@/app/api/_arbeidsgiverApiFetcherDeltaker";

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<{
      sporreundersokelseId: string;
      temaId: string;
      sporsmalId: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    sporreundersokelseId,
    temaId,
    sporsmalId
  } = params;

  const fetcher = arbeidsgiverApiFetcherDeltaker(
    `${sporreundersokelseId}/tema/${temaId}/sporsmal/${sporsmalId}`,
  );

  return fetcher();
}
