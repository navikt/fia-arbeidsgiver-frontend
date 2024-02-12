"use client";

import { Alert, Button } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import { fetchBliMed } from "@/app/_api_hooks/bliMed";
import styles from "./startside.module.css";
import {
  KARTLEGGING_FERDIG_ERROR,
  SESSION_ID_STORAGE_KEY,
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
  SPØRREUNDERSØKELSE_ID_STORAGE_KEY,
} from "@/utils/consts";
import { deleteCookie } from "cookies-next";

export default function BliMedKnapp({
  spørreundersøkelseId,
  slettCookies,
}: {
  spørreundersøkelseId: string;
  slettCookies: boolean;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (slettCookies) {
      deleteCookie(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
      deleteCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY);
      deleteCookie(SESSION_ID_STORAGE_KEY);
    }
  });

  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          fetchBliMed(spørreundersøkelseId)
            .then(() => {
              setError(null);
              router.push("deltaker/sporsmal");
            })
            .catch((error) => {
              if (error.message === KARTLEGGING_FERDIG_ERROR) {
                setError("Kartleggingen er allerede ferdig");
              } else {
                setError(error.message);
              }
            });
        }}
        className={styles.bliMedKnapp}
      >
        Bli med!
      </Button>
      {error !== null ? <Alert variant="error">{error}</Alert> : null}
    </>
  );
}
