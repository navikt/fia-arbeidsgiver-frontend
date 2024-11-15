"use client";

import { useVirksomhetsnavn } from "@/app/_api_hooks/vert/useVirksomhetsnavn";
import { Heading, Loader } from "@navikt/ds-react";

import startsideStyles from "./startside.module.css";

interface VelkommenVirksomhetProps {
  spørreundersøkelseId: string;
}

export const VelkommenVirksomhet = ({
  spørreundersøkelseId,
}: VelkommenVirksomhetProps) => {
  const { data, isLoading, error } = useVirksomhetsnavn(spørreundersøkelseId);

  if (error) {
    return (
      <Heading size="large" className={startsideStyles.velkommenHeader}>
        Velkommen
      </Heading>
    );
  }

  if (isLoading) {
    return <Loader variant="inverted" />;
  } else {
    return (
      <Heading size="large" className={startsideStyles.velkommenHeader}>
        Velkommen, {data}
      </Heading>
    );
  }
};
