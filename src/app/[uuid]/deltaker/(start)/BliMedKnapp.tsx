"use client";

import { Alert, Button } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import { fetchBliMed } from "@/app/_api_hooks/bliMed";
import startsideStyles from "./startside.module.css";
import CookieHandler from "@/utils/CookieHandler";

export default function BliMedKnapp({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const cookieHandler = new CookieHandler(spørreundersøkelseId);

  const router = useRouter();

  React.useEffect(() => {
    if (cookieHandler.finnesFraFør) {
      router.push(
        `deltaker/sporsmal/${
          cookieHandler.sisteSvarteSpørsmålId || "START"
        }/neste`,
      );
    }
  });

  const [error, setError] = React.useState<string | null>(null);
  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          fetchBliMed(spørreundersøkelseId)
            .then(() => {
              setError(null);
              router.push("deltaker/sporsmal/START/neste");
            })
            .catch((error) => {
              setError(error.message);
            });
        }}
        className={startsideStyles.bliMedKnapp}
      >
        Bli med!
      </Button>
      {error !== null ? <Alert variant="error">{error}</Alert> : null}
    </>
  );
}
