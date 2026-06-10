import { BodyShort, Box } from "@navikt/ds-react";
import startsideStyles from "./startside.module.css";

export default function StartsideBoksElement({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      borderRadius="12"
      padding="space-16"
      className={startsideStyles.startsideinfoboks}
    >
      <BodyShort className={startsideStyles.startsideinfoboksinnhold}>
        {children}
      </BodyShort>
    </Box>
  );
}
