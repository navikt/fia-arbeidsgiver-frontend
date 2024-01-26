import { useFetchFromArbeidsgiverApi } from "@/app/api/_useFetchFromArbeidsgiverApi";
import { NextRequest } from "next/server";

// Denne forventer en body av typen.
//   {
//      val spørreundersøkelseId: String,
//    }
export async function POST(request: NextRequest) {
  const { spørreundersøkelseId } = await request.json();
  const fetcher = useFetchFromArbeidsgiverApi(
    "bli-med",
    JSON.stringify({
      spørreundersøkelseId,
    })
  );

  return fetcher();
}
