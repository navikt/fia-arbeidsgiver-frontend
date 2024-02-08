export default function Home() {
  const spørreundersøkelseId = "e2f863df-309e-4314-9c7e-c584237fd90a";
  const vertId = "86701b0e-a786-406a-881b-08af5b9ddb93";

  return (
    <main>
      <h1>Arbeidsgiverkartlegging - Testsider:</h1>
      <ol>
        <li>
          <a href={`/${spørreundersøkelseId}/vert/${vertId}`}>Vert (start)</a>
        </li>
        <li>
          <a href={`/${spørreundersøkelseId}/deltaker`}>Deltaker (start)</a>
        </li>
        <li>
          <a href={`/${spørreundersøkelseId}/deltaker/ferdig`}>
            Deltaker/Ferdig
          </a>
        </li>
        <li>
          <a href={`/${spørreundersøkelseId}/deltaker/sporsmal`}>
            Deltaker/Sporsmal
          </a>
        </li>
        <li>
          <a href={`/${spørreundersøkelseId}/vert/${vertId}/ferdig`}>
            Vert/Ferdig
          </a>
        </li>
        <li>
          <a href={`/${spørreundersøkelseId}/vert/${vertId}/oversikt`}>
            Vert/Oversikt
          </a>
        </li>
        <li>
          <a href={`/${spørreundersøkelseId}/vert/${vertId}/sporsmal`}>
            Vert/Sporsmal
          </a>
        </li>
      </ol>
    </main>
  );
}
