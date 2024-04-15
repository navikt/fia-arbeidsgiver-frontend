"use server";
import { cookies } from "next/headers";
import { COOKIE_SESJONS_ID_KEY } from "@/utils/consts";

export async function harSesjonsID() {
  const sesjonsId = cookies().get(COOKIE_SESJONS_ID_KEY)?.value;

  return sesjonsId !== undefined;
}
