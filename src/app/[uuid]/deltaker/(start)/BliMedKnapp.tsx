"use client";

import { Alert, Button } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import startsideStyles from "./startside.module.css";
import { fetchBliMed } from "@/app/_api_hooks/deltaker/bliMed";
import { fetchDeltakerForsteSporsmal } from "@/app/_api_hooks/deltaker/forsteSporsmal";

export default function BliMedKnapp({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const router = useRouter();

  /*
  TODO: Fikse at man går tilbake til spørsmålet man var på.
  React.useEffect(() => {
    if (CookieHandler.finnesFraFør(spørreundersøkelseId)) {
      router.push(`deltaker/sporsmal/${CookieHandler.spørsmålÅStartePå}`);
    } else {
      fetchBliMed(spørreundersøkelseId)
        .then((sesjonsId) => {
          return fetchDeltakerForsteSporsmal(spørreundersøkelseId, sesjonsId);
        })
        .then(({ spørsmålId }) => {
          router.push(`deltaker/sporsmal/${spørsmålId}`);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  });*/

  const [error, setError] = React.useState<string | null>(null);
  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          fetchBliMed(spørreundersøkelseId)
            .then((sesjonsId) => {
              return fetchDeltakerForsteSporsmal(
                spørreundersøkelseId,
                sesjonsId,
              );
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
