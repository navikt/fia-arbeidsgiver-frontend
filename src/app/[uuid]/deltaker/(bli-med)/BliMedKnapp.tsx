"use client";

import { Alert, BodyShort, Button, HStack } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import startsideStyles from "./startside.module.css";
import { fetchBliMed } from "@/app/_api_hooks/deltaker/fetchBliMed";
import { fetchIdentifiserbartSpørsmål } from "@/app/_api_hooks/deltaker/fetchIdentifiserbartSpørsmål";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import useLocalStorage from "@/utils/useLocalStorage";

export default function BliMedKnapp({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const { clearValue: clearSisteTema } = useLocalStorage<string>("sisteTema");
  return (
    <>
      <Button
        onClick={() => {
          fetchBliMed(spørreundersøkelseId)
            .then(() => {
              return fetchIdentifiserbartSpørsmål(spørreundersøkelseId);
            })
            .then(({ spørsmålId, temaId }) => {
              clearSisteTema();
              router.push(`deltaker/tema/${temaId}/sporsmal/${spørsmålId}`);
            })
            .catch((error) => {
              setError(error.message);
            });
        }}
        className={startsideStyles.bliMedKnapp}
      >
        <HStack align={"center"} gap={"2"}>
          <PersonGroupIcon /> <BodyShort>Bli med!</BodyShort>
        </HStack>
      </Button>
      {error !== null ? (
        <Alert variant="error" role="alert" aria-live="polite">
          {error}
        </Alert>
      ) : null}
    </>
  );
}
