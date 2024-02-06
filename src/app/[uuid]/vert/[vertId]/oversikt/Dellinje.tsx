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

import vertStyles from "../vert.module.css";
import oversiktStyles from "./oversikt.module.css";
import { useRouter } from "next/navigation";

type TilstandType = "HoppOver" | "Klar" | "Ferdig";

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
  const [tilstand, setTilstand] = useState<TilstandType>("Klar");

  const tilstandStyle = (tilstand: TilstandType): string => {
    switch (tilstand) {
      case "HoppOver":
        return vertStyles.bleedHoppetOver;
      case "Ferdig":
        return vertStyles.bleedFerdig;
      default:
        return vertStyles.bleedKlar;
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
            <Detail>{punkter} punkter</Detail>
            <Detail>Beregnet tid: {tid} min</Detail>
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
            className={vertStyles.knappHvitBred}
          >
            Start
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => setTilstand("HoppOver")}
            className={vertStyles.knappHvit}
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
            className={vertStyles.knappHvit}
          >
            Angre
          </Button>
        </>
      )}
      {tilstand === "Ferdig" && <Detail>Fullført</Detail>}
    </>
  );
}
