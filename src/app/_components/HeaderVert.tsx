"use client";
import { Button, HStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import komponenterStyles from "./komponenter.module.css";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import LoginModal from "./LoginModal";

export default function HeaderVert({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const erPåOversiktSide = pathname.endsWith("oversikt");
  const searchParams = useSearchParams();

  const loginModal = searchParams.get("loginModal");

  return (
    <PageBlock as="header" className={komponenterStyles.header}>
      <HStack gap="8">
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
        <LoginModal
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
          startOpen={loginModal === "true"}
        />
      </HStack>
    </PageBlock>
  );
}
