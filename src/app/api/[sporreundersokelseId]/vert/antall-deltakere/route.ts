import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  {
    params: { sporreundersokelseId },
  }: {
    params: {
      sporreundersokelseId: string;
    };
  },
) {
  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/antall-deltakere`,
    req,
  );
  return fetcher();
}
