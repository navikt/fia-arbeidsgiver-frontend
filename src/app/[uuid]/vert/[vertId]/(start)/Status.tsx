"use client";

import React from "react";
import { Button, Heading } from "@navikt/ds-react";
import styles from "./startside.module.css";
import { useRouter } from "next/navigation";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";
import { useAntallDeltakere } from "@/app/_api_hooks/useAntallDeltakere";

export default function Status({
  undersøkelsesID,
  vertId,
}: {
  undersøkelsesID: string;
  vertId: string;
}) {
  const router = useRouter();
  const { data, isLoading } = useAntallDeltakere({
    vertId,
    spørreundersøkelseId: undersøkelsesID,
  });
  return (
    <div className={styles.status}>
      <Deltakelsesstatus
        antallDeltakere={data?.antallDeltakere}
        isLoading={isLoading}
      />
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
