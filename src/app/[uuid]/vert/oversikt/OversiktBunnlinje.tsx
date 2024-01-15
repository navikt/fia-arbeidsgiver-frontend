"use client";

import React from "react";
import { Button, VStack } from "@navikt/ds-react";
import styles from "./oversikt.module.css";
import { useRouter } from "next/navigation";
export default function OversiktBunnlinje() {
  const router = useRouter();

  return (
    <VStack gap={"4"} className={styles["footer"]}>
      <Button
        variant={"secondary"}
        className={styles["knapp-hvit-bakgrunn-bred"]}
      >
        Tilbake
      </Button>
      <Button
        variant={"secondary"}
        onClick={() => router.push("ferdig")}
        className={styles["knapp-hvit-bakgrunn-bred"]}
      >
        Avslutt
      </Button>
    </VStack>
  );
}
