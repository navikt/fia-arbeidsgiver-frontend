"use client";
import { Button, HStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import komponenterStyles from "./komponenter.module.css";
import kartleggingStyles from "../kartlegging.module.css";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import LoginModal from "./LoginModal";
import LinkTilResultat from "@/app/_components/LinkTilResultat";
import { useTemaoversikter } from "@/app/_api_hooks/vert/useTemaoversikter";

export default function HeaderVert({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: listeOverTemaer,
  } = useTemaoversikter(spørreundersøkelseId);

  const erPåOversiktSide = pathname.endsWith("oversikt");
  const searchParams = useSearchParams();

  const loginModal = searchParams.get("loginModal");

  return (
    <PageBlock as="header" className={komponenterStyles.header}>
      <HStack gap="4" justify={"space-between"}>
        <HStack gap="4">
          {!erPåOversiktSide && (
            <Button
              icon={<ArrowLeftIcon aria-hidden />}
              variant="secondary"
              onClick={() =>
                router.push(`/${spørreundersøkelseId}/vert/oversikt`)
              }
              className={kartleggingStyles.knappHvit}
            >
              Gå til oversikt
            </Button>
          )}
          <LoginModal
            spørreundersøkelseId={spørreundersøkelseId}
            startOpen={loginModal === "true"}
          />
        </HStack>
        {erPåOversiktSide && listeOverTemaer && (
          <LinkTilResultat
            skalViseKnapp
            urlTilResultatside={`./resultater`}
            gåDirekteTilResultat={false}
            knappetekst={listeOverTemaer.every(tema => tema.status === "STENGT") ? "Vis resultatene" : "Fullfør og vis alle resultatene"}
            resultatType={"undersøkelsen"}
            spørreundersøkelseId={spørreundersøkelseId}
            variant={"primary"}
          />
        )}
      </HStack>
    </PageBlock>
  );
}
