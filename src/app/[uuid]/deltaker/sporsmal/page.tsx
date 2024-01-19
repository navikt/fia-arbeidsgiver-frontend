import React from "react";
import type { Metadata } from "next";
import SpørsmålBody from "./SporsmalBody";
import { getCookies } from "cookies-next";
import { cookies } from "next/headers";
import {
  SESSION_ID_STORAGE_KEY,
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
} from "@/utils/consts";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Spørsmålsside({
  params,
}: {
  params: { uuid: string };
}) {
  const cookievalues = getCookies({ cookies });
  const storedSessionID = cookievalues[SESSION_ID_STORAGE_KEY];
  const storedSisteSvarteID =
    cookievalues[SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY];

  return (
    <SpørsmålBody
      undersøkelsesId={params.uuid}
      storedSessionID={storedSessionID}
      storedSisteSvarteID={storedSisteSvarteID}
    />
  );
}
