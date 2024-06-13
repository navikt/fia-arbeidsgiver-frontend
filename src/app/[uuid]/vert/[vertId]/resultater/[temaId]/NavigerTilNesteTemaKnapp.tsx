"use client";
import { Alert, Button } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useTemaoversiktOverEttTema } from "@/app/_api_hooks/vert/useTemaoversiktOverEttTema";
import kartleggingStyles from "../../../../../kartlegging.module.css";

export default function NavigerTilNesteTemaKnapp({
  vertId,
  spørreundersøkelseId,
  temaId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
  temaId: number;
}) {
  const router = useRouter();
  const { data: tema, error } = useTemaoversiktOverEttTema(
    spørreundersøkelseId,
    vertId,
    temaId,
  );

  if (tema?.nesteTemaId) {
    return (
      <Button
        onClick={() => router.push(`../tema/${tema.nesteTemaId}`)}
        icon={<ArrowRightIcon aria-hidden />}
        className={kartleggingStyles.knappHvit}
        variant="secondary"
        iconPosition="right"
      >
        Gå til neste tema
      </Button>
    );
  } else if (error) {
    return (
      <Alert variant="error" role="alert" aria-live="polite">
        {error.message}
      </Alert>
    );
  } else {
    return null;
  }
}
