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
  tema,
}: {
  spørreundersøkelseId: string;
  tema: TemaDto;
}) {
  return (
    tema && (
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
                temaId={tema.id}
                erSynlig={tema.status !== "IKKE_ÅPNET"}
              />
              {tema.status === "STENGT" ? (
                <Tag variant={"success-moderate"}>Fullført</Tag>
              ) : null}
            </HStack>
            <Heading size="medium">{tema.navn}</Heading>
          </VStack>
          <HStack gap={"4"} justify={"end"}>
            <TemaActions
              tema={tema}
              spørreundersøkelseId={spørreundersøkelseId}
            />
          </HStack>
        </VStack>
      </Box>
    )
  );
}

function TemaActions({
  tema,
  spørreundersøkelseId,
}: {
  tema: TemaDto;
  spørreundersøkelseId: string;
}) {
  const router = useRouter();

  switch (tema.status) {
    case TemaStatus.STENGT:
      return (
        <>
          <Button
            variant="secondary"
            onClick={() => router.push(`./tema/${tema.id}`)}
            iconPosition="right"
          >
            Vis spørsmål
          </Button>
          <LinkTilResultat
            skalViseKnapp
            urlTilResultatside={`./resultater/${tema.id}`}
            gåDirekteTilResultat={true}
            knappetekst={"Vis resultatene"}
            variant="primary"
            spørreundersøkelseId={spørreundersøkelseId}
            temaId={tema.id}
          />
        </>
      );
    case TemaStatus.ALLE_SPØRSMÅL_ÅPNET:
      return (
        <>
          <Button
            variant="secondary"
            onClick={() => router.push(`./tema/${tema.id}`)}
            iconPosition="right"
          >
            Vis spørsmål
          </Button>
          <LinkTilResultat
            skalViseKnapp
            urlTilResultatside={`./resultater/${tema.id}`}
            gåDirekteTilResultat={false}
            knappetekst={"Vis resultatene"}
            modalTittel={"Vil du fullføre temaet?"}
            variant="primary"
            spørreundersøkelseId={spørreundersøkelseId}
            temaId={tema.id}
          />
        </>
      );
    case TemaStatus.ÅPNET:
      return (
        <Button
          variant="primary"
          onClick={() => router.push(`./tema/${tema.id}`)}
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
          onClick={() => router.push(`./tema/${tema.id}`)}
          icon={<ArrowRightIcon aria-hidden />}
          iconPosition="right"
          disabled
        >
          Start
        </Button>
      );
  }
}
