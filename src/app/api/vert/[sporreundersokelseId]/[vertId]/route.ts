import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  _: NextRequest,
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
    `vert/v2/${sporreundersokelseId}`,
    vertId,
  );
  return fetcher();
}
