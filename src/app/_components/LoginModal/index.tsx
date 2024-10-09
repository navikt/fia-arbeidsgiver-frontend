import { BodyLong, Button, CopyButton, HStack, VStack } from "@navikt/ds-react";
import React from "react";
import { VisQRModal } from "./VisQRModal";
import { QRkodeVisning, lenkeFraId } from "./QRkodeVisning";
import { StatusPåDeltaker } from "../StatusPåDeltaker/StatusPåDeltaker";
import kartleggingStyles from "../../kartlegging.module.css";
import loginModalStyles from "./loginmodal.module.css";

export default function LoginModal({
  spørreundersøkelseId,
  startOpen = false,
}: {
  spørreundersøkelseId: string;
  startOpen?: boolean;
}) {
  const [visQRkodeModalÅpen, setvisQRkodeModalÅpen] = React.useState(startOpen);
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setvisQRkodeModalÅpen(true)}
        className={kartleggingStyles.knappHvit}
      >
        Vis QR-kode
      </Button>
      <VisQRModal
        åpen={visQRkodeModalÅpen}
        lukk={() => {
          setvisQRkodeModalÅpen(false);
        }}
        title="Scan QR-kode og bli med"
      >
        <HStack
          wrap
          className={`${loginModalStyles.maksHundre} ${loginModalStyles.stack}`}
        >
          <VStack className={loginModalStyles.venstreDel}>
            <BodyLong>
              Åpne kameraet på telefonen, fokuser på QR-koden og følg lenken som
              dukker opp.
            </BodyLong>
            <QRkodeVisning spørreundersøkelseId={spørreundersøkelseId} />
            <CopyButton
              copyText={lenkeFraId(spørreundersøkelseId)}
              variant="action"
              text="Kopier lenke"
            />
          </VStack>
          <VStack className={loginModalStyles.høyreDel}>
            <StatusPåDeltaker spørreundersøkelseId={spørreundersøkelseId} />
          </VStack>
        </HStack>
      </VisQRModal>
    </>
  );
}
