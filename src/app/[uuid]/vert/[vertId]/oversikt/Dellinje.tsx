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

import oversiktStyles from "./oversikt.module.css";
import styles from "../../../kartlegging.module.css";
import { useRouter } from "next/navigation";

type TilstandType = "HoppOver" | "Klar" | "Ferdig";

export default function Dellinje({
  delnummer,
  delnavn,
}: {
  delnummer: number;
  delnavn: string;
}) {
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
        <HStack className={oversiktStyles.bleedInnhold}>
          <VStack>
            <BodyShort size="medium">Del {delnummer}</BodyShort>
            <BodyShort size="large">{delnavn}</BodyShort>
          </VStack>
          <HStack gap={"4"}>
            <DellinjeMedState tilstand={tilstand} setTilstand={setTilstand} />
          </HStack>
        </HStack>
      </Box>
    </Bleed>
  );
}
function DellinjeMedState({
  tilstand,
  setTilstand,
}: {
  tilstand: TilstandType;
  setTilstand: React.Dispatch<React.SetStateAction<TilstandType>>;
}) {
  const router = useRouter();
  return (
    <>
      {tilstand === "Klar" && (
        <>
          <Button
            variant={"secondary"}
            onClick={() => router.push("sporsmal")}
            className={styles.knappHvitBred}
          >
            Start
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
      {tilstand === "Ferdig" && <Detail>Fullført</Detail>}
    </>
  );
}
