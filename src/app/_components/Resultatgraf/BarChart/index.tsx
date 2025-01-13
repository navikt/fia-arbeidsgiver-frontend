import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";

export default function BarChart({
  spørsmål,
  horizontal = false,
  farge = "var(--a-blue-500)",
}: {
  spørsmål: SpørsmålResultatDto;
  horizontal?: boolean;
  farge?: string;
}) {
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);

  const options = React.useMemo(
    () => genererChartOptionsFraSpørsmålOgSvar(spørsmål, horizontal, farge),
    [spørsmål, horizontal],
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"chart"}
      ref={chartComponentRef}
    />
  );
}

function genererChartOptionsFraSpørsmålOgSvar(
  spørsmål: SpørsmålResultatDto,
  horizontal: boolean,
  farge: string,
): Highcharts.Options {
  return {
    chart: {
      type: horizontal ? "bar" : "column",
      height: horizontal ? (85 + spørsmål.svarListe.length * 75) : undefined,
    },
    title: {
      text: spørsmål.tekst,
      align: "left",
      margin: 35,
      minScale: 1,
      style: {
        fontSize: "1.25rem",
      }
    },
    subtitle: {
      text: spørsmål.flervalg ? "(flere valg er mulig)" : undefined,
    },
    plotOptions: {
      column: {
        borderWidth: 2,
        borderRadius: 0,
        crisp: true,
      },
    },
    series: [
      {
        type: "column",
        name: "Antall svar",
        data: spørsmål.svarListe.map((svar) =>
          svar.antallSvar > 0
            ? {
              y: svar.antallSvar,
              color: farge,
            }
            : null,
        ),
      },
    ],
    xAxis: {
      categories: spørsmål.svarListe.map((svar) => svar.tekst),
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: "Antall svar",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };
}
