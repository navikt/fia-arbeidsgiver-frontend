import { Heading, HStack, Loader, Page } from "@navikt/ds-react";
import komponenterStyles from "./komponenter.module.css";
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { usePathname } from "next/navigation";

export default function HeaderVert() {
  const [fullLenke, setFullLenke] = React.useState("");
  const lenke: string = usePathname()
    .replace("/oversikt", "")
    .slice(0, -37)
    .replace("vert", "deltaker");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setFullLenke(
        `${window.location.protocol}//${window.location.host}${lenke}`,
      );
    }
  }, [lenke]);

  return (
    <Page.Block as={"header"} className={komponenterStyles.header}>
      <HStack className={komponenterStyles.overskrift}>
        <Heading spacing level={"1"} size={"large"}>
          IA kartleggingsmøte
        </Heading>
        {fullLenke !== "" ? (
          <QRCodeSVG value={fullLenke} className={komponenterStyles.qrcode} />
        ) : (
          <Loader size="3xlarge" />
        )}
      </HStack>
    </Page.Block>
  );
}
