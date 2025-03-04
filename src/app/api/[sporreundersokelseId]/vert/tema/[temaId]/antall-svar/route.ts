import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<{
      sporreundersokelseId: string;
      temaId: number;
    }>;
  }
) {
  const params = await props.params;

  const {
    sporreundersokelseId,
    temaId
  } = params;

  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/tema/${temaId}/antall-svar`,
    req,
  );
  return fetcher();
}
