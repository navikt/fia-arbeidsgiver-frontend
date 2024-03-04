import { Button, HStack, Page } from "@navikt/ds-react";
import komponenterStyles from "./komponenter.module.css";
import React from "react";
import { VisQRModal } from "@/app/_components/VisQRModal";
import { QRkodeVisning } from "@/app/_components/QRkodeVisning";

export default function HeaderVert({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const [visQRkodeModalÅpen, setvisQRkodeModalÅpen] = React.useState(false);

  return (
    <Page.Block as={"header"} className={komponenterStyles.header}>
      <HStack justify={"end"}>
        <Button variant="secondary" onClick={() => setvisQRkodeModalÅpen(true)}>
          Vis QR-kode
        </Button>
        <VisQRModal
          åpen={visQRkodeModalÅpen}
          lukk={() => {
            setvisQRkodeModalÅpen(false);
          }}
          title={"QR kode"}
        >
          <QRkodeVisning spørreundersøkelseId={spørreundersøkelseId} />
        </VisQRModal>
      </HStack>
    </Page.Block>
  );
}
