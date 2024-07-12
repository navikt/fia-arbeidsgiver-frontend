import { Box, Button, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import oversiktStyles from "./oversikt.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { TemaDto } from "@/app/_types/TemaDto";
import LinkTilResultat from "@/app/_components/LinkTilResultat";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";
import { TemaStatus } from "@/app/_types/TemaStatus";

export function TemaBoks({
  spørreundersøkelseId,
  vertId,
  temaoversikt,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaoversikt: TemaDto;
}) {
  return (
    temaoversikt && (
      <Box padding="10" className={oversiktStyles.temaboks}>
        <VStack
          gap="8"
          justify="space-between"
          className={oversiktStyles.temaboksinnhold}
        >
          <VStack gap="4">
            <HStack justify={"space-between"}>
              <StatusPåDeltakerMedSvar
                spørreundersøkelseId={spørreundersøkelseId}
                vertId={vertId}
                temaId={temaoversikt.id}
                erSynlig={temaoversikt.status !== "IKKE_ÅPNET"}
              />
              {temaoversikt.status === "STENGT" ? (
                <Tag variant={"success-moderate"}>Fullført</Tag>
              ) : null}
            </HStack>
            <Heading size="medium">{temaoversikt.navn}</Heading>
          </VStack>
          <HStack gap={"4"} justify={"end"}>
            <TemaActions
              temaoversikt={temaoversikt}
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
            />
          </HStack>
        </VStack>
      </Box>
    )
  );
}

function TemaActions({
  temaoversikt,
  spørreundersøkelseId,
  vertId,
}: {
  temaoversikt: TemaDto;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();

  switch (temaoversikt.status) {
    case TemaStatus.STENGT:
      return (
        <>
          <Button
            variant="secondary"
            onClick={() => router.push(`./tema/${temaoversikt.id}`)}
            iconPosition="right"
          >
            Vis spørsmål
          </Button>
          <LinkTilResultat
            skalViseKnapp
            urlTilResultatside={`./resultater/${temaoversikt.id}`}
            gåDirekteTilResultat={true}
            knappetekst={"Vis resultater"}
            variant="primary"
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
            temaId={temaoversikt.id}
          />
        </>
      );
    case TemaStatus.ALLE_SPØRSMÅL_ÅPNET:
      return (
        <>
          <Button
            variant="secondary"
            onClick={() => router.push(`./tema/${temaoversikt.id}`)}
            iconPosition="right"
          >
            Vis spørsmål
          </Button>
          <LinkTilResultat
            skalViseKnapp
            urlTilResultatside={`./resultater/${temaoversikt.id}`}
            gåDirekteTilResultat={false}
            knappetekst={"Vis resultater"}
            modalTittel={"Vil du fullføre temaet?"}
            variant="primary"
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
            temaId={temaoversikt.id}
          />
        </>
      );
    case TemaStatus.ÅPNET:
      return (
        <Button
          variant="primary"
          onClick={() => router.push(`./tema/${temaoversikt.id}`)}
          icon={<ArrowRightIcon aria-hidden />}
          iconPosition="right"
        >
          Start
        </Button>
      );

    case TemaStatus.IKKE_ÅPNET:
    default:
      return (
        <Button
          variant="primary"
          onClick={() => router.push(`./tema/${temaoversikt.id}`)}
          icon={<ArrowRightIcon aria-hidden />}
          iconPosition="right"
          disabled
        >
          Start
        </Button>
      );
  }
}
