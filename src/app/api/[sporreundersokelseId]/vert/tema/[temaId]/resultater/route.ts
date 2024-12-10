import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<{
      sporreundersokelseId: string;
      temaId: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    sporreundersokelseId,
    temaId
  } = params;

  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/tema/${temaId}/resultater`,
    req,
  );
  return fetcher();
}
