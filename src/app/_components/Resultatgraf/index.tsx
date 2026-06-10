import resultatgrafStyle from "./resultatgraf.module.css";
import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";

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
    { bakgrunn: "var(--ax-brand-blue-600)", border: undefined },
    {
      bakgrunn: "var(--ax-brand-blue-300)",
      border: "var(--ax-border-brand-blue)",
    },
    { bakgrunn: "var(--ax-warning-700)", border: undefined },
    {
      bakgrunn: "var(--ax-warning-400)",
      border: "var(--ax-border-warning)",
    },
    { bakgrunn: "var(--ax-meta-purple-500)", border: undefined },
    {
      bakgrunn: "var(--ax-meta-purple-300)",
      border: "var(--ax-border-meta-purple)",
    },
    { bakgrunn: "var(--ax-success-500)", border: undefined },
    {
      bakgrunn: "var(--ax-success-300)",
      border: "var(--ax-border-success)",
    },
    { bakgrunn: "var(--ax-info-600)", border: undefined },
    {
      bakgrunn: "var(--ax-info-400)",
      border: "var(--ax-border-info)",
    },
  ],
  barTestIds,
}: {
  spørsmål: SpørsmålResultatDto;
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
