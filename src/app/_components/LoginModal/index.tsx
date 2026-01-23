import { BodyLong, CopyButton, HStack, VStack } from "@navikt/ds-react";
import React from "react";
import { VisQRModal } from "./VisQRModal";
import { QRkodeVisning, lenkeFraId } from "./QRkodeVisning";
import { StatusPåDeltaker } from "../StatusPåDeltaker/StatusPåDeltaker";
import loginModalStyles from "./loginmodal.module.css";

export default function LoginModal({
  spørreundersøkelseId,
  åpen,
  onClose,
}: {
  spørreundersøkelseId: string;
  åpen: boolean;
  onClose: () => void;
}) {
  return (
    <VisQRModal åpen={åpen} lukk={onClose} title="Scan QR-koden og bli med">
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
  );
}
