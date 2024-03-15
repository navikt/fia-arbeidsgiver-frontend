"use client";

import { Alert, Button } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import startsideStyles from "./startside.module.css";
import CookieHandler from "@/utils/CookieHandler";
import { fetchBliMed } from "@/app/_api_hooks/deltaker/bliMed";
import { fetchDeltakerForsteSporsmal } from "@/app/_api_hooks/deltaker/forsteSporsmal";

export default function BliMedKnapp({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const router = useRouter();

  React.useEffect(() => {
    if (CookieHandler.finnesFraFør(spørreundersøkelseId)) {
      router.push(`deltaker/sporsmal/${CookieHandler.spørsmålÅStartePå}/neste`);
    } else {
      fetchBliMed(spørreundersøkelseId)
        .then(() => {
          return fetchDeltakerForsteSporsmal(spørreundersøkelseId);
        })
        .then(({ spørsmålId }) => {
          router.push(`deltaker/sporsmal/${spørsmålId}`);
        })
        .catch((error) => {
          setError(error.message);
        });
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
              return fetchDeltakerForsteSporsmal(spørreundersøkelseId);
            })
            .then(({ spørsmålId }) => {
              router.push(`deltaker/sporsmal/${spørsmålId}`);
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
