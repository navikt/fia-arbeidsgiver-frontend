"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VideresendTilStart({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${spørreundersøkelseId}/vert`);
  });
  return <></>;
}
