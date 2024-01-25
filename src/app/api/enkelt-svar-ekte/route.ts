import { useFetchFromArbeidsgiverApi } from "@/app/api/_useFetchFromArbeidsgiverApi";
import { NextRequest } from "next/server";

// Denne forventer en body av typen.
//   {
//     spørreundersøkelseId,
//     sesjonsId,
//     spørsmålId,
//     svarId,
//   }
export async function POST(request: NextRequest) {
  const { spørreundersøkelseId, sesjonsId, spørsmålId, svarId } =
    await request.json();
  const fetcher = useFetchFromArbeidsgiverApi(
    "enkelt-svar",
    JSON.stringify({
      spørreundersøkelseId,
      sesjonsId,
      spørsmålId,
      svarId,
    })
  );

  return fetcher();
}
