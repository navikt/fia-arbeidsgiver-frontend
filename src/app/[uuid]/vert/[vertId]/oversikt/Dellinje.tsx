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
import { startKategori } from "@/app/_api_hooks/startKategori";
import { KategoriType, StatusType } from "@/app/_types/sporreundersokelseDTO";

const tilstandStyle = (tilstand: StatusType): string => {
  switch (tilstand) {
    case "HOPP_OVER":
      return styles.bleedHoppetOver;
    case "FERDIG":
      return styles.bleedFerdig;
    default:
      return styles.bleedKlar;
  }
};

const finskrivKategori = (kategori: KategoriType): string => {
  switch (kategori) {
    case "PARTSSAMARBEID":
      return "Partssamarbeid i virksomheten";
    default:
      return "Beskrivelse mangler";
  }
};

export default function Dellinje({
  spørreundersøkelseId,
  vertId,
  delnummer,
  kategori,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  delnummer: number;
  kategori: KategoriType;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tilstand, setTilstand] = useState<StatusType>("PÅBEGYNT");
  const router = useRouter();

  function startKartlegging() {
    startKategori(vertId, spørreundersøkelseId, kategori).then(() =>
      inkrementerSpørsmål(spørreundersøkelseId, vertId).then(() =>
        router.push("sporsmal"),
      ),
    );
  }

  return (
    <Bleed marginInline="full" asChild>
      <Box padding="5" className={tilstandStyle(tilstand)}>
        <HStack className={oversiktStyles.bleedInnhold}>
          <VStack>
            <BodyShort size="medium">Del {delnummer}</BodyShort>
            <BodyShort size="large">{finskrivKategori(kategori)}</BodyShort>
          </VStack>
          <HStack gap={"4"}>
            <>
              {tilstand === "PÅBEGYNT" && (
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
              {tilstand === "FERDIG" && <Detail>Fullført</Detail>}
            </>
          </HStack>
        </HStack>
      </Box>
    </Bleed>
  );
}
