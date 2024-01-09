import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Startside() {
  return <main>Her kan vi ha QR/PIN osv. og knapp for å starte.</main>;
}
