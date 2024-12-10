import type { Metadata } from "next";
import React from "react";
import StartsideInnhold from "./StartsideInnhold";

export const metadata: Metadata = {
  title: "Velkommen",
};


export default function Startside({ params }: { params: { uuid: string } }) {
  return <StartsideInnhold params={params} />;
}
