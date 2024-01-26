import { useFetchFromArbeidsgiverApi } from "@/app/api/_useFetchFromArbeidsgiverApi";
import { NextRequest } from "next/server";

// Denne forventer en body av typen.
//   {
//     spørreundersøkelseId,
//     sesjonsId,
//   }
export async function POST(request: NextRequest) {
  const { spørreundersøkelseId, sesjonsId } = await request.json();
  const fetcher = useFetchFromArbeidsgiverApi(
    "sporsmal-og-svar",
    JSON.stringify({
      spørreundersøkelseId,
      sesjonsId,
    })
  );

  return fetcher();
}
