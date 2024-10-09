"use client";

import Headerlinje from "@/app/_components/Headerlinje";
import { useVirksomhetsnavn } from "@/app/_api_hooks/vert/useVirksomhetsnavn";
import { Loader } from "@navikt/ds-react";

interface VelkommenVirksomhetProps {
  spørreundersøkelseId: string;
  children?: React.ReactNode;
}

export const VelkommenVirksomhet = ({
  spørreundersøkelseId,
  children,
}: VelkommenVirksomhetProps) => {
  const { data, isLoading, error } = useVirksomhetsnavn(spørreundersøkelseId);

  if (error) {
    return <Headerlinje tittel={`Velkommen`}>{children}</Headerlinje>;
  }

  if (isLoading) {
    return <Loader variant="inverted" />;
  } else {
    return <Headerlinje tittel={`Velkommen, ${data!}`}>{children}</Headerlinje>;
  }
};
