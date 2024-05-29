"use client";

import React from "react";
import { BodyLong, Button, HStack, Modal, VStack } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { BarChartIcon } from "@navikt/aksel-icons";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";
import statusPåDeltakereStyles from "@/app/_components/StatusPåDeltaker/statusPåDeltaker.module.css";

export default function LinkTilResultat({
  spørreundersøkelseId,
  vertId,
  temaId,
  skalViseKnapp,
  urlTilResultatside,
  gåDirekteTilResultat = false,
  knappetekst = "",
  knappeClass,
  modalTittel,
  resultatType = "temaet",
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
  modalTittel?: string;
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
        header={{ heading: `${modalTittel ? modalTittel : knappetekst}` }}
        style={{ maxWidth: "600px" }}
      >
        <Modal.Body>
          <VStack gap={"4"}>
            <VStack>
              <BodyLong>
                Når du fullfører {resultatType} og viser resultatene er det ikke
                mulig å avgi flere svar.
              </BodyLong>
            </VStack>
            <HStack align={"center"}>
              <StatusPåDeltakerMedSvar
                spørreundersøkelseId={spørreundersøkelseId}
                vertId={vertId}
                temaId={temaId}
              />
              <BodyLong className={statusPåDeltakereStyles.deltakereMedStatus}>
                har svart
              </BodyLong>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={gåTilResultat}>Fullfør</Button>
          <Button variant="secondary" onClick={() => modalRef.current?.close()}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
