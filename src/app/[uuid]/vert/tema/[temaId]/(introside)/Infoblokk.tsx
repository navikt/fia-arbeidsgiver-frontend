"use client";
import { BodyLong, BodyShort, Box, HStack } from "@navikt/ds-react";
import { List, ListItem } from "@navikt/ds-react/List";
import React, { ComponentProps } from "react";
import { TemaDto } from "../../../../../_types/TemaDto";
import introsideStyles from "./introside.module.css";

export function Infoblokk({ tema }: { tema: TemaDto }) {
  const tittel = tema.navn;
  const innhold = innholdsconfig.find(
    (innhold) => innhold.del === tema.del,
  ) || {
    tittel,
    punkter: {
      type: "punkter",
      punkter: [],
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
}: Omit<Omit<infoblokk, "type">, "del">) {
  return (
    <>
      <Box borderRadius="xlarge" padding="12" background="surface-default">
        <HStack align="center" gap="4" justify="space-between">
          <span className={introsideStyles.venstreDel}>
            {punkter.beskrivelse && <b>{punkter.beskrivelse}</b>}
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
                <InnholdsSwitch innhold={fargeseksjon.tekst} />
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
  beskrivelse?: string;
  punkter: innholdstyper[];
};

interface infoblokk {
  type: "infoblokk";
  del: 1 | 2 | 3;
  punkter: punkter;
  fargeseksjon: {
    farge: ComponentProps<typeof Box>["background"];
    tekstfarge: string;
    tekst: innholdstyperEllerArray;
  };
}

const innholdsconfig: infoblokk[] = [
  {
    type: "infoblokk",
    del: 1,
    punkter: {
      type: "punkter",
      punkter: [
        {
          type: "tekst",
          tekst: [
            "NAV er opptatt av det ",
            { type: "bold", tekst: "utvidede partssamarbeidet." },
            " Det betyr samarbeid mellom ledere, tillitsvalgte og verneombud for å utvikle og forbedre arbeidsplassen.",
          ],
        },
        {
          type: "tekst",
          tekst: [
            "Et velfungerende partssamarbeid verdsetter og utnytter partenes ",
            { type: "bold", tekst: "kompetanse" },
            " og ",
            { type: "bold", tekst: "ansvarsområder." },
          ],
        },
        {
          type: "tekst",
          tekst: [
            "Samarbeidet er viktig for å oppnå et ",
            { type: "bold", tekst: "godt arbeidsmiljø" },
            ", ",
            { type: "bold", tekst: "lavt sykefravær" },
            " og sikre ",
            { type: "bold", tekst: "høy produktivitet." },
          ],
        },
      ],
    },
    fargeseksjon: {
      farge: "surface-action-subtle",
      tekstfarge: "a-text-action",
      tekst: {
        type: "tekst",
        tekst: [
          "Som deltaker i partssamarbeidet har du en viktig rolle i å skape ",
          { type: "bold", tekst: "godt arbeidsmiljø" },
          " og ",
          { type: "bold", tekst: "samarbeid mellom ledelse og ansatte" },
        ],
      },
    },
  },
  {
    type: "infoblokk",
    del: 2,
    punkter: {
      type: "punkter",
      beskrivelse: "Sykefraværsarbeid handler blant annet om:",
      punkter: [
        "Kjente og etablerte rutiner for hvordan sykefravær skal følges opp.",
        "Kultur og kompetanse for tilrettelegging for ansatte.",
        "At ansatte vet hva som forventes når en er sykmeldt eller står i fare for å bli det.",
      ],
    },
    fargeseksjon: {
      farge: "surface-success-subtle",
      tekstfarge: "a-text-success",
      tekst: {
        type: "tekst",
        tekst: [
          "Som leder, tillitsvalgt eller verneombud har du en viktig rolle i å ",
          { type: "bold", tekst: "forebygge sykefravær" },
          " og ",
          { type: "bold", tekst: "skape gode sykefraværsrutiner" },
        ],
      },
    },
  },
  {
    type: "infoblokk",
    del: 3,
    punkter: {
      type: "punkter",
      punkter: [
        {
          type: "tekst",
          tekst: [
            "Arbeidsmiljø handler om arbeid - det å ",
            { type: "bold", tekst: "organisere" },
            ", ",
            { type: "bold", tekst: "planlegge" },
            " og ",
            { type: "bold", tekst: "gjennomføre" },
            " arbeidet.",
          ],
        },
        "Psykologiske og sosiale forhold på arbeidsplassen er viktige faktorer for arbeidsmiljøet.",
        "Arbeidsmiljø må behandles som ferskvare og krever kontinuerlig, kunnskapsbasert innsats.",
      ],
    },
    fargeseksjon: {
      farge: "surface-warning-subtle",
      tekstfarge: "a-text-warning",
      tekst: {
        type: "tekst",
        tekst: [
          "Din rolle i partssamarbeidet er viktig for å ",
          { type: "bold", tekst: "skape engasjement" },
          " og ",
          { type: "bold", tekst: "gode arbeidsforhold" },
          " på arbeidsplassen",
        ],
      },
    },
  },
];
