"use client";

import React from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { BarChartIcon } from "@navikt/aksel-icons";

export default function LinkTilResultat({
  skalViseKnapp,
  urlTilResultatside,
  gåDirekteTilResultat = false,
  knappetekst = "Gå til resultat",
  knappeClass,
  resultatType = "tema",
}: {
  skalViseKnapp: boolean;
  urlTilResultatside: string;
  gåDirekteTilResultat?: boolean;
  knappetekst?: string;
  knappeClass?: string;
  resultatType?: string;
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
        variant="secondary"
        className={knappeClass}
        onClick={gåDirekteTilResultat ? gåTilResultat : åpneModal}
        icon={<BarChartIcon title="Resultater" />}
      >
        {knappetekst}
      </Button>
      <Modal ref={modalRef} header={{ heading: "Er du sikker?" }}>
        <Modal.Body>
          <BodyLong>Er du sikker på at du ønsker å gå til resultat?</BodyLong>
          <BodyLong weight="semibold">
            Dette vil låse {resultatType}, så ingen nye svar kan komme inn.
          </BodyLong>
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
