import { Box, Heading } from "@navikt/ds-react";
import introsideStyles from "./introside.module.css";
import { planType } from "@/app/_types/Plantyper";
import PlanGraf from "@/app/_components/Plan/PlanGraf";
import React from "react";

export default function Planvisning({ plan }: { plan?: planType }) {
  if (!plan?.temaer) {
    return null;
  }

  const [start, slutt] = plan.temaer.reduce<(Date | undefined)[]>(
    (prev, curr) => {
      const retval = [...prev];

      if (curr.inkludert) {
        for (let index = 0; index < curr.undertemaer.length; index++) {
          const element = curr.undertemaer[index];

          if (element.inkludert) {
            if (
              retval[0] === undefined ||
              (element.startDato && element.startDato < retval[0])
            ) {
              retval[0] = element.startDato;
            }
            if (
              retval[1] === undefined ||
              (element.sluttDato && element.sluttDato > retval[1])
            ) {
              retval[1] = element.sluttDato;
            }
          }
        }
      }

      return retval;
    },
    [undefined, undefined],
  );

  return (
    <Box
      borderRadius="xlarge"
      padding="10"
      background="bg-default"
      className={`${introsideStyles.startsideboks} ${introsideStyles.startsidegrafboks}`}
    >
      {plan.temaer.map((tema) =>
        tema.inkludert ? (
          <React.Fragment key={tema.id}>
            <Heading
              level="2"
              size="small"
              className={`${introsideStyles.subheading} ${introsideStyles.startsidegrafHeader}`}
            >
              {tema.navn}
            </Heading>
            <PlanGraf
              undertemaer={tema.undertemaer}
              start={start}
              slutt={slutt}
              harEksterntGrid
            />
            <br />
          </React.Fragment>
        ) : null,
      )}
    </Box>
  );
}
