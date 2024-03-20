"use client";
import { Button } from "@navikt/ds-react";
import Link from "next/link";
import React from "react";
import temasideStyles from "./temaside.module.css";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";

export default function Startlenke({
  spørreundersøkelseId,
  vertId,
  temaId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: string;
}) {
  const { data: listeOverTemaer } = useTemaoversikt(
    spørreundersøkelseId,
    vertId,
  );

  //TODO: finn hvilken listeOverTemaer vi er på her
  if (listeOverTemaer !== undefined) {
    listeOverTemaer.map((tema) => console.log(`et tema: ${tema}`));
  }
  return (
    listeOverTemaer && (
      <Button
        as={Link}
        href={`/${spørreundersøkelseId}/vert/${vertId}/tema/${temaId}/${
          listeOverTemaer.find((tema) => tema.temaId == temaId).spørsmålId
        }`}
        className={temasideStyles.startknapp}
        iconPosition="right"
        icon={<ArrowRightIcon />}
      >
        Start
      </Button>
    )
  );
}
