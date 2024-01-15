"use client";

import React from "react";
import { Button, VStack } from "@navikt/ds-react";
import styles from "./oversikt.module.css";
export default function SluttKnapper() {
  return (
    <VStack gap={"4"} className={styles["knapper-meny"]}>
      <Button variant={"secondary"}>Tilbake</Button>
      <Button variant={"secondary"}>avslutt</Button>
    </VStack>
  );
}
