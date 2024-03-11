import React from "react";
import { Bleed, Box, HStack } from "@navikt/ds-react";

import headerBleedStyles from "./headerBleed.module.css";

export default function HeaderBleed({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Bleed
      marginInline="full"
      asChild
      reflectivePadding
      className={headerBleedStyles.headerBleed}
    >
      <Box padding="5" className={headerBleedStyles.box}>
        <HStack className={headerBleedStyles.innhold}>{children}</HStack>
      </Box>
    </Bleed>
  );
}
