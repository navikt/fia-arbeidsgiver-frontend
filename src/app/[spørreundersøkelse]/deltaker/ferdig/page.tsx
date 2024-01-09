import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Ferdigside() {
  return (
    <main>Takk for at du svarte. Bra jobbet. Du kan nå lukke denne siden.</main>
  );
}
