"use client";

import React from "react";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import { Button, Heading } from "@navikt/ds-react";

import styles from "./startside.module.css";
import { useRouter } from "next/navigation";

export default function Status({
  antallDeltakere,
}: {
  antallDeltakere: number;
}) {
  const router = useRouter();
  return (
    <div className={styles.status}>
      <span>
        <PersonGroupIcon title="personer" fontSize={"3rem"} />
        {antallDeltakere}
      </span>
      <Heading level="2" size="medium" spacing>
        Venter på deltakere...
      </Heading>
      <Button variant={"secondary"} onClick={() => router.push("oversikt")}>
        Kom i gang
      </Button>
    </div>
  );
}
