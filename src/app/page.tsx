import VideresendTilStart from "@/app/VideresendTilStart";

export default function Home() {
  const spørreundersøkelseId = "e2f863df-309e-4314-9c7e-c584237fd90a";
  const vertId = "86701b0e-a786-406a-881b-08af5b9ddb93";

  return (
    <main>
      <VideresendTilStart
        spørreundersøkelseId={spørreundersøkelseId}
        vertId={vertId}
      />
    </main>
  );
}
