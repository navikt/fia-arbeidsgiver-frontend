"use server";
import { cookies } from "next/headers";
import { COOKIE_SESJONS_ID_KEY } from "@/utils/consts";

export async function harGyldigSesjonsID(spørreundersøkelseId: string) {
  const sesjonCookie = JSON.parse(
    cookies().get(COOKIE_SESJONS_ID_KEY)?.value ?? "{}",
  );

  return (
    sesjonCookie.sesjonsId !== undefined &&
    sesjonCookie.spørreundersøkelseId === spørreundersøkelseId
  );
}
