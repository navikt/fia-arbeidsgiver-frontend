import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  {
    params: { sporreundersokelseId, vertId },
  }: {
    params: {
      sporreundersokelseId: string;
      vertId: string;
    };
  },
) {
  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/antall-fullfort`,
    vertId,
    req,
  );
  return fetcher();
}
