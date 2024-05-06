import { BodyLong, Button, CopyButton, HStack, VStack } from "@navikt/ds-react";
import React from "react";
import { VisQRModal } from "./VisQRModal";
import { QRkodeVisning, lenkeFraId } from "./QRkodeVisning";
import { StatusPåDeltaker } from "../StatusPåDeltaker/StatusPåDeltaker";
import loginModalStyles from "./loginmodal.module.css";

export default function LoginModal({
  spørreundersøkelseId,
  startOpen = false,
  vertId,
}: {
  spørreundersøkelseId: string;
  startOpen?: boolean;
  vertId: string;
}) {
  const [visQRkodeModalÅpen, setvisQRkodeModalÅpen] = React.useState(startOpen);
  return (
    <>
      <Button variant="secondary" onClick={() => setvisQRkodeModalÅpen(true)}>
        Vis QR-kode
      </Button>
      <VisQRModal
        åpen={visQRkodeModalÅpen}
        lukk={() => {
          setvisQRkodeModalÅpen(false);
        }}
        title="Scan QR-kode og bli med"
      >
        <HStack wrap className={loginModalStyles.maksHundre}>
          <VStack className={loginModalStyles.maksHundre}>
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
          <VStack className={loginModalStyles.maksHundre}>
            <StatusPåDeltaker
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
            />
          </VStack>
        </HStack>
      </VisQRModal>
    </>
  );
}
