import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Host() {
  return (
    <main>
      Hosting
    </main>
  );
}