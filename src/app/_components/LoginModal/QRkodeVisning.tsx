"use client";
import loginModalStyles from "./loginmodal.module.css";
import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { HydrationSafeClientsideComponent } from "@/app/_components/HydrationSafeClientsideComponent";
import { Button, HStack } from "@navikt/ds-react";
import { ZoomPlusIcon, ZoomMinusIcon } from "@navikt/aksel-icons";

interface Props {
  spørreundersøkelseId: string;
}

export function QRkodeVisning({ spørreundersøkelseId }: Props) {
  const [størrelse, setStørrelse] = React.useState(22);
  return (
    <HydrationSafeClientsideComponent>
      <QRCodeSVG
        value={lenkeFraId(spørreundersøkelseId)}
        className={loginModalStyles.qrcode}
        style={{
          width: `${størrelse}rem`,
          height: `${størrelse}rem`,
        }}
      />
      <HStack className={loginModalStyles.qrZoomContainer} gap="1">
        <Button
          variant="secondary-neutral"
          size="small"
          icon={<ZoomPlusIcon title="Zoom inn" fontSize="1.5rem" />}
          onClick={() => setStørrelse(størrelse + 2)}
        />
        <Button
          variant="secondary-neutral"
          size="small"
          icon={<ZoomMinusIcon title="Zoom ut" fontSize="1.5rem" />}
          onClick={() => setStørrelse(størrelse - 2)}
        />
      </HStack>
    </HydrationSafeClientsideComponent>
  );
}
export function lenkeFraId(spørreundersøkelseId: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.protocol}//${window.location.host}/${spørreundersøkelseId}/deltaker`;
}
