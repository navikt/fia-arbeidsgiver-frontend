import { HStack, Heading } from "@navikt/ds-react";
import headerlinjeStyles from "./headerlinje.module.css";

export default function Headerlinje({
  tittel,
  children,
}: {
  tittel: string;
  children?: React.ReactNode;
}) {
  return (
    <HStack
      justify="space-between"
      align="center"
      className={headerlinjeStyles.headerlinje}
    >
      <Heading size="large">{tittel}</Heading>
      {children}
    </HStack>
  );
}
