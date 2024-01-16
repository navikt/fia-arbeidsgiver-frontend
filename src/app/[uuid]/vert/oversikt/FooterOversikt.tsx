"use client";

import React from "react";
import { Button, Page, VStack } from "@navikt/ds-react";
import styles from "./oversikt.module.css";
import { useRouter } from "next/navigation";

export default function FooterOversikt() {
  const router = useRouter();

  return (
    <Page.Block as="footer">
      <VStack gap={"4"} className={styles["footer"]}>
        <Button
          variant={"secondary"}
          onClick={() => router.push("ferdig")}
          className={styles.knappHvitBred}
        >
          Avslutt
        </Button>
      </VStack>
    </Page.Block>
  );
}
