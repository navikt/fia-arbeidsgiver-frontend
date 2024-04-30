import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  {
    params: { sporreundersokelseId, vertId, temaId },
  }: {
    params: {
      sporreundersokelseId: string;
      vertId: string;
      temaId: number;
    };
  },
) {
  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/tema/${temaId}/antall-svar`,
    vertId,
    req,
  );
  return fetcher();
}
