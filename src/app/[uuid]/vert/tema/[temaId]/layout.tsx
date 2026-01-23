import React from "react";
import HeaderVert from "../../../../_components/HeaderVert";

export default async function VertLayout(props: {
  children: React.ReactNode;
  params: Promise<{ uuid: string; temaId: string }>;
}) {
  const params = await props.params;

  const { children } = props;

  return (
    <>
      <HeaderVert spørreundersøkelseId={params.uuid} />
      {children}
    </>
  );
}
