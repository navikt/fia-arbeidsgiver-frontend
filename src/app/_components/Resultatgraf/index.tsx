import resultatgrafStyle from "./resultatgraf.module.css";
import React from "react";
import { BodyShort } from "@navikt/ds-react";

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
}: {
  spørsmål: {
    spørsmålId: string;
    tekst: string;
    svarListe: {
      svarId: string;
      tekst: string;
      antallSvar: number;
      prosent: number;
    }[];
  };
  farger?: Color[] | string[];
}) {
  function getSvarGrafFarge(index: number): string {
    return farger[index % farger.length];
  }

  return (
    <ChartWrapper>
      <BodyShort className={resultatgrafStyle.spørsmåltekst}>
        {spørsmål.tekst}
      </BodyShort>
      <BarWrapper>
        {spørsmål.svarListe.map(
          (svar, index) =>
            svar.prosent > 0 && (
              <Bar
                key={svar.svarId}
                prosent={svar.prosent}
                farge={getSvarGrafFarge(index)}
              >
                {svar.prosent.toFixed(0)}%
              </Bar>
            ),
        )}
      </BarWrapper>
      <LabelList>
        {spørsmål.svarListe.map((svar, index) => (
          <Label key={svar.svarId}>
            <LabelBox farge={getSvarGrafFarge(index)} />
            {svar.tekst}: {svar.prosent.toFixed(0)}%
          </Label>
        ))}
      </LabelList>
    </ChartWrapper>
  );
}
