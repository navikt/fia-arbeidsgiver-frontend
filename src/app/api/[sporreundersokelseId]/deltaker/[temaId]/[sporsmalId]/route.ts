import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherDeltaker } from "@/app/api/_arbeidsgiverApiFetcherDeltaker";

export async function GET(
  req: NextRequest,
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
  const fetcher = arbeidsgiverApiFetcherDeltaker(
    `deltaker/${sporreundersokelseId}/${temaId}/${sporsmalId}`,
  );

  return fetcher();
}
