"use client";

import Headerlinje from "@/app/_components/Headerlinje";

interface VelkommenVirksomhetProps {
  type: string;
  children?: React.ReactNode;
}

export const VelkommenVirksomhet = ({
  type,
  children,
}: VelkommenVirksomhetProps) => {
  return <Headerlinje tittel={type}>{children}</Headerlinje>;
};
