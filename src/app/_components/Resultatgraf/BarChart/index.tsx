import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SpørsmålMedSvarDTO } from "@/app/_types/TemaResultatDTO";

export default function BarChart({
  spørsmål,
}: {
  spørsmål: SpørsmålMedSvarDTO;
}) {
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);

  const options = React.useMemo(
    () => genererChartOptionsFraSpørsmålOgSvar(spørsmål),
    [spørsmål],
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
  spørsmål: SpørsmålMedSvarDTO,
): Highcharts.Options {
  return {
    chart: {
      type: "column",
    },
    title: {
      text: spørsmål.tekst,
      align: "left",
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
                color: "var(--a-blue-500)",
              }
            : null,
        ),
      },
    ],
    xAxis: {
      categories: spørsmål.svarListe.map((svar) => svar.tekst),
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: false,
    },
  };
}
