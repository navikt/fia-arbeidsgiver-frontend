"use client";

import React from "react";
import { Button, Page, VStack } from "@navikt/ds-react";
import styles from "../../../kartlegging.module.css";
import { useRouter } from "next/navigation";

export default function FooterOversikt() {
  const router = useRouter();

  return (
    <Page.Block as="footer" className={styles.footer}>
      <VStack gap={"4"}>
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
