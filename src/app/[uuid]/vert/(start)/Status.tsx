"use client";

import React from "react";
import { Alert, Button, Heading } from "@navikt/ds-react";
import styles from "./startside.module.css";
import { useRouter } from "next/navigation";
import { Deltakere } from "@/app/_components/Deltakere";
import { fetchBliMed } from "@/app/_api_hooks/bliMed";
import { KARTLEGGING_FERDIG_ERROR } from "@/utils/consts";

export default function Status({
  undersøkelsesID,
}: {
  undersøkelsesID: string;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  return (
    <div className={styles.status}>
      <Deltakere />
      <Heading level="2" size="medium" spacing>
        Venter på deltakere...
      </Heading>
      <>
        <Button
          variant={"secondary"}
          onClick={() => {
            fetchBliMed(undersøkelsesID)
              .then(() => {
                setError(null);
                router.push("vert/oversikt");
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
          Kom i gang
        </Button>
        {error !== null ? <Alert variant="error">{error}</Alert> : null}
      </>
    </div>
  );
}
