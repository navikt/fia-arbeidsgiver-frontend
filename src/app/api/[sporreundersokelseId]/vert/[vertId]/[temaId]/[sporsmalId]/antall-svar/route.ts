import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  {
    params: { sporreundersokelseId, vertId, temaId, sporsmalId },
  }: {
    params: {
      sporreundersokelseId: string;
      vertId: string;
      temaId: string;
      sporsmalId: string;
    };
  },
) {
  const fetcher = arbeidsgiverApiFetcherVert(
    `vert/v2/${sporreundersokelseId}/${temaId}/${sporsmalId}/antall-svar`,
    vertId,
    req,
  );
  return fetcher();
}
