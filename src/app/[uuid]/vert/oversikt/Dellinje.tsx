"use client";

import React, { useState } from "react";
import {
  Bleed,
  BodyShort,
  Box,
  Button,
  Detail,
  HStack,
  VStack,
} from "@navikt/ds-react";
import styles from "./oversikt.module.css";
import { useRouter } from "next/navigation";

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
  type TilstandType = "HoppOver" | "Klar" | "Ferdig";

  const router = useRouter();

  const [tilstand, setTilstand] = useState<TilstandType>("Klar");

  const tilstandStyle = (tilstand: TilstandType): string => {
    switch (tilstand) {
      case "HoppOver":
        return styles.bleedHoppetOver;
      case "Ferdig":
        return styles.bleedFerdig;
      default:
        return styles.bleedKlar;
    }
  };

  return (
    <Bleed marginInline="full" asChild>
      <Box padding="5" className={tilstandStyle(tilstand)}>
        <HStack className={styles.bleedInnhold}>
          <VStack>
            <BodyShort size="medium">Del {delnummer}</BodyShort>
            <BodyShort size="large">{delnavn}</BodyShort>
          </VStack>
          <HStack gap={"4"}>
            <Detail>{punkter} punkter</Detail>
            <Detail>Beregnet tid: {tid} min</Detail>
            {tilstand === "Klar" && (
              <>
                <Button
                  variant={"secondary"}
                  // onClick={() => setTilstand("Ferdig")}
                  onClick={() => router.push("sporsmal")}
                  className={styles.knappHvitBred}
                >
                  Start
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => setTilstand("HoppOver")}
                  className={styles.knappHvit}
                >
                  Hopp over
                </Button>
              </>
            )}
            {tilstand === "HoppOver" && (
              <>
                <Detail>Hoppet over</Detail>
                <Button
                  variant={"secondary"}
                  onClick={() => setTilstand("Klar")}
                  className={styles.knappHvit}
                >
                  Angre
                </Button>
              </>
            )}
            {tilstand === "Ferdig" && (
              <>
                <Detail>Fullført</Detail>
              </>
            )}
          </HStack>
        </HStack>
      </Box>
    </Bleed>
  );
}
