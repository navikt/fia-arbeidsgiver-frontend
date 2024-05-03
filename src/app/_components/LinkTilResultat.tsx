"use client";

import React from "react";
import { BodyLong, Button, HStack, Modal, VStack } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { BarChartIcon } from "@navikt/aksel-icons";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";

export default function LinkTilResultat({
  spørreundersøkelseId,
  vertId,
  temaId,
  skalViseKnapp,
  urlTilResultatside,
  gåDirekteTilResultat = false,
  knappetekst = "Gå til resultat",
  knappeClass,
  resultatType = "tema",
  variant = "secondary",
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId?: number;
  skalViseKnapp: boolean;
  urlTilResultatside: string;
  gåDirekteTilResultat?: boolean;
  knappetekst?: string;
  knappeClass?: string;
  resultatType?: string;
  variant?: "primary" | "secondary";
}) {
  const router = useRouter();
  const modalRef = React.useRef<HTMLDialogElement>(null);
  if (!skalViseKnapp) {
    return null;
  }

  const gåTilResultat = () => router.push(urlTilResultatside);
  const åpneModal = () => modalRef.current?.showModal();

  return (
    <>
      <Button
        variant={variant}
        className={knappeClass}
        onClick={gåDirekteTilResultat ? gåTilResultat : åpneModal}
        icon={<BarChartIcon title="Resultater" />}
      >
        {knappetekst}
      </Button>
      <Modal
        ref={modalRef}
        header={{ heading: `${knappetekst ? knappetekst : "Vis resultater"}` }}
      >
        <Modal.Body>
          <VStack gap={"4"}>
            <VStack>
              <BodyLong>
                Er du sikker på at du ønsker å gå til resultat?
              </BodyLong>
              <BodyLong weight="semibold">
                Dette vil låse {resultatType}, så ingen nye svar kan komme inn.
              </BodyLong>
            </VStack>
            <HStack align={"center"} gap={"2"}>
              <StatusPåDeltakerMedSvar
                spørreundersøkelseId={spørreundersøkelseId}
                vertId={vertId}
                temaId={temaId}
              />
              <BodyLong>har svart på {resultatType}</BodyLong>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => modalRef.current?.close()}>
            Avbryt
          </Button>
          <Button onClick={gåTilResultat} icon={<BarChartIcon />}>
            Gå til resultat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
