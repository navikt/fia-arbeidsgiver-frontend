"use client";

import React from "react";
import { Button, Page, VStack } from "@navikt/ds-react";
import styles from "./spørsmålsside.module.css";
import { useRouter } from "next/navigation";

export default function FooterSporsmal() {
  const router = useRouter();

  return (
    <Page.Block as="footer">
      <VStack gap={"4"} className={styles.footer}>
        <Button
          variant={"secondary"}
          className={styles.knappHvitBred}
          onClick={() => router.push("oversikt")}
        >
          Tilbake
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => router.push("oversikt")}
          className={styles.knappHvitBred}
        >
          Avslutt
        </Button>
      </VStack>
    </Page.Block>
  );
}
