import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  return <main>Her har vi en oversikt over spørsmål/deler/kategorier.</main>;
}
