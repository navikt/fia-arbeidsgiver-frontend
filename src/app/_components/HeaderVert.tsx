"use client";
import { Button, HStack, Page } from "@navikt/ds-react";
import komponenterStyles from "./komponenter.module.css";
import React from "react";
import { VisQRModal } from "@/app/_components/VisQRModal";
import { QRkodeVisning } from "@/app/_components/QRkodeVisning";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@navikt/aksel-icons";

export default function HeaderVert({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [visQRkodeModalÅpen, setvisQRkodeModalÅpen] = React.useState(false);
  const erPåOversiktSide = pathname.endsWith("oversikt");

  return (
    <Page.Block as={"header"} className={komponenterStyles.header}>
      <HStack justify={"end"}>
        {!erPåOversiktSide && (
          <Button
            icon={<ArrowLeftIcon aria-hidden />}
            variant="secondary"
            onClick={() =>
              router.push(`/${spørreundersøkelseId}/vert/${vertId}/oversikt`)
            }
          >
            Gå til oversikt
          </Button>
        )}
        <Button
          style={{ marginLeft: "1rem" }}
          variant="secondary"
          onClick={() => setvisQRkodeModalÅpen(true)}
        >
          Vis QR-kode
        </Button>
      </HStack>
      <VisQRModal
        åpen={visQRkodeModalÅpen}
        lukk={() => {
          setvisQRkodeModalÅpen(false);
        }}
        title={"QR kode"}
      >
        <QRkodeVisning spørreundersøkelseId={spørreundersøkelseId} />
      </VisQRModal>
    </Page.Block>
  );
}
