export default function Home() {
  const spørreundersøkelseId = "f7065ba4-56ed-4f61-8215-7579e3d208de";
  const vertId = "f7065ba4-56ed-4f61-8215-7579e3d208dl";

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
