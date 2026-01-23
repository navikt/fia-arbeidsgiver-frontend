import { Accordion, Alert, BodyLong } from "@navikt/ds-react";
import React from "react";

import planStyles from "./plangraf.module.css";
import {
  planStatusType,
  planTemaType,
  planUndertemaType,
} from "@/app/_types/Plantyper";

export default function InnholdsAccordion({ tema }: { tema: planTemaType }) {
  return (
    <Accordion
      className={planStyles.innholdAccordion}
      size="small"
      headingSize="xsmall"
    >
      <span className={planStyles.innholdLabelRad}>
        <span className={planStyles.innholdLabel}>Innhold</span>
        <span className={planStyles.varighetLabel}>Varighet</span>
        <span className={planStyles.statusLabel}>Status</span>
      </span>
      {tema.undertemaer
        .filter((undertema) => undertema.inkludert)
        .sort((a, b) => {
          return a.id - b.id;
        })
        .map((undertema) => (
          <InnholdsRad key={undertema.id} innhold={undertema} />
        ))}
    </Accordion>
  );
}

function InnholdsRad({ innhold }: { innhold: planUndertemaType }) {
  return (
    <Accordion.Item className={planStyles.innholdAccordionItem}>
      <InnholdsRadHeader innhold={innhold} />
      <Accordion.Content className={planStyles.innholdAccordionItemContent}>
        <BodyLong>
          <b>Mål: </b>
          {innhold.målsetning}
        </BodyLong>
      </Accordion.Content>
    </Accordion.Item>
  );
}

function InnholdsRadHeader({ innhold }: { innhold: planUndertemaType }) {
  return (
    <Accordion.Header className={planStyles.innholdAccordionHeader}>
      <span className={planStyles.innholdTittel}>{innhold.navn}</span>
      <InnholdsVarighetHeader
        start={innhold.startDato}
        slutt={innhold.sluttDato}
      />
      <InnholdsStatusHeader status={innhold.status} />
    </Accordion.Header>
  );
}

function InnholdsVarighetHeader({
  start,
  slutt,
}: {
  start: Date | undefined;
  slutt: Date | undefined;
}) {
  return (
    <>
      {start && <PrettyInnholdsDato date={start} />} -{" "}
      {slutt && <PrettyInnholdsDato date={slutt} />}
    </>
  );
}

export function PrettyInnholdsDato({
  date,
  visNesteMåned = false,
}: {
  date: Date;
  visNesteMåned?: boolean;
}) {
  return React.useMemo(() => {
    const nyDato = new Date(date);
    if (visNesteMåned) {
      nyDato.setDate(nyDato.getDate() - 1);
    }

    return lokalDatoMedKortTekstmåned(nyDato);
  }, [visNesteMåned, date]);
}

function InnholdsStatusHeader({
  status,
}: {
  status: planStatusType | undefined;
}) {
  return status ? (
    <span>
      {status[0]}
      {status.slice(1).toLocaleLowerCase()}
    </span>
  ) : (
    <Alert variant={"error"}>Status mangler</Alert>
  );
}
const dateFormatDatoMedKortTekstmåned = new Intl.DateTimeFormat("nb-NO", {
  month: "short",
  day: "numeric",
  year: "2-digit",
});

const lokalDatoMedKortTekstmåned = (input: Date) =>
  dateFormatDatoMedKortTekstmåned.format(new Date(input));
