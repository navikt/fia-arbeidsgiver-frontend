"use client";

import React from "react";
import { Button, Heading } from "@navikt/ds-react";

import styles from "./startside.module.css";
import { useRouter } from "next/navigation";
import { Deltakere } from "@/app/_components/Deltakere";

export default function Status() {
  const router = useRouter();
  return (
    <div className={styles.status}>
      <Deltakere />
      <Heading level="2" size="medium" spacing>
        Venter på deltakere...
      </Heading>
      <Button
        variant={"secondary"}
        onClick={() => router.push("vert/oversikt")}
      >
        Kom i gang
      </Button>
    </div>
  );
}
