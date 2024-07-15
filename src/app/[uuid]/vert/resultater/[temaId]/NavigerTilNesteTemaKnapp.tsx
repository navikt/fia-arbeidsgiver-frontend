"use client";
import { Alert, Button } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useTemaoversikt } from "../../../../_api_hooks/vert/useTemaoversikt";
import kartleggingStyles from "../../../../kartlegging.module.css";

export default function NavigerTilNesteTemaKnapp({
  spørreundersøkelseId,
  temaId,
}: {
  spørreundersøkelseId: string;
  temaId: number;
}) {
  const router = useRouter();
  const { data: tema, error } = useTemaoversikt(
    spørreundersøkelseId,
    temaId,
  );

  if (tema && tema.del < 3) {
    return (
      <Button
        onClick={() => router.push(`../tema/${tema.del + 1}`)}
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
