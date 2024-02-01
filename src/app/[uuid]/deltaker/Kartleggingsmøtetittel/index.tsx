import { Heading } from "@navikt/ds-react";

import styles from "./kartlegginsmøtetittel.module.css";

export default function Kartleggingsmøtetittel() {
  return (
    <Heading
      level="1"
      size="medium"
      className={styles.kartleggingsmøtetittel}
      align="center"
    >
      IA kartleggingsmøte
    </Heading>
  );
}
