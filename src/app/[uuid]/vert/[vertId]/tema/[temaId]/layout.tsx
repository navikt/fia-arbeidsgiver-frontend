import React from "react";
import HeaderVert from "@/app/_components/HeaderVert";

export default function VertLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uuid: string; vertId: string; temaId: string };
}) {
  return (
    <>
      <HeaderVert spørreundersøkelseId={params.uuid} vertId={params.vertId} />
      {children}
    </>
  );
}
