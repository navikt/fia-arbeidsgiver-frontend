"use client";

import React from "react";
import { Bleed, Box, Button, HStack, VStack } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import styles from "./oversikt.module.css";
export default function Dellinje({
  delnummer,
  delnavn,
  punkter,
  tid,
}: {
  delnummer: number;
  delnavn: string;
  punkter: number;
  tid: number;
}) {
  const router = useRouter();

  const disableBleed = () => {};

  return (
    <Bleed marginInline="full" asChild>
      <Box padding="5" background="surface-alt-3-strong">
        <HStack justify={"space-between"} className={styles["bleed-innhold"]}>
          <VStack className={styles["kartlegging-kategori"]}>
            <span className={styles["tekst-liten"]}>Del {delnummer}</span>
            <div>{delnavn}</div>
          </VStack>
          <HStack gap={"5"} className={styles["estimat-og-knapper"]}>
            <div>{punkter} punkter</div>
            <div>Beregnet tid: {tid} min</div>
            <Button
              variant={"secondary"}
              onClick={() => router.push("sporsmal")}
              className={styles["knapp-hvit-bakgrunn"]}
            >
              Start
            </Button>
            <Button
              variant={"secondary"}
              onClick={disableBleed}
              className={styles["knapp-hvit-bakgrunn"]}
            >
              Hopp over
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Bleed>
  );
}
