"use client";

import { Alert, Button } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import startsideStyles from "./startside.module.css";
import { fetchBliMed } from "@/app/_api_hooks/deltaker/bliMed";
import { fetchIdentifiserbartSpørsmål } from "@/app/_api_hooks/deltaker/fetchIdentifiserbartSpørsmål";

export default function BliMedKnapp({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          fetchBliMed(spørreundersøkelseId)
            .then(() => {
              return fetchIdentifiserbartSpørsmål(spørreundersøkelseId);
            })
            .then(({ spørsmålId, temaId }) => {
              router.push(`deltaker/${temaId}/${spørsmålId}`);
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
