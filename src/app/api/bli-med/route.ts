import { dummyBliMed } from "@/utils/dummydata";

export async function POST() {
  return Response.json(dummyBliMed);
}
