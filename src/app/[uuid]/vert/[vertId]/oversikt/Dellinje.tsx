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
import { inkrementerSpørsmål } from "@/app/_api_hooks/inkrementerSpørsmål";

type TilstandType = "HoppOver" | "Klar" | "Ferdig";

export default function Dellinje({
  spørreundersøkelseId,
  vertId,
  delnummer,
  delnavn,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  delnummer: number;
  delnavn: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tilstand, setTilstand] = useState<TilstandType>("Klar");
  const router = useRouter();

  function startKartlegging() {
    inkrementerSpørsmål(spørreundersøkelseId, vertId).then(() =>
      router.push("sporsmal"),
    );
  }

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
            <>
              {tilstand === "Klar" && (
                <>
                  <Button
                    variant={"secondary"}
                    onClick={() => startKartlegging()}
                    className={styles.knappHvitBred}
                  >
                    Start
                  </Button>
                </>
              )}
              {tilstand === "Ferdig" && <Detail>Fullført</Detail>}
            </>
          </HStack>
        </HStack>
      </Box>
    </Bleed>
  );
}
