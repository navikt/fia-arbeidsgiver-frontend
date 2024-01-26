import { dummySpørreundersøkelse } from "@/utils/dummydata";

export async function POST() {
  return Response.json(dummySpørreundersøkelse);
}
