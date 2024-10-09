import VideresendTilStart from "@/app/VideresendTilStart";

export default function Home() {
  const spørreundersøkelseId = "e2f863df-309e-4314-9c7e-c584237fd90a";

  return (
    <main>
      <VideresendTilStart spørreundersøkelseId={spørreundersøkelseId} />
    </main>
  );
}
