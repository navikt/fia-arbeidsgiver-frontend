"use client";

import React from "react";
import { Button, Heading } from "@navikt/ds-react";
import styles from "./startside.module.css";
import { useRouter } from "next/navigation";
import { Deltakere } from "@/app/_components/Deltakere";

export default function Status({
  undersøkelsesID,
  vertId,
}: {
  undersøkelsesID: string;
  vertId: string;
}) {
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
          onClick={() =>
            router.push(`../../${undersøkelsesID}/vert/${vertId}/oversikt`)
          }
          className={styles.bliMedKnapp}
        >
          Kom i gang
        </Button>
      </>
    </div>
  );
}
