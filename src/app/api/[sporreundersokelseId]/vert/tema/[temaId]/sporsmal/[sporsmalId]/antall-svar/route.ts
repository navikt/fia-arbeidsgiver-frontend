import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

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
  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/tema/${temaId}/sporsmal/${sporsmalId}/antall-svar`,
    req,
  );
  return fetcher();
}
