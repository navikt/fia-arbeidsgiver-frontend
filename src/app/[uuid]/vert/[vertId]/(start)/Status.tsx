"use client";

import React from "react";
import { Button, Heading } from "@navikt/ds-react";
import styles from "./startside.module.css";
import { useRouter } from "next/navigation";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";
import { useAntallDeltakere } from "@/app/_api_hooks/useAntallDeltakere";

export default function Status({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();
  const { data, isLoading } = useAntallDeltakere({
    vertId,
    spørreundersøkelseId,
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
            router.push(`../../${spørreundersøkelseId}/vert/${vertId}/oversikt`)
          }
          className={styles.bliMedKnapp}
        >
          Kom i gang
        </Button>
      </>
    </div>
  );
}
