import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<{
      sporreundersokelseId: string;
      temaId: string;
      sporsmalId: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    sporreundersokelseId,
    temaId,
    sporsmalId
  } = params;

  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/tema/${temaId}/sporsmal/${sporsmalId}/antall-svar`,
    req,
  );
  return fetcher();
}
