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
      temaId: string;
    };
  },
) {
  const fetcher = arbeidsgiverApiFetcherVert(
    `vert/v2/${sporreundersokelseId}/tema/${temaId}`,
    vertId,
    req,
  );
  return fetcher();
}
