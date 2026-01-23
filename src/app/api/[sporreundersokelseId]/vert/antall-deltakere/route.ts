import { NextRequest } from "next/server";
import { arbeidsgiverApiFetcherVert } from "@/app/api/_arbeidsgiverApiFetcherVert";

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<{
      sporreundersokelseId: string;
    }>;
  },
) {
  const params = await props.params;

  const { sporreundersokelseId } = params;

  const fetcher = arbeidsgiverApiFetcherVert(
    `${sporreundersokelseId}/antall-deltakere`,
    req,
  );
  return fetcher();
}
