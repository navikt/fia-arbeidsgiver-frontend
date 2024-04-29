"use client";
import { BodyLong, BodyShort, Box, HStack } from "@navikt/ds-react";
import { List, ListItem } from "@navikt/ds-react/List";
import React, { ComponentProps } from "react";
import { TemaoversiktDTO } from "@/app/_types/TemaoversiktDTO";
import introsideStyles from "./introside.module.css";

export function Infoblokk({
  tittel,
  undertittel,
  temaoversikt,
}: {
  tittel: string;
  undertittel: string;
  temaoversikt: TemaoversiktDTO;
}) {
  const innhold = innholdsconfig.find(
    (innhold) =>
      innhold.id.toLowerCase() === temaoversikt.temanavn.toLowerCase(),
  ) || {
    tittel,
    punkter: {
      type: "punkter",
      punkter: [undertittel],
    },
    fargeseksjon: {
      farge: "surface-warning-subtle",
      tekstfarge: "a-text-warning",
      tekst: "",
    },
  };

  return (
    <Infoblokkinnhold
      punkter={innhold.punkter}
      fargeseksjon={innhold.fargeseksjon}
    />
  );
}

function InnholdsSwitch({
  innhold: innhold,
}: {
  innhold: innholdstyperEllerArray;
}) {
  if (Array.isArray(innhold)) {
    return innhold.map((itm, index) => (
      <InnholdsSwitch key={index} innhold={itm} />
    ));
  }
  if (typeof innhold === "string") {
    return innhold;
  }
  if (innhold.type === "punkter") {
    return (
      <List as="ul">
        {innhold.punkter.map((innhold, index) => (
          <ListItem key={index}>
            <InnholdsSwitch innhold={innhold} />
          </ListItem>
        ))}
      </List>
    );
  }
  if (innhold.type === "tekst") {
    return (
      <BodyShort>
        <InnholdsSwitch innhold={innhold.tekst} />
      </BodyShort>
    );
  }
  if (innhold.type === "bold") {
    return (
      <BodyShort as="span" weight="semibold">
        {innhold.tekst}
      </BodyShort>
    );
  }
}

function Infoblokkinnhold({
  punkter,
  fargeseksjon,
}: Omit<Omit<infoblokk, "type">, "id">) {
  return (
    <>
      <Box borderRadius="xlarge" padding="12" background="surface-default">
        <HStack align="center" gap="4" justify="space-between">
          <span className={introsideStyles.venstreDel}>
            <InnholdsSwitch innhold={punkter} />
          </span>
          <span className={introsideStyles.høyreDel}>
            <Box
              borderRadius="xlarge"
              padding="10"
              background={fargeseksjon.farge}
            >
              <BodyLong
                weight="semibold"
                style={{ color: `var(--${fargeseksjon.tekstfarge})` }}
              >
                {fargeseksjon.tekst}
              </BodyLong>
            </Box>
          </span>
        </HStack>
      </Box>
    </>
  );
}

type innholdstyper = boldtekst | string | tekstblokk | punkter;

type innholdstyperEllerArray = innholdstyper | innholdstyper[];

type tekstblokk = {
  type: "tekst";
  tekst: innholdstyperEllerArray;
};

type boldtekst = {
  type: "bold";
  tekst: string;
};

type punkter = {
  type: "punkter";
  punkter: innholdstyper[];
};

interface infoblokk {
  type: "infoblokk";
  id: "UTVIKLE_PARTSSAMARBEID" | "REDUSERE_SYKEFRAVÆR" | "ARBEIDSMILJØ";
  punkter: punkter;
  fargeseksjon: {
    farge: ComponentProps<typeof Box>["background"];
    tekstfarge: string;
    tekst: string;
  };
}

const innholdsconfig: infoblokk[] = [
  {
    type: "infoblokk",
    id: "UTVIKLE_PARTSSAMARBEID",
    punkter: {
      type: "punkter",
      punkter: [
        {
          type: "tekst",
          tekst: [
            "Et effektivt partssamarbeid verdsetter og benytter ",
            { type: "bold", tekst: "lederes, tillitsvalgtes" },
            " og ",
            { type: "bold", tekst: "verneombuds" },
            " kompetanse og ansvarsområder.",
          ],
        },
        "Samarbeidet er viktig for å oppnå et godt arbeidsmiljø, lavt sykefravær og sikre høy produktivitet.",
        "Alle parter har en viktig rolle i å skape et godt arbeidsmiljø i praksis.",
      ],
    },
    fargeseksjon: {
      farge: "surface-action-subtle",
      tekstfarge: "a-text-action",
      tekst:
        "Et utvidet partssamarbeid kan bidra til å bygge broer mellom ledelse og medarbeidere og være et fundament i utvikling av gode arbeidsmiljø.",
    },
  },
  {
    type: "infoblokk",
    id: "REDUSERE_SYKEFRAVÆR",
    punkter: {
      type: "punkter",
      punkter: [
        "Gode og kjente rutiner for hvordan sykefravær følges opp",
        "Aktiv tilrettelegging for ansatte",
        "Gode og trygge samtaler mellom leder og ansatt",
        "Alle vet hva som forventes når man blir sykmeldt eller står i fare for å bli sykmeldt",
      ],
    },
    fargeseksjon: {
      farge: "surface-success-subtle",
      tekstfarge: "a-text-success",
      tekst:
        "De beste resultatene oppnås når leder, tillitsvalgt og verneombud utarbeider gode rutiner i samarbeid med ansatte.",
    },
  },
  {
    type: "infoblokk",
    id: "ARBEIDSMILJØ",
    punkter: {
      type: "punkter",
      punkter: [
        {
          type: "tekst",
          tekst: [
            "Godt arbeidsmiljøarbeid handler om å ",
            { type: "bold", tekst: "organisere, planlegge" },
            " og ",
            { type: "bold", tekst: "gjennomføre" },
            " arbeidet.",
          ],
        },
        "Et velfungerende partssamarbeid er motoren for forebyggende arbeid.",
        "Arbeidsmiljøet er forskjellig fra arbeidsplass til arbeidsplass og må tilpasses hver arbeidssituasjon.",
        "Arbeidsmiljøet må behandles som ferskvare og krever kontinuerlig innsats",
      ],
    },
    fargeseksjon: {
      farge: "surface-warning-subtle",
      tekstfarge: "a-text-warning",
      tekst:
        "Godt arbeidsmiljøarbeid fører til økt engasjement, bedre arbeidsflyt, og at færre blir sykmeldt.",
    },
  },
];
