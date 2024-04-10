import resultatgrafStyle from "./resultatgraf.module.css";
import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { spørsmålMedSvarDTO } from "@/app/_types/resultatDTO";

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
  ...remainingProps
}: {
  prosent: number;
  farge: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={resultatgrafStyle.bar}
    style={{ ...style, width: `${prosent}%`, backgroundColor: farge }}
    {...remainingProps}
  />
);

const LabelList = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul {...props} className={resultatgrafStyle.labelList} />
);

const Label = (props: React.HTMLAttributes<HTMLLIElement>) => (
  <li {...props} className={resultatgrafStyle.label} />
);

const LabelBox = ({
  farge,
  style = {},
  ...remainingProps
}: { farge: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...remainingProps}
    style={{ ...style, backgroundColor: farge }}
    className={resultatgrafStyle.labelBox}
  />
);

export default function Resultatgraf({
  spørsmål,
  farger = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"],
  barTestIds,
}: {
  spørsmål: spørsmålMedSvarDTO;
  farger?: Color[] | string[];
  barTestIds?: string[];
}) {
  function getSvarGrafFarge(index: number): string {
    return farger[index % farger.length];
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
      <BarWrapper>
        {spørsmål.svarListe.map(
          (svar, index) =>
            svar.antallSvar > 0 && (
              <Bar
                key={index}
                prosent={(svar.antallSvar / total) * 100}
                farge={getSvarGrafFarge(index)}
                data-testid={barTestIds?.[index]}
              />
            ),
        )}
      </BarWrapper>
      <LabelList>
        {spørsmål.svarListe.map((svar, index) => (
          <Label key={index}>
            <LabelBox farge={getSvarGrafFarge(index)} />
            <BodyShort weight="semibold">{svar.tekst}:</BodyShort>
            <BodyShort className={resultatgrafStyle.labelValue}>
              {svar.antallSvar}
            </BodyShort>
          </Label>
        ))}
      </LabelList>
    </ChartWrapper>
  );
}
