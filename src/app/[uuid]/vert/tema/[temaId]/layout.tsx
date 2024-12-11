import React from "react";
import HeaderVert from "../../../../_components/HeaderVert";

export default function VertLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uuid: string; temaId: string };
}) {
  return (
    <>
      <HeaderVert spørreundersøkelseId={params.uuid} />
      {children}
    </>
  );
}
