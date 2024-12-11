import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  {
    params: { sporreundersokelseId, temaId },
  }: {
    params: {
      sporreundersokelseId: string;
      temaId: string;
    };
  },
) {
  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/tema/${temaId}`,
    req,
  );
  return fetcher();
}
