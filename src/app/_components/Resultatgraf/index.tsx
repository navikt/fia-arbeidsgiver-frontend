import resultatgrafStyle from "./resultatgraf.module.css";
import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { SpørsmålMedSvarDTO } from "@/app/_types/TemaResultatDTO";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

const ChartWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={resultatgrafStyle.chartWrapper} {...props} />
);

const BarWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={resultatgrafStyle.barWrapper} {...props} />
);

const Bar = ({
  style = {},
  prosent,
  farge,
  borderfarge,
  ...remainingProps
}: {
  prosent: number;
  farge: string;
  borderfarge?: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={resultatgrafStyle.bar}
    style={{
      ...style,
      width: `${prosent}%`,
      position: "relative",
    }}
    {...remainingProps}
  >
    <div
      style={{
        backgroundColor: farge,
        border: borderfarge ? `2px solid ${borderfarge}` : undefined,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    ></div>
  </div>
);

const LabelList = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul {...props} className={resultatgrafStyle.labelList} />
);

const Label = (props: React.HTMLAttributes<HTMLLIElement>) => (
  <li {...props} className={resultatgrafStyle.label} />
);

const LabelBox = ({
  farge,
  borderfarge,
  style = {},
  ...remainingProps
}: {
  farge: string;
  borderfarge?: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...remainingProps}
    style={{
      ...style,
      backgroundColor: farge,
      border: borderfarge ? `2px solid ${borderfarge}` : undefined,
    }}
    className={resultatgrafStyle.labelBox}
  />
);

export default function Resultatgraf({
  spørsmål,
  farger = [
    { bakgrunn: "var(--a-data-surface-2)", border: undefined },
    {
      bakgrunn: "var(--a-data-surface-2-subtle)",
      border: "var(--a-data-border-2)",
    },
    { bakgrunn: "var(--a-data-surface-3)", border: undefined },
    {
      bakgrunn: "var(--a-data-surface-3-subtle)",
      border: "var(--a-data-border-3)",
    },
    { bakgrunn: "var(--a-data-surface-6)", border: undefined },
    {
      bakgrunn: "var(--a-data-surface-6-subtle)",
      border: "var(--a-data-border-6)",
    },
    { bakgrunn: "var(--a-data-surface-5)", border: undefined },
    {
      bakgrunn: "var(--a-data-surface-5-subtle)",
      border: "var(--a-data-border-5)",
    },
    { bakgrunn: "var(--a-data-surface-4)", border: undefined },
    {
      bakgrunn: "var(--a-data-surface-4-subtle)",
      border: "var(--a-data-border-4)",
    },
  ],
  barTestIds,
}: {
  spørsmål: SpørsmålMedSvarDTO;
  farger?: { bakgrunn: Color | string; border?: Color | string }[];
  barTestIds?: string[];
}) {
  function getSvarGrafBakgrunnsfarge(index: number): string {
    return farger[index % farger.length].bakgrunn;
  }
  function getSvarGrafBorderfarge(index: number): string | undefined {
    return farger[index % farger.length].border;
  }

  const total = spørsmål.svarListe.reduce(
    (acc, svar) => acc + svar.antallSvar,
    0,
  );

  return (
    <ChartWrapper>
      <BodyShort className={resultatgrafStyle.spørsmåltekst} weight="semibold">
        {spørsmål.tekst}
      </BodyShort>
      {spørsmål.flervalg ? (
        <BodyShort className={resultatgrafStyle.flervalgtekst}>
          (flervalg)
        </BodyShort>
      ) : undefined}
      <BarWrapper>
        {spørsmål.svarListe.map(
          (svar, index) =>
            svar.antallSvar > 0 && (
              <Bar
                key={index}
                prosent={(svar.antallSvar / total) * 100}
                farge={getSvarGrafBakgrunnsfarge(index)}
                borderfarge={getSvarGrafBorderfarge(index)}
                data-testid={barTestIds?.[index]}
              />
            ),
        )}
      </BarWrapper>
      <LabelList>
        {spørsmål.svarListe.map((svar, index) => (
          <Label key={index}>
            <LabelBox
              farge={getSvarGrafBakgrunnsfarge(index)}
              borderfarge={getSvarGrafBorderfarge(index)}
            />
            <BodyShort weight="semibold">{svar.tekst}</BodyShort>
            <BodyShort className={resultatgrafStyle.labelValue}>
              ({svar.antallSvar})
            </BodyShort>
          </Label>
        ))}
      </LabelList>
    </ChartWrapper>
  );
}
